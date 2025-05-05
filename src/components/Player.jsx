import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./MusicPlayer.css";
import { Card, CardBody, Image, Spinner } from "@nextui-org/react";
import usePlayerStore from "../usePlayerStore";
import YouTubeAPI from "../api/api";
import useFavoritesStore from "../useFavoritesStore";

const MusicPlayer = ({ isOpen, songUrl }) => {
  const playerRef = useRef(null);
  const hasFetchedSuggestions = useRef(false);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("Now Playing");
  const [thumbnail, setThumbnail] = useState("https://raw.githubusercontent.com/iamshibamnaskar/MUSO/refs/heads/main/src/assets/logo.png");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentUrl = playlist[currentTrackIndex];
  const { currentThumbnail } = usePlayerStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const [isFavorited, setIsFavorited] = useState(false);

  // Update thumbnail from global store
  useEffect(() => {
    if (currentThumbnail) {
      setThumbnail(currentThumbnail);
    }
  }, [currentThumbnail]);

  // 🔁 React to changes in songUrl
  useEffect(() => {
    if (songUrl && ReactPlayer.canPlay(songUrl)) {
      setPlaylist([songUrl]);
      setCurrentTrackIndex(0);
      setIsLoading(true);
      hasFetchedSuggestions.current = false;
      console.log("🎶 Playlist updated with:", songUrl);
    }
  }, [songUrl]);

  useEffect(() => {
    if (currentUrl) {
      setIsFavorited(isFavorite(currentUrl));
    }
  }, [currentUrl, isFavorite]);

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

  const handleNext = () => {
    if (currentTrackIndex + 1 < playlist.length) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTime(0);
      setIsLoading(true);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
      setIsLoading(true);
    }
  };

  // ⏱ Update title/thumbnail from player
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const internal = playerRef.current.getInternalPlayer();
        if (internal?.getVideoData) {
          const videoData = internal.getVideoData();
          if (videoData?.video_id) {
            setTitle(videoData.title || "Now Playing");
            setThumbnail(`https://img.youtube.com/vi/${videoData.video_id}/0.jpg`);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTrackIndex]);

  // 🚀 Fetch suggested videos (once per session)
  const fetchSuggestedVideos = async (videoId) => {
    console.log("🎯 Fetching suggestions for video ID:", videoId);
    try {
      const suggested = await YouTubeAPI.getNextVideos(videoId);
      console.log("✅ Suggested videos fetched:", suggested);
      setPlaylist((prev) => [...prev, ...suggested]);
    } catch (err) {
      console.error("Failed to fetch suggested videos:", err);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(currentUrl);
    } else {
      addToFavorites({
        url: currentUrl,
        title: title,
        thumbnail: thumbnail,
      });
    }
    setIsFavorited(!isFavorited);
  };

  if (!isOpen || !currentUrl) return null;

  return (
    <div className="music-player">
      <Card className="player-card">
        <CardBody className="p-0">
          <div className="player-content">
            <div className="song-info">
              {isLoading && (
                <div className="loading-overlay">
                  <Spinner color="white" size="lg" />
                </div>
              )}
              <Image
                src={thumbnail}
                alt="Thumbnail"
                className="song-thumbnail"
                width={100}
                height={100}
              />
              <div className="song-details">
                <div className="title-row">
                  <h3 className="song-title">{title}</h3>
                  <button 
                    className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                    onClick={toggleFavorite}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path
                        fill="currentColor"
                        d={isFavorited 
                          ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                        }
                      />
                    </svg>
                  </button>
                </div>
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

              <div className="control-buttons">
                <button className="control-btn" onClick={handlePrevious} title="Previous" disabled={currentTrackIndex <= 0}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                <button className="play-pause-btn" onClick={togglePlayPause} title="Play/Pause">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    {isPlaying ? (
                      <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                      <path fill="currentColor" d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </button>

                <button className="control-btn" onClick={handleNext} title="Next" disabled={currentTrackIndex >= playlist.length - 1}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </CardBody>
      </Card>

      <ReactPlayer
        ref={playerRef}
        url={currentUrl}
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={() => console.log("Player Ready")}
        onStart={() => console.log("Playback Started")}
        onPlay={() => {
          console.log("Playing");
          if (!hasFetchedSuggestions.current && currentTrackIndex === 0) {
            const internal = playerRef.current?.getInternalPlayer();
            const videoId = internal?.getVideoData?.().video_id;
            if (videoId) {
              console.log("🔥 First track - Video ID:", videoId);
              fetchSuggestedVideos(videoId);
            }
            hasFetchedSuggestions.current = true;
          }
        }}
        onPause={() => console.log("Paused")}
        onBuffer={() => console.log("Buffering")}
        onSeek={(seconds) => console.log("Seek to:", seconds)}
        onError={(error) => console.log("Player Error:", error)}
        onEnded={() => {
          console.log("Playback Ended");
          const nextIndex = currentTrackIndex + 1;
          if (nextIndex < playlist.length) {
            setCurrentTrackIndex(nextIndex);
            setCurrentTime(0);
            setIsLoading(true);
          } else {
            setIsPlaying(false);
          }
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MusicPlayer;
