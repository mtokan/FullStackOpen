import {HospitalEntry} from '../../../types.ts';
import {Typography} from '@mui/material';

const HospitalEntry = ({entry}: {entry: HospitalEntry}) => {
    return (
        <Typography variant="body1">Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
    );
};

export default HospitalEntry;