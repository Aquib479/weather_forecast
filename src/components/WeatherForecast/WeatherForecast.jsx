import React, { useEffect, useState } from 'react';
import './WeatherForecast.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import clear from '../../Images/clear.png';
import clouds from '../../Images/clouds.png';
import drizzle from '../../Images/drizzle.png';
import mist from '../../Images/mist.png';
import rain from '../../Images/rain.png';
import snow from '../../Images/snow.png';
import thunderstorm from '../../Images/thunderstorm.png';
import humi from '../../Images/drop.png';
import feel from '../../Images/thermometer.png'



const WeatherForecast = ({ weather, setResult }) => {
    const [icon, setIcon] = useState("");
    const [capitalizeFirst, setCapitalizeFirst] = useState("");
    function getIcon() {
        const data = weather.weather[0].main;
        switch (data) {
            case "Haze":
                setIcon({ icon: clear });
                break;
            case "Clouds":
                setIcon({ icon: clouds });
                break;
            case "Rain":
                setIcon({ icon: rain });
                break;
            case "Snow":
                setIcon({ icon: snow });
                break;
            case "Dust":
                setIcon({ icon: mist });
                break;
            case "Drizzle":
                setIcon({ icon: drizzle });
                break;
            case "Fog":
                setIcon({ icon: mist });
                break;
            case "Smoke":
                setIcon({ icon: mist });
                break;
            case "Tornado":
                setIcon({ icon: mist });
                break;
            case "Thunderstorm":
                setIcon({ icon: thunderstorm });
                break;
            default:
                setIcon({ icon: clear });
        }

        // capitalize first letter of each word !!
        const desc = weather.weather[0].description;
        const arr = desc.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

        }
        const capitalize = arr.join(" ");
        setCapitalizeFirst(capitalize);
    }

    const handleClickMoveBack = () => {
        setResult(false);
    }
    useEffect(() => {
        getIcon();
    }, [])

    return (
        <>
            {
                weather.weather.map(val => {
                    return <div key={val.id} className='main-container'>
                        <div className="back-button">
                            <button onClick={handleClickMoveBack}><IoMdArrowRoundBack /></button>
                            <p>Weather Forecast</p>
                        </div>
                        <div className="icon-image">
                            <img src={icon.icon} alt="loading.." className='icon-size' />
                        </div>
                        <div className="temp">
                            <span className='temperature'>{Math.round(weather.main.temp)}°C</span>
                            <p key={val.id} className='C-detail'>{capitalizeFirst}</p>
                            <p className='C-detail'><IoLocationSharp /> {weather.name}, {weather.sys.country}</p>
                        </div>
                        <div className="other-details">
                            <li className='grid-box'>
                                <img src={humi} alt="loading.." className="icon" />
                                <div className='more-detail'>
                                    <span className='val'>{Math.round(weather.main.humidity)}%</span>
                                    <p className='val-name'>Humidity</p>
                                </div>
                            </li>
                            <li className='grid-box'>
                                <img src={feel} alt="loading.." className="icon" />
                                <div className='more-detail'>
                                    <span className='val'>{Math.round(weather.main.feels_like)}°C</span>
                                    <p className='val-name'>Feels Like</p>
                                </div>
                            </li>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default WeatherForecast