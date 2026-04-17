import {OccupationalHealthcareEntry} from '../../../types.ts';
import {Typography} from '@mui/material';

const OccupationalHealthcareEntry = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    return (
        <>
            <Typography variant="body1">Employer: {entry.employerName}</Typography>
            {entry.sickLeave && (
                <>
                    <Typography variant="body1">Sick leave start: {entry.sickLeave?.startDate}</Typography>
                    <Typography variant="body1">Sick leave end: {entry.sickLeave?.endDate}</Typography>
                </>
            )}
        </>
    );
};

export default OccupationalHealthcareEntry;