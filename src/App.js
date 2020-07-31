import React, { useState, useRef } from 'react';
import './App.css';

const TIME_IN_SECONDS = 30 * 60;

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin!!!')
  const [timeLeft, setTimeLeft] = useState(TIME_IN_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const intervalRef = useRef(null); //keeps reference of interval from previous render

  function startTimer() {
    setTitle(`You're doing great!`);
    setIsRunning(true);
    setShowReset(true);

    intervalRef.current = setInterval(() => {
      //checks previous value and updates timeLeft
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  function stopTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTitle('Keep it up!');
  };

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTimeLeft(TIME_IN_SECONDS);
    setIsRunning(false);
    setShowReset(false);
    setTitle('Go another round!');
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime((timeLeft - minutes * 60));

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {showReset && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
