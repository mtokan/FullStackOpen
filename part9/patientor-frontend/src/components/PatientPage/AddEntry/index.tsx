import {
    Box, Button,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {ReactElement, useState} from 'react';
import {Diagnosis, Entry, EntryType} from '../../../types.ts';
import HealthCheckEntryForm from './HealthCheckEntryForm.tsx';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm.tsx';
import HospitalEntryForm from './HospitalEntryForm.tsx';

const AddEntryForm = ({diagnoses, setFormOpen, addEntry}: {diagnoses: Diagnosis[], setFormOpen: (open: boolean) => void, addEntry: (entry: Entry) => void}) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState(false);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [error, setError] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    const diagnosisOptions = diagnoses.map(diagnosis => (
        <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code} {diagnosis.name}
        </MenuItem>
    ));

    const entryTypeFields: Record<EntryType, ReactElement> = {
        HealthCheck: <HealthCheckEntryForm {...{healthCheckRating, setHealthCheckRating}}/>,
        Hospital: <HospitalEntryForm
            {...{
                dischargeDate,
                setDischargeDate,
                dischargeCriteria,
                setDischargeCriteria,
                submitted: submitted && entryType === 'Hospital'
            }}/>,
        OccupationalHealthcare: <OccupationalHealthcareEntryForm
            {...{
                employerName,
                sickLeaveStartDate,
                sickLeaveEndDate,
                sickLeave,
                submitted: submitted && entryType === 'OccupationalHealthcare',
                setEmployerName,
                setSickLeaveStartDate,
                setSickLeaveEndDate,
                setSickLeave,
            }}/>,
    };

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setEntryType('HealthCheck');
        setHealthCheckRating(0);
        setSickLeaveStartDate('');
        setSickLeaveEndDate('');
        setEmployerName('');
        setSickLeave(false);
        setDischargeDate('');
        setDischargeCriteria('');
        setSubmitted(false);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const errorText = 'Please complete the required fields';

        if (!description || !date || !specialist) {
            setError(errorText);
            return;
        }
        if (entryType === 'Hospital' && (!dischargeDate || !dischargeCriteria)) {
            setError(errorText);
            return;
        }
        if (entryType === 'OccupationalHealthcare' && !employerName) {
            setError(errorText);
            return;
        }
        if (entryType === 'OccupationalHealthcare' && sickLeave && (!sickLeaveStartDate || !sickLeaveEndDate)) {
            setError(errorText);
            return;
        }

        setError('');

        const base = {
            description,
            date,
            specialist,
            ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
        };

        if (entryType === 'HealthCheck') {
            addEntry({ ...base, type: 'HealthCheck', healthCheckRating });
        } else if (entryType === 'Hospital') {
            addEntry({ ...base, type: 'Hospital', discharge: { date: dischargeDate, criteria: dischargeCriteria } });
        } else {
            addEntry({
                ...base,
                type: 'OccupationalHealthcare',
                employerName,
                ...(sickLeave && { sickLeave: { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } }),
            });
        }
        resetForm();
        setFormOpen(false);
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 2,
            border: 2,
            borderColor: 'black',
            borderRadius: '4px',
            borderStyle: 'dashed',
            marginTop: '1em'
        }}>
            {error && <Typography color="error">{error}</Typography>}
            <Typography variant="h5">New Entry</Typography>
            <TextField
                label="Description"
                value={description}
                error={!description && submitted}
                helperText={!description && submitted ? 'Required' : ''}
                onChange={(e) => setDescription(e.target.value)}
                variant="standard"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Date"
                type="date"
                variant="standard"
                error={!date && submitted}
                helperText={!date && submitted ? 'Required' : ''}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Specialist"
                value={specialist}
                error={!specialist && submitted}
                helperText={!specialist && submitted ? 'Required' : ''}
                onChange={(e) => setSpecialist(e.target.value)}
                variant="standard"
                InputLabelProps={{ shrink: true }}
            />
            <FormControl>
                <InputLabel shrink sx={{ ml: -1.8 }}>Diagnosis Codes (optional)</InputLabel>
                <Select
                    multiple
                    value={diagnosisCodes}
                    onChange={(e) => setDiagnosisCodes(
                        typeof e.target.value === 'string'
                        ? e.target.value.split(',')
                        : e.target.value
                    )}
                    variant="standard"
                >
                    {diagnosisOptions}
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Select entry type</FormLabel>
                <RadioGroup
                    row
                    value={entryType}
                    onChange={(e) => { setEntryType(e.target.value as EntryType); setSubmitted(false); setError('');}}
                >
                    <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
                    <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                    <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare" />
                </RadioGroup>
            </FormControl>
            {entryTypeFields[entryType]}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Button variant="outlined" color="error" onClick={() => {
                    resetForm();
                    setFormOpen(false);
                }}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export default AddEntryForm;