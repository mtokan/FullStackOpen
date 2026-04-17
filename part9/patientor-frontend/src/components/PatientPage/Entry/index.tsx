import {Diagnosis, Entry} from '../../../types.ts';
import {Box, List, ListItem, Typography} from '@mui/material';
import {LocalHospital, MedicalInformation, MonitorHeart} from '@mui/icons-material';
import HealthCheckEntry from './HealthCheckEntry.tsx';
import * as React from 'react';
import HospitalEntry from './HospitalEntry.tsx';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry.tsx';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const Entry = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}) => {
    const diagnosisCodes = entry.diagnosisCodes ? entry.diagnosisCodes.map(
        code => `${code} - ${diagnoses.find(d => d.code === code)?.name}`
    ) : [];

    const entryTypeIcon = {
        HealthCheck: <MonitorHeart />,
        OccupationalHealthcare: <MedicalInformation />,
        Hospital: <LocalHospital />,
    };

    return (
        <Box sx={{ border: 2, borderColor: 'black', marginBottom: '1em', borderRadius: '4px', padding: '0.5em'}}>
            <Typography variant="body1">{entry.date} {entryTypeIcon[entry.type]}</Typography>
            <Typography variant="body1">{entry.description}</Typography>
            <EntryDetails entry={entry} />
            {diagnosisCodes.length > 0 && (
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                    {diagnosisCodes.map((code) => (
                        <ListItem key={code}>
                            <Typography variant="body1">• {code}</Typography>
                        </ListItem>
                    ))}
                </List>
            )}
            <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
        </Box>
    );
};

export default Entry;