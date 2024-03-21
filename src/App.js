import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [invalidInputMessage, setInvalidInputMessage] = useState('');

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'targetDate') {
      setTargetDate(value);
    }
  };

  const startCountdown = () => {
    clearInterval(intervalId);

    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      setInvalidInputMessage('Please enter a future date and time.');
      return;
    }

    const daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (daysDifference > 100) {
      setInvalidInputMessage('Selected time is more than 100 Days.');
      return;
    }

    setInvalidInputMessage('');
    setCountdownComplete(false);
    const newIntervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = target.getTime() - currentTime;

      if (remainingTime <= 0) {
        clearInterval(newIntervalId);
        setCountdown(0);
        setCountdownComplete(true);
        setIntervalId(null);
      } else {
        setCountdown(remainingTime);
      }
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setCountdown(0);
    setCountdownComplete(false);
    setInvalidInputMessage('');
    setIntervalId(null);
  };

  return (
    <div className="App">
      <h1 className="title">Countdown Timer</h1>
      <div className="input-container">
        <label htmlFor="targetDate" className="label">Target Date and Time:</label>
        <input
          type="datetime-local"
          id="targetDate"
          name="targetDate"
          value={targetDate}
          onChange={handleInputChange}
          max={`${new Date().getFullYear() + 1}-12-31T23:59`}
          required
          className="input-field"
        />
        {intervalId ? (
          <button onClick={stopCountdown} className="stop-button">Stop Countdown</button>
        ) : (
          <button onClick={startCountdown} className="start-button">Start Countdown</button>
        )}
        {invalidInputMessage && <p className="error-message">{invalidInputMessage}</p>}
      </div>
      <div className="countdown-container">
        {countdownComplete ? (
          <p className="countdown-complete">Countdown complete!</p>
        ) : (
          <div className="countdown">
            <span className="countdown-text">{Math.floor(countdown / (1000 * 60 * 60 * 24))} Days</span>
            <span className="countdown-text">{Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} Hours</span>
            <span className="countdown-text">{Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))} Minutes</span>
            <span className="countdown-text">{Math.floor((countdown % (1000 * 60)) / 1000)} seconds</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
