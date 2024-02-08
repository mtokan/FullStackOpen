import {useState} from "react";
import CountryDetail from "./CountryDetail.jsx";

const Country = ({country}) => {
    const [shouldShow, setShouldShow] = useState(false);
    const handleOnClick = () => setShouldShow(!shouldShow);

    if (shouldShow === false) {
        return (
            <p>
                {country.name.common}
                <button onClick={handleOnClick}>Show</button>
            </p>
        )
    } else {
        return (
            <div>
                <p>
                    {country.name.common}
                    <button onClick={handleOnClick}>Hide</button>
                </p>
                <CountryDetail country={country}/>
            </div>
        )
    }
}

export default Country;