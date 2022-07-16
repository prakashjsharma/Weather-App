import React, { useEffect, useState } from 'react';
import WeatherCard from './weatherCard';
import './style.css';


//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=50a9f06596f21df477c2c4442e99f751
const weather = () => {

    const [searchValue, setSearchValue] = useState("bhiwandi");
    const [data, setData] = useState({});
    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=50a9f06596f21df477c2c4442e99f751`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main: weathertype} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {sunset, country} = data.sys;

            const myWeatherData = {
                temp,
                humidity, 
                pressure,
                weathertype,
                name,
                speed,
                sunset,
                country
            };
            setData(myWeatherData);
        }catch{
            console.log()
        }
    };

    useEffect(() => {
        getWeatherInfo();
    },[])
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...' autoFocus id="search" className='searchTerm' 
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                    />
                    <button className="searchButton" type='button' onClick={getWeatherInfo}>Search</button>

                </div>
            </div>

            <WeatherCard data={data}/>
            
        </>
    )
}

export default weather
