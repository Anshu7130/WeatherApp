import React, { useEffect, useRef, useState } from 'react'
import humidity_icon from '../assets/Assets/humidity.png'
import search_icon from '../assets/Assets/search.png'
import wind_icon from '../assets/Assets/wind.png'
import './Weather.css'

const Weather = () => {
	const inputRef = useRef() 
   const[weatherData, setWeatherData] = useState(false);
	const search = async (city) =>{
		if(city===""){
			alert("Enter City Name");
			return;
		}
		try{
			const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
			const response = await fetch(url);
			const data = await response.json();
			if(!response.ok){
				alert(data.message);
				return;
			}
			console.log(data);
				 const phto = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

			setWeatherData({
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				temperature: Math.floor(data.main.temp),
				location: data.name,
				icon: phto,
			});
			}
		catch(error) {
      setWeatherData(false);
			console.error("Error in fetching wether data")
		}
		}

		const handleKeyDown = (event) => {
			if(event.key === 'Enter'){
				search(inputRef.current.value);
				inputRef.current.value = "";
			}
		}


		useEffect(()=>{
	   search("Dallas");
		},[])
	
	return (
		<div className='weather'>
			<div className='Search-bar'>
				<input ref={inputRef} type="text" placeholder='Search' onKeyDown={handleKeyDown} />
				 <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
			</div>
			{weatherData?<><img src={(weatherData.icon)} alt="weather-icon"/>
			<p className='temperature'>{weatherData.temperature}°c</p>
			<p className='location'>{weatherData.location}</p>
			<div className='weather-data'>
				<div className='col'>
           <img src={humidity_icon} alt="" />
					 <div>
					 <p>{weatherData.humidity}</p>
					 <span>Humidity</span>
					 </div>
				</div>
				<div className='col'>
           <img src={wind_icon} alt="" />
					 <div>
					 <p>{weatherData.windSpeed}</p>
					 <span>Wind Speed</span>
					 </div>
				</div>
			</div>
			</>:<></>}
			
		</div>
	)
}

export default Weather