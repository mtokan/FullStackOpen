import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {HealthCheckEntryFormProps, HealthCheckRating} from '../../../types.ts'

const HealthCheckEntryForm = (props: HealthCheckEntryFormProps) => {
    return (
        <FormControl>
            <FormLabel>Health Rating</FormLabel>
            <RadioGroup
                row
                value={props.healthCheckRating}
                onChange={(e) => props.setHealthCheckRating(Number(e.target.value))}
            >
                {Object.entries(HealthCheckRating)
                    .filter(([, value]) => typeof value === 'number')
                    .map(([key, value]) => (
                        <FormControlLabel
                            key={value}
                            value={value}
                            control={<Radio />}
                            label={`${value} - ${key}`}
                        />
                    ))}
            </RadioGroup>
        </FormControl>
    );
};

export default HealthCheckEntryForm;