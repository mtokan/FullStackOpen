import {useEffect, useState} from "react";
import axios from "axios";
import Filter from "./components/Filter.jsx";
import Countries from "./components/Countries.jsx";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
            })
    }, []);

    const filteredCountries =
        filter === '' ? countries :
            countries.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))

    return (
        <div>
            <Filter setFilter={setFilter}></Filter>
            <Countries countries={filteredCountries}/>
        </div>
    )
}

export default App;