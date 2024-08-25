import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import voicelogo from '../assets/voice-logo.png';
import mic from '../assets/mic.png';
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircleStop } from "react-icons/fa6";

const HomePage = () => {
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://python-backend-server.vercel.app/'); // Corrected URL
                setOutput(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const changeData = setInterval(fetchData, 20000); // Polling every 10 seconds
        fetchData();

        return () => clearInterval(changeData); // Clean up interval on unmount
    }, []);

    return (
        <React.Fragment>
            <div className='main-container'>
                <div className="logo-container">
                    <img src={voicelogo} alt="Voice Logo" className='logo' />
                </div>
                <div className="response-container">
                    {output.length > 0 && (
                        <p className='response-text'>{output.join(' ')}</p>
                    )}
                </div>
                <div className="items">
                    <RxCrossCircled className='stop-cancel' />
                    <button className='record'><img src={mic} alt="Mic" className='mic' /></button>
                    <FaRegCircleStop className='stop-cancel' />
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomePage;
