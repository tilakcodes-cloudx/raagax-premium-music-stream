import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Song, songs } from "@/data/songs";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  queueIndex: number;
  volume: number;
  progress: number;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  likedSongs: Set<string>;
  recentlyPlayed: Song[];
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song) => void;
  playQueue: (queue: Song[], index?: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    queue: [],
    queueIndex: 0,
    volume: 80,
    progress: 0,
    shuffle: false,
    repeat: "off",
    likedSongs: new Set(["k1", "h1", "e1"]),
    recentlyPlayed: [songs[0], songs[3], songs[9], songs[12]],
  });

  const playSong = useCallback((song: Song) => {
    setState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      progress: 0,
      recentlyPlayed: [song, ...prev.recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10),
    }));
  }, []);

  const playQueue = useCallback((queue: Song[], index = 0) => {
    setState(prev => ({
      ...prev,
      queue,
      queueIndex: index,
      currentSong: queue[index],
      isPlaying: true,
      progress: 0,
      recentlyPlayed: [queue[index], ...prev.recentlyPlayed.filter(s => s.id !== queue[index].id)].slice(0, 10),
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const nextSong = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.shuffle
        ? Math.floor(Math.random() * prev.queue.length)
        : (prev.queueIndex + 1) % Math.max(prev.queue.length, 1);
      const next = prev.queue[nextIndex] || prev.currentSong;
      return {
        ...prev,
        queueIndex: nextIndex,
        currentSong: next,
        progress: 0,
        recentlyPlayed: next ? [next, ...prev.recentlyPlayed.filter(s => s.id !== next.id)].slice(0, 10) : prev.recentlyPlayed,
      };
    });
  }, []);

  const prevSong = useCallback(() => {
    setState(prev => {
      const prevIndex = prev.queueIndex > 0 ? prev.queueIndex - 1 : prev.queue.length - 1;
      const song = prev.queue[prevIndex] || prev.currentSong;
      return { ...prev, queueIndex: prevIndex, currentSong: song, progress: 0 };
    });
  }, []);

  const setVolume = useCallback((v: number) => setState(prev => ({ ...prev, volume: v })), []);
  const setProgress = useCallback((p: number) => setState(prev => ({ ...prev, progress: p })), []);
  const toggleShuffle = useCallback(() => setState(prev => ({ ...prev, shuffle: !prev.shuffle })), []);
  const toggleRepeat = useCallback(() => {
    setState(prev => ({
      ...prev,
      repeat: prev.repeat === "off" ? "all" : prev.repeat === "all" ? "one" : "off",
    }));
  }, []);

  const toggleLike = useCallback((songId: string) => {
    setState(prev => {
      const liked = new Set(prev.likedSongs);
      if (liked.has(songId)) liked.delete(songId);
      else liked.add(songId);
      return { ...prev, likedSongs: liked };
    });
  }, []);

  const isLiked = useCallback((songId: string) => state.likedSongs.has(songId), [state.likedSongs]);

  return (
    <PlayerContext.Provider value={{ ...state, playSong, playQueue, togglePlay, nextSong, prevSong, setVolume, setProgress, toggleShuffle, toggleRepeat, toggleLike, isLiked }}>
      {children}
    </PlayerContext.Provider>
  );
};
