import React, { useState, useRef } from 'react';

interface VideoFile {
  name: string;
  url: string;
}

const MultiCodecVideoPlayer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [playlist, setPlaylist] = useState<VideoFile[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPlaylist = Array.from(files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setPlaylist(newPlaylist);
      if (newPlaylist.length > 0) {
        setVideoSrc(newPlaylist[0].url);
      }
    }
  };

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.volume = Number(event.target.value);
    }
  };

  const handlePlaybackRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = Number(event.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoSelect = (url: string) => {
    setVideoSrc(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Advanced Video Player</h1>
      <input type="file" accept="video/*" multiple onChange={handleFileChange} className="mb-4" />
      {videoSrc && (
        <div>
          <video ref={videoRef} src={videoSrc} className="w-full mb-4" controls />
          <div className="flex justify-between mb-4">
            <button onClick={handlePlay} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Play
            </button>
            <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Pause
            </button>
            <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Stop
            </button>
            <button onClick={handleFullscreen} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Fullscreen
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="volume" className="mr-2">Volume:</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="playbackRate" className="mr-2">Playback Speed:</label>
            <select
              id="playbackRate"
              value={playbackRate}
              onChange={handlePlaybackRateChange}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Playlist</h2>
            <ul className="list-disc pl-5">
              {playlist.map((video, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleVideoSelect(video.url)}
                    className="text-blue-500 hover:underline"
                  >
                    {video.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCodecVideoPlayer;
