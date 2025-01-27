import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoonPhasePage = () => {
    const [moonData, setMoonData] = useState(null);

    useEffect(() => {
        const fetchMoonData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/moon-phase');
                setMoonData(data);
            } catch (error) {
                console.error('Error fetching moon phase data:', error);
            }
        };

        fetchMoonData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Moon Phase</h1>
            {moonData ? (
                <div className="mt-4">
                    <img src={moonData.url} alt="Moon Phase" className="rounded shadow-md" />
                    <p className="mt-2">{moonData.explanation}</p>
                </div>
            ) : (
                <p>Loading moon phase data...</p>
            )}
        </div>
    );
};

export default MoonPhasePage;
