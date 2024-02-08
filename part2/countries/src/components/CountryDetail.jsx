import Weather from "./Weather.jsx";

const CountryDetail = ({country}) => {
    const capital = country.capital.join(', ');
    const languages = Object.values(country.languages);
    return (
        <div>
            <hr/>
            <h1>{country.name.common}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {country.area}</p>
            <p>languages: </p>
            <ul>
                {languages.map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
            <Weather latlng={country.capitalInfo.latlng} cityName={capital}/>
            <hr/>
        </div>
    )
}

export default CountryDetail;