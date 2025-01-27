import React, { useState, useEffect } from "react";
import Share from '../components/Share';

const CountdownPage = () => {
    const [eventDate, setEventDate] = useState("");
    const [countdown, setCountdown] = useState("");

    const calculateCountdown = () => {
        const now = new Date();
        const targetDate = new Date(eventDate);
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
            setCountdown("The event has passed.");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (eventDate) calculateCountdown();
        }, 1000);

        return () => clearInterval(interval);
    }, [eventDate]);

    return (
        <div>
            <h1 className="text-2xl font-bold">Countdown Timer</h1>
            <div className="mt-6">
                <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
            </div>
            <div className="mt-4">
                <h2 className="text-lg">Time Left:</h2>
                <p className="text-2xl font-bold">{countdown}</p>
            </div>
            <Share url={window.location.href} title={`Countdown to ${eventDate}`} />
        </div>
    );
};

export default CountdownPage;
