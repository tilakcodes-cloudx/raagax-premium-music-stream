import { Playlist, getSongById } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
}

export default function PlaylistCard({ playlist, index = 0 }: PlaylistCardProps) {
  const { playQueue } = usePlayer();

  const handlePlay = () => {
    const songs = playlist.songs.map(getSongById).filter(Boolean) as any[];
    if (songs.length) playQueue(songs);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card-hover group p-4 cursor-pointer"
      onClick={handlePlay}
    >
      <div className="relative mb-4">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="w-full aspect-square rounded-lg object-cover shadow-lg shadow-black/40"
        />
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          onClick={(e) => { e.stopPropagation(); handlePlay(); }}
        >
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        </motion.button>
      </div>
      <h3 className="font-semibold text-sm text-foreground truncate">{playlist.name}</h3>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{playlist.description}</p>
    </motion.div>
  );
}
