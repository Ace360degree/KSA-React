'use client';
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './../../player.css';
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { ImVolumeMute2 } from "react-icons/im";
import { FaVolumeUp } from "react-icons/fa";





const CustomPlayer = ({videoUrl,width,height}) => {
  // State variables
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Ref to control ReactPlayer
  const playerRef = useRef(null);

  // Handlers
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // Helper function to format time
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = ('0' + date.getUTCSeconds()).slice(-2);
    if (hh) {
      return `${hh}:${('0' + mm).slice(-2)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div className="custom-player-wrapper">
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={videoUrl} // Replace with your video URL
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width={width}
        height={height}
      />
      <div className="controls">
        <button onClick={handlePlayPause}>
          {playing ? <IoMdPause /> : <FaPlay />}
        </button>
        <button onClick={handleMute}>
          {muted ? <FaVolumeUp /> : <ImVolumeMute2 />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <span>
          {formatTime(played * duration)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default CustomPlayer;
