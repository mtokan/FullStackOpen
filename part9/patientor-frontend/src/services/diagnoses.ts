import axios from 'axios';
import {Diagnosis} from '../types.ts';
import {apiBaseUrl} from '../constants.ts';

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};

export default { getAll };