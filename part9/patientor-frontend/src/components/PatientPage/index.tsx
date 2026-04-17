import {Diagnosis, Patient} from '../../types.ts';
import {Box, Button, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import patientService from '../../services/patients.ts';
import Entry from './Entry';
import {Male, Female, Transgender} from '@mui/icons-material';
import AddEntryForm from './AddEntry';


const PatientPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
    const { id } = useParams();
    const [ patient, setPatient ] = useState<Patient>();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ formOpen, setFormOpen ] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        const fetchPatient = async () => {
            try {
                const patient = await patientService.getById(id);
                setPatient(patient);
            } finally  {
                setLoading(false);
            }
        };
        void fetchPatient();
    },[id]);

    if (loading) return <Typography variant={"h2"} style={{ marginTop: "1em" }}>Loading...</Typography>;
    if (!patient) return <Typography variant={"h2"} style={{ marginTop: "1em" }}>Patient not found</Typography>;

    const genderIcon = {
        male: <Male />,
        female: <Female />,
        other: <Transgender />
    };

    const handleFormOpen = () => setFormOpen(true);

    const addEntry = async (entry: Entry) => {
        if (!id) return;
        const newEntry = await patientService.addEntry(id, entry);
        setPatient(prev => prev
            ? { ...prev, entries: prev.entries.concat(newEntry) }
            : prev
        );
    };

    return (
        <Box>
            <Typography variant="h4" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
                {patient.name}
                {genderIcon[patient.gender]}
            </Typography>
            <Typography variant="body1">ssn: {patient.ssn}</Typography>
            <Typography variant="body1">occupation: {patient.occupation}</Typography>
            {formOpen ?
                <AddEntryForm diagnoses={diagnoses} setFormOpen={setFormOpen} addEntry={addEntry}/> :
                <Button variant="contained" color="primary" style={{ marginTop: "1em" }} onClick={handleFormOpen}>
                    Add entry
                </Button>
            }
            {patient.entries.length > 0 && (
                <>
                    <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "1em" }}>entries</Typography>
                    {patient.entries.map((entry,index) => <Entry entry={entry} key={index} diagnoses={diagnoses}/>)}
                </>
            )}
        </Box>
    );
};

export default PatientPage;