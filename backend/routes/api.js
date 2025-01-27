const express = require("express");
const axios = require("axios");
const router = express.Router();
const app = express();

// Fetch world time API data
router.get("/timezones", async (req, res) => {
    try {
        const response = await axios.get("http://worldtimeapi.org/api/timezone");
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch time zones" });
    }
});

router.get("/weather", async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

router.get('/sunrise-sunset', async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch sunrise/sunset data' });
    }
});


router.get('/moon-phase', async (req, res) => {
    try {
        const apiKey = process.env.NASA_API_KEY;
        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch moon phase data' });
    }
});


module.exports = router;
