import { Song } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";
import { Play, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface SongRowProps {
  song: Song;
  index: number;
  showAlbum?: boolean;
}

export default function SongRow({ song, index, showAlbum = true }: SongRowProps) {
  const { playSong, currentSong, isPlaying, toggleLike, isLiked, playQueue } = usePlayer();
  const isActive = currentSong?.id === song.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`group flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
        isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
      }`}
      onClick={() => playSong(song)}
    >
      {/* Index / Play */}
      <div className="w-5 text-center shrink-0">
        <span className={`text-sm tabular-nums group-hover:hidden ${isActive ? "text-primary" : "text-muted-foreground"}`}>
          {isActive && isPlaying ? "♪" : index + 1}
        </span>
        <Play className="w-4 h-4 text-foreground hidden group-hover:block mx-auto" />
      </div>

      {/* Cover + Info */}
      <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
          {song.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>

      {/* Album */}
      {showAlbum && (
        <span className="hidden lg:block text-sm text-muted-foreground truncate w-[180px]">{song.album}</span>
      )}

      {/* Like */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className={`w-4 h-4 ${isLiked(song.id) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
      </button>

      {/* Duration */}
      <span className="text-sm text-muted-foreground tabular-nums w-12 text-right">{song.duration}</span>
    </motion.div>
  );
}
