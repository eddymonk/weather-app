import React from 'react';
import './Weather.css'; 


const Weather = ({description, city, country, error, temperature, humidity}) => {
 return (
     <div className="weather">
         {<p>Right now</p>}
         {city && country && <p>{city}, {country}</p>}
         {temperature && <p>{temperature} C</p>}
         {description && <p> {description}</p>}
         {humidity && <p>{humidity}% humidity </p> }
         {error && <p>{error}</p>}
     </div>
 )
}

export default Weather; 