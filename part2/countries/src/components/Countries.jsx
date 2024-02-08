import Country from "./Country.jsx";
import CountryDetail from "./CountryDetail.jsx";

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                {
                    countries.map(country =>
                        <Country key={country.name.common} country={country}/>
                    )
                }
            </div>
        )
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <CountryDetail country={country}/>
        )
    }
}

export default Countries;