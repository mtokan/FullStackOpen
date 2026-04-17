import {TextField} from '@mui/material';
import {HospitalEntryFormProps} from '../../../types.ts';

const HospitalEntryForm = (props: HospitalEntryFormProps) => {

    return (
        <>
            <TextField
                label="Discharge date"
                type="date"
                variant="standard"
                value={props.dischargeDate}
                onChange={(e) => props.setDischargeDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!props.dischargeDate && props.submitted}
                helperText={!props.dischargeDate && props.submitted ? 'Required' : ''}
            />
            <TextField
                label="Discharge criteria"
                variant="standard"
                value={props.dischargeCriteria}
                onChange={(e) => props.setDischargeCriteria(e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!props.dischargeCriteria && props.submitted}
                helperText={!props.dischargeCriteria && props.submitted ? 'Required' : ''}
            />
        </>
    );
};

export default HospitalEntryForm;