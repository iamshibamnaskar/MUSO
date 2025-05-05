import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./MusicPlayer.css";
import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import usePlayerStore from "../usePlayerStore";

const MusicPlayer = ({ isOpen, songUrl }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("Now Playing");
  const [thumbnail, setThumbnail] = useState("https://i.imgur.com/QuXh5sN.png");
  const { currentThumbnail } = usePlayerStore();

  useEffect(() => {
    if (currentThumbnail) {
      setThumbnail(currentThumbnail);
    }
  }, [currentThumbnail]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(playedSeconds);
    if (isLoading) setIsLoading(false);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className="music-player">
      <Card className="player-card">
        <CardBody className="p-0">
          <div 
            className="player-background"
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="player-content">
            <div className="song-info">
              {isLoading && (
                <div className="loading-overlay">
                  <Spinner color="white" size="lg" />
                </div>
              )}
              <div className="song-details">
                <h3 className="song-title">{title}</h3>
                <div className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </div>

            <div className="player-controls">
              <div className="progress-bar">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="seek-slider"
                />
              </div>

              <button className="play-pause-btn" onClick={togglePlayPause}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  {isPlaying ? (
                    <path
                      fill="currentColor"
                      d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                    />
                  ) : (
                    <path fill="currentColor" d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      <ReactPlayer
        ref={playerRef}
        url={songUrl}
        playing={isPlaying}
        onProgress={(state) => {
          handleProgress(state);
        }}
        onDuration={(duration) => {
          handleDuration(duration);
        }}
        onReady={(player) => {
          console.log("Player Ready:", player);
          console.log("Player Config:", player.getConfig());
          var internalPlayer = player.getInternalPlayer();
          var videoData = internalPlayer.getVideoData();
          setTitle(internalPlayer.getVideoData().title);
          setThumbnail(`https://img.youtube.com/vi/${videoData.video_id}/0.jpg`)
          console.log("Internal Player:", player.getInternalPlayer());
          console.log("Video Data:", videoData);
        }}
        onStart={() => console.log("Playback Started")}
        onPlay={() => console.log("Playing")}
        onPause={() => console.log("Paused")}
        onBuffer={() => console.log("Buffering")}
        onSeek={(seconds) => console.log("Seek to:", seconds)}
        onError={(error) => console.log("Player Error:", error)}
        onEnded={() => console.log("Playback Ended")}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MusicPlayer;
