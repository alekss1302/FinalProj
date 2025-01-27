import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DarkModeToggle from "react-dark-mode-toggle";
import { useNavigate } from "react-router-dom";

const AstronomyPage = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [astronomyPicture, setAstronomyPicture] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navigate = useNavigate();

    const latitude = 51.5074; // London's latitude
    const longitude = -0.1278; // London's longitude
    const YOUR_API_KEY = "a18971320ced822119f78ed608c56ac0"; // Replace with your OpenWeather API Key
    const YOUR_NASA_API_KEY = "azcHAiEbmgCDaUARiDbmf9Oqe5Lt7gNVW9ArhY7u"; // Replace with your NASA API Key

    const moonPhases = [
        "New Moon",
        "Waxing Crescent",
        "First Quarter",
        "Waxing Gibbous",
        "Full Moon",
        "Waning Gibbous",
        "Last Quarter",
        "Waning Crescent",
    ];

    const moonPhaseDescriptions = [
        "The moon is not visible (New Moon).",
        "A sliver of the moon is visible (Waxing Crescent).",
        "Half of the moon is illuminated (First Quarter).",
        "Most of the moon is visible (Waxing Gibbous).",
        "The entire moon is visible (Full Moon).",
        "The moon is gradually waning (Waning Gibbous).",
        "Half of the moon is visible during its waning phase (Last Quarter).",
        "A sliver of the moon is visible as it approaches New Moon (Waning Crescent).",
    ];


    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const fetchAstronomyData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${YOUR_API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setData(data.daily[0]); // Use the first day's data
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchAstronomyPicture = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/planetary/apod?api_key=${YOUR_NASA_API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const picture = await response.json();
                setAstronomyPicture(picture);
            } catch (error) {
                console.error("Error fetching NASA APOD:", error);
            }
        };

        fetchAstronomyData();
        fetchAstronomyPicture();
    }, [latitude, longitude, YOUR_API_KEY]);

    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    const { sunrise, sunset, moonrise, moonset, moon_phase } = data;

    const moonPhaseIndex = Math.round(moon_phase * 8) % 8;

    return (
        <div
            className={`min-h-screen ${
                isDarkMode ? "bg-black text-white" : "bg-gradient-astronomy text-black"
            } p-6`}
        >
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
                    Astronomy Info
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
                    Explore today's astronomical events.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md text-center"
                        data-tip="The time when the sun rises above the horizon."
                    >
                        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                            Sunrise
                        </h2>
                        <p className="text-lg text-blue-700 dark:text-blue-100 mt-2">
                            {new Date(sunrise * 1000).toLocaleTimeString()}
                        </p>
                    </div>
                    <div
                        className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow-md text-center"
                        data-tip="The time when the sun sets below the horizon."
                    >
                        <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
                            Sunset
                        </h2>
                        <p className="text-lg text-yellow-700 dark:text-yellow-100 mt-2">
                            {new Date(sunset * 1000).toLocaleTimeString()}
                        </p>
                    </div>
                    <div
                        className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg shadow-md text-center"
                        data-tip="The time when the moon rises above the horizon."
                    >
                        <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
                            Moonrise
                        </h2>
                        <p className="text-lg text-purple-700 dark:text-purple-100 mt-2">
                            {new Date(moonrise * 1000).toLocaleTimeString()}
                        </p>
                    </div>
                    <div
                        className="bg-indigo-100 dark:bg-indigo-800 p-4 rounded-lg shadow-md text-center"
                        data-tip="The time when the moon sets below the horizon."
                    >
                        <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
                            Moonset
                        </h2>
                        <p className="text-lg text-indigo-700 dark:text-indigo-100 mt-2">
                            {new Date(moonset * 1000).toLocaleTimeString()}
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                        Moon Phase
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                        {moonPhases[moonPhaseIndex]}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {moonPhaseDescriptions[moonPhaseIndex]}
                    </p>
                    <div className="mt-4">
                        <img
                            src={`https://www.timeanddate.com/scripts/moon.php?Mphase=${moonPhaseIndex}`}
                            alt="Moon Phase"
                            className="mx-auto"
                        />
                    </div>
                </div>

                {astronomyPicture && (
                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-bold text-white dark:text-gray-300">
                            {astronomyPicture.title}
                        </h2>
                        <img
                            src={astronomyPicture.url}
                            alt={astronomyPicture.title}
                            className="mx-auto mt-4 rounded shadow-lg"
                        />
                        <p className="text-gray-300 dark:text-gray-400 mt-2">
                            {astronomyPicture.explanation}
                        </p>
                    </div>
                )}

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <div className="text-center mt-6">
            <button onClick={toggleDarkMode}>
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
            </div>
        </div>
    );
};

export default AstronomyPage;
