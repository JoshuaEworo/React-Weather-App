import './App.css';
import React, { useState, useEffect } from 'react';
import{ fetchWeather } from './api/fetchWeather';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const d = new Date();
  const date = d.toDateString();

  const search = async(e) => {
    if (e.key === 'Enter'){
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  }

  useEffect(()=>{
    const initLoad = async()=>{
      const data = await fetchWeather('Houston');
      setWeather(data);
      setQuery('');
    }

    initLoad();
  }, [])

  return (
    <div className="main-container flex items-center justify-center h-screen top-4 bottom-0 sm:bottom-0 left-0 right-0">
      <div className="Weather-Section-0 mx-auto flex flex-col gap-5 border rounded">
        <div className="flex align-middle justify-center p-2">
          <input type="text" className="0-Search-Bar self-center w-3/4 border-black border-2 rounded mx-auto my-4 bg-transparent focus:outline-none" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
        </div>

        {(weather.main && (
          <div className="0-City-Section flex flex-col justify-center gap-16">
            <h1 className="0-City-Name-And-Date text-center">
              <span className="text-4xl">{weather.name}</span><br/>
              <span classname="text-3xl">{date}</span>
            </h1>

            <div className="0-Info flex flex-col justify-center">
              <div className="0-Temp text-center text-9xl font-semibold">
                {Math.round(weather.main.temp)}
                <sup>&deg;</sup>
              </div>
            </div>

            <div className="0-Sec-Info flex flex-col text-center justify-center">
              <hr className="hr-0 w-1/2 m-auto mb-2"/>
              <div className="flex flex-col text-center justify-center gap-2">
                <span className="0-desc text-xl">
                  {weather.weather[0].description}
                </span>
                <span className="0-desc text-2xl mb-8">
                  {Math.round(weather.main.temp_max)}<sup>&deg;F</sup> / {Math.round(weather.main.temp_min)}<sup>&deg;F</sup>
                </span>  
              </div>
            </div>

          </div>
        )) || (
          <>
            <div className="SplashScreen-0 font-extralight flex flex-col mx-auto text-5xl my-20 text-center w-full h-2/6 justify-center">
              <i className="">~ Weather ~ <br/> App</i>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
