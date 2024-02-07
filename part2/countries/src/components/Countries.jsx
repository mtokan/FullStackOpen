const Country = ({name}) => {
    return (
        <p>{name}</p>
    )
}

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
                        <Country key={country.name.common} name={country.name.common}/>
                    )
                }
            </div>
        )
    } else if (countries.length === 1) {
        const country = countries[0];
        const capital = country.capital.join(', ')
        const languages = Object.values(country.languages)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {capital}</p>
                <p>Area: {country.area}</p>
                <p>languages: </p>
                <ul>
                    {languages.map(language =>
                    <li key={language} >{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
            </div>
        )
    }
}

export default Countries;