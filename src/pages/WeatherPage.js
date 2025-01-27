import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const WeatherPage = () => {
    const [city, setCity] = useState(""); // City input
    const [weather, setWeather] = useState(null); // Current weather data
    const [forecast, setForecast] = useState([]); // 5-day forecast data
    const [error, setError] = useState(""); // Error handling
    const [background, setBackground] = useState("bg-gray-100"); // Background style
    const [favorites, setFavorites] = useState([]); // Favorite cities
    const [location, setLocation] = useState({ lat: 51.5074, lon: -0.1278 }); // Default to London

    const apiKey = "a18971320ced822119f78ed608c56ac0"; // Replace with your OpenWeatherMap API Key

    // Fetch Current Weather and Forecast
    const fetchWeather = async (cityName) => {
        if (!cityName) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const currentWeatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
            );

            if (!currentWeatherResponse.ok) {
                throw new Error("City not found!");
            }

            const weatherData = await currentWeatherResponse.json();
            setWeather(weatherData);
            setLocation({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
            );
            if (!forecastResponse.ok) {
                throw new Error("Failed to fetch forecast!");
            }

            const forecastData = await forecastResponse.json();
            const dailyForecast = forecastData.list.filter((entry) =>
                entry.dt_txt.includes("12:00:00")
            );
            setForecast(dailyForecast);

            setError(""); // Clear any previous error
        } catch (err) {
            setWeather(null);
            setForecast([]);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (weather) {
            const condition = weather.weather[0].main.toLowerCase();
            if (condition.includes('clear')) {
                setBackground('bg-gradient-to-br from-yellow-300 to-orange-400');
            } else if (condition.includes('rain')) {
                setBackground('bg-gradient-to-br from-blue-500 to-gray-700');
            } else if (condition.includes('cloud')) {
                setBackground('bg-gradient-to-br from-gray-300 to-gray-500');
            } else {
                setBackground('bg-gradient-to-br from-gray-200 to-gray-400');
            }
        }
    }, [weather]);

    // Auto-detect Location
    const detectLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to detect location weather!");
                    }

                    const weatherData = await response.json();
                    setCity(weatherData.name); // Update city name
                    fetchWeather(weatherData.name); // Fetch weather data
                } catch (error) {
                    setError("Unable to fetch weather for your location.");
                }
            },
            () => {
                setError("Unable to retrieve your location.");
            }
        );
    };

    // Save to Favorites
    const addToFavorites = () => {
        if (city && !favorites.includes(city)) {
            setFavorites([...favorites, city]);
        }
    };

    return (
        <div className={`min-h-screen ${background} p-6`}>
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600">Weather Search</h1>
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button
                        onClick={() => fetchWeather(city)}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Get Weather
                    </button>
                    <button
                        onClick={detectLocation}
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4"
                    >
                        Use My Location
                    </button>
                    <button
                        onClick={addToFavorites}
                        className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mt-4"
                    >
                        Save to Favorites
                    </button>
                </div>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {weather && (
                    <div className="mt-6 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-md p-6">
                        <h2 className="text-4xl font-bold text-center">{weather.name}, {weather.sys.country}</h2>
                        <p className="text-center text-xl capitalize mt-4">{weather.weather[0].description}</p>
                        <div className="flex justify-center mt-4">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                alt="Weather Icon"
                                className="w-24 h-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-white text-blue-800 rounded-lg p-4 shadow">
                                <h3 className="text-lg font-semibold">Temperature</h3>
                                <p className="text-2xl">{weather.main.temp}°C</p>
                            </div>
                            <div className="bg-white text-yellow-800 rounded-lg p-4 shadow">
                                <h3 className="text-lg font-semibold">Humidity</h3>
                                <p className="text-2xl">{weather.main.humidity}%</p>
                            </div>
                            <div className="bg-white text-green-800 rounded-lg p-4 shadow">
                                <h3 className="text-lg font-semibold">Wind Speed</h3>
                                <p className="text-2xl">{weather.wind.speed} m/s</p>
                            </div>
                            <div className="bg-white text-red-800 rounded-lg p-4 shadow">
                                <h3 className="text-lg font-semibold">Pressure</h3>
                                <p className="text-2xl">{weather.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                )}

                {forecast.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">5-Day Forecast</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {forecast.map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-lg p-4 text-center"
                                >
                                    <p className="text-gray-700 font-semibold">
                                        {new Date(day.dt_txt).toLocaleDateString()}
                                    </p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        alt="Weather Icon"
                                        className="mx-auto"
                                    />
                                    <p className="text-gray-600">{day.weather[0].description}</p>
                                    <p className="text-blue-800 font-bold">{day.main.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {favorites.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Favorite Cities</h2>
                        <ul className="list-disc list-inside mt-4 text-gray-700">
                            {favorites.map((favCity, index) => (
                                <li key={index}>{favCity}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold text-center mb-4">Location Map</h3>
                <MapContainer
                    center={[location.lat, location.lon]}
                    zoom={10}
                    style={{ height: '400px', width: '100%' }}
                    className="rounded-lg shadow-md"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.lat, location.lon]}>
                        <Popup>
                            {weather && <p>{weather.name}</p>}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="text-center">
                    <p>&copy; 2025 Weather App. All Rights Reserved.</p>
                    <p>
                        Data provided by <a href="https://openweathermap.org/" className="text-blue-400 underline">OpenWeatherMap</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WeatherPage;
