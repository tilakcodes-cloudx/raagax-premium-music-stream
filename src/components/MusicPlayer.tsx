import { motion } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, Heart, Maximize2
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { useState, useEffect, useRef } from "react";

function Waveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          animate={isPlaying ? {
            height: ["4px", `${8 + Math.random() * 10}px`, "4px"],
          } : { height: "4px" }}
          transition={{
            duration: 0.6 + i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, togglePlay, nextSong, prevSong,
    volume, setVolume, progress, setProgress,
    shuffle, toggleShuffle, repeat, toggleRepeat,
    toggleLike, isLiked
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [localProgress, setLocalProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<number>();

  /* ================= REAL AUDIO ENGINE ================= */

useEffect(() => {
  if (!audioRef.current || !currentSong?.audio) return;

  audioRef.current.src = currentSong.audio;
  audioRef.current.volume = volume / 100;

  if (isPlaying) {
    audioRef.current.play().catch(() => {});
  } else {
    audioRef.current.pause();
  }
}, [currentSong, isPlaying, volume]);

/* Auto next when song ends */
useEffect(() => {
  if (!audioRef.current) return;

  audioRef.current.onended = () => {
    nextSong();
  };
}, [nextSong]);
  
  useEffect(() => {
    if (!isDragging) setLocalProgress(progress);
  }, [progress, isDragging]);

/* ================= REAL PROGRESS SYNC ================= */

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateProgress = () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(pct || 0);
    setLocalProgress(pct || 0);
  };

  audio.addEventListener("timeupdate", updateProgress);

  return () => {
    audio.removeEventListener("timeupdate", updateProgress);
  };
}, [setProgress]);

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 player-glass h-[88px] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Select a song to start playing</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 player-glass h-[88px]"
    >
      <div className="h-full flex items-center px-4 md:px-6 gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-3 w-[200px] md:w-[280px] shrink-0">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-14 h-14 rounded-lg object-cover shadow-lg"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{currentSong.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => toggleLike(currentSong.id)}
            className="shrink-0 hidden sm:block"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked(currentSong.id) ? "text-primary fill-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            />
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center gap-1.5 max-w-[600px] mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={toggleShuffle} className={`p-1 transition-colors ${shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={prevSong} className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-background" />
              ) : (
                <Play className="w-4 h-4 text-background ml-0.5" />
              )}
            </button>
            <button onClick={nextSong} className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button onClick={toggleRepeat} className={`p-1 transition-colors ${repeat !== "off" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {repeat === "one" ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Progress */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-10 text-right tabular-nums">
              {formatTime(audioRef.current?.currentTime || 0)}
            </span>
            <div
              className="flex-1 h-1 bg-white/[0.1] rounded-full cursor-pointer group relative"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(pct);
                setLocalProgress(pct);
              }}
            >
              <div className="h-full bg-foreground rounded-full relative group-hover:bg-primary transition-colors" style={{ width: `${localProgress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground w-10 tabular-nums">
              {formatTime(audioRef.current?.duration || 0)}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3 w-[200px] justify-end">
          <Waveform isPlaying={isPlaying} />
          <button className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setVolume(volume > 0 ? 0 : 80)}>
            {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <div
            className="w-24 h-1 bg-white/[0.1] rounded-full cursor-pointer group"
           onClick={(e) => {
             if (!audioRef.current) return;

             const rect = e.currentTarget.getBoundingClientRect();
             const pct = (e.clientX - rect.left) / rect.width;

             audioRef.current.currentTime = pct * audioRef.current.duration;
           }}
          >
            <div className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors" style={{ width: `${volume}%` }} />
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    <audio ref={audioRef} />
    </motion.div>
  );
}
