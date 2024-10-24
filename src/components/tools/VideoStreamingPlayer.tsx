import React, { useRef, useState } from 'react';

const VideoStreamingPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('your-video-source.mp4');

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.volume = Number(event.target.value);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Video Streaming Player</h2>
      <input
        type="text"
        value={videoUrl}
        onChange={handleUrlChange}
        placeholder="Enter video URL"
        className="mb-4 p-2 border"
      />
      <video ref={videoRef} width="600" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls mt-4">
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleStop}>Stop</button>
        <label>
          Volume:
          <input type="range" min="0" max="1" step="0.1" onChange={handleVolumeChange} />
        </label>
      </div>
    </div>
  );
};

export default VideoStreamingPlayer;
