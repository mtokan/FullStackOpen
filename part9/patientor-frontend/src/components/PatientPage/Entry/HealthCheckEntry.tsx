import { HealthCheckEntry } from '../../../types.ts';
import { Rating } from '@mui/material';
import { Favorite, FavoriteBorder} from '@mui/icons-material';

const HealthCheckEntry = ({entry}: {entry: HealthCheckEntry}) => {

    return (
        <Rating
            value={4 - entry.healthCheckRating}
            max={4}
            readOnly
            icon={<Favorite color="error" />}
            emptyIcon={<FavoriteBorder sx={{ color: 'black' }}/>}
        />
    );
};

export default HealthCheckEntry;