import React, { useState } from 'react';
import './GetWeather.css';
import API from '../apiKey';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import { MdLocationPin } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { VscError } from "react-icons/vsc";
import { BiLoader } from "react-icons/bi";
import axios from 'axios';

const GetWeather = () => {
    const [weather, setWeather] = useState(null);
    const [cityName, setCityName] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);

    // handling the user input search !!
    const handleCityName = (event) => {
        setCityName(event.target.value);
    }

    // handling the weather search !!
    const handleWeatherSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        await axios.get(`${API.base_url}weather?q=${cityName}&units=metric&appid=${API.key}`)
            .then((response) => {
                setWeather(response.data);
                if (response.status === 200) {
                    setLoading(false);
                    setCityName('');
                    setError('');
                    setResult(true);
                }
            })
            .catch((error) => {
                setLoading(false);
                setCityName("");
                setWeather(null);
                setError({ message: "Sorry no data found !" });
                console.log(error);
            });
    }

    // get the devie location of user !!
    const getDeviceLocation = () => {
        setLoading(true);
        // first let check wether the geolocation is supported or not !!
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, Error);  // call of two callback functions [success, error]
        } else {
            // error if not supported !!
            console.log("Geolocation not supported");
        }
    }

    // callback function !!
    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Make API call !!
        await axios.get(`${API.base_url}/weather?lat=${latitude}&lon=${longitude}&appid=${API.key}&units=metric`)
            .then(response => {
                setWeather(response.data);
                setLoading(false);
                setCityName('')
                setError('');
                setResult(true);
            })
            .catch(function (error) {
                setWeather(null);
                setError({ message: "Sorry no data found !" });
                console.log(error);
            });
    }

    // callback function !!
    function Error() {
        setError({ message: "Unable to find your location" });
    }

    return (
        <>
            {!result ? (<div className='main-container'>
                <div className="weather_container">
                    <div className='head'>
                        <h1>Weather App</h1>
                    </div>
                    {error.message && <div className="show-error">
                        <figure><VscError /></figure>
                        <span className='error'>{error.message}</span>
                    </div>}
                    <div className='user-choice'>
                        <form className="user-input" onSubmit={handleWeatherSearch}>
                            <input type="text" name="City_name" value={cityName} id="city" placeholder='Enter city name' onChange={handleCityName} disabled={loading} />
                            <button type='submit' className='search'>{loading ? <BiLoader className='spin' /> : <HiSearch />}</button>
                        </form>
                        <div className='OR'>
                            <figure className='dash'></figure>
                            <h4>OR</h4>
                            <figure className='dash'></figure>
                        </div>
                        <div className="device-location">
                            <button className='btn' onClick={getDeviceLocation} disabled={loading}>
                                <figure><MdLocationPin /></figure>
                                <p> Get Device Location</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>) : (
                <WeatherForecast
                    weather={weather}
                    setResult={setResult}
                />
            )}
        </>
    )
}

export default GetWeather