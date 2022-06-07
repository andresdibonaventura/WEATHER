import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [latLon, setlatLon] = useState();
  const [weather, setweather] = useState();
  const [isBoolean, setisBoolean] = useState(true);
  const hour= new Date().getHours()
  const minute= new Date().getMinutes()
  let iconApp = (weather?.weather[0].icon)+".png"
  let urlApp = `https://openweathermap.org/img/wn/${iconApp}`

  const toogleIsBoolean = () => {
    setisBoolean(!isBoolean);
  };


  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setlatLon({ lat, lon });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (latLon !== undefined) {
      const API_KEY = "921ef5ae847f879f6f056bcb76bb6d97";
      const URL = `//api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
      axios
        .get(URL)
        .then((res) => setweather(res.data))
        .catch((err) => console.log(err));
    }
  }, [latLon]);

  console.log(urlApp);
  return (
    <div className="App">
      <h1>Weather App</h1>
      <h2 className="country">
      <i className="fa-solid fa-location-dot "></i>{weather?.name}, {weather?.sys.country} <br />
      </h2>
       
      <div className="ali-center">
      <div style={{"display" : "flex"}}> 
        <div  style={{"flex" : "50%"}}>
        <h1>{weather?.weather[0].main}</h1>
          <i className="fa-solid fa-cloud location"></i>{weather?.clouds.all} %<br />
          <i className="fa-solid fa-wind location"></i>{weather?.wind.speed} Km/h<br />
          <i className="fa-solid fa-temperature-full location"></i>{weather?.main.pressure} mB <br />
          <i className="fa-solid fa-clock location"></i>{hour}:{minute}<br />
        </div>
        <div style={{"flex" : "50%"}}>
          <div style={{"top" : "1px", "position" : "relative", "textAlign" : "center"}}>

          
          <h3> <img className="icon" src={urlApp}/></h3>
          <h3 className="temp">
        
            {isBoolean
              ? (weather?.main.temp - 273.15).toFixed(0) 
              : ((weather?.main.temp - 273.15) * 1.8 + 32).toFixed(0) } 
            {isBoolean ? 'C°' : 'F°'}
          </h3>
          </div>
        </div>
        
        </div>
        
        </div>
        <button className="btn-55 " onClick={toogleIsBoolean}> C°/ F° </button>
      
    </div>
  );
}

export default App;