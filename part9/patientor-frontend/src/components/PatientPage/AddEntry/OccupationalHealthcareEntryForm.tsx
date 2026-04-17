import {FormControlLabel, Switch, TextField} from '@mui/material';
import {OccupationalHealthcareEntryFormProps} from '../../../types.ts';

const OccupationalHealthcareEntryForm = (props: OccupationalHealthcareEntryFormProps) => {
    return (
      <>
          <TextField
              label="Employer Name"
              value={props.employerName}
              onChange={(e) => props.setEmployerName(e.target.value)}
              variant="standard"
              InputLabelProps={{ shrink: true }}
              error={!props.employerName && props.submitted}
              helperText={!props.employerName && props.submitted ? 'Required' : ''}
          />
          <FormControlLabel
              control={
                  <Switch
                      checked={props.sickLeave}
                      onChange={(e) => props.setSickLeave(e.target.checked)}
                  />
              }
              label="Sick leave"
          />
          {props.sickLeave && (
              <>
                  <TextField
                      label="Start date"
                      type="date"
                      variant="standard"
                      value={props.sickLeaveStartDate}
                      onChange={(e) => props.setSickLeaveStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!props.sickLeaveStartDate && props.submitted}
                      helperText={!props.sickLeaveStartDate && props.submitted ? 'Required' : ''}
                  />
                  <TextField
                      label="End date"
                      type="date"
                      variant="standard"
                      value={props.sickLeaveEndDate}
                      onChange={(e) => props.setSickLeaveEndDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!props.sickLeaveEndDate && props.submitted}
                      helperText={!props.sickLeaveEndDate && props.submitted ? 'Required' : ''}
                  />
              </>
          )}
      </>
    );
};

export default OccupationalHealthcareEntryForm;