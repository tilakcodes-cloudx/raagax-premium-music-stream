import { useState } from "react";
import { motion } from "framer-motion";
import { songs, playlists } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";
import SongRow from "@/components/SongRow";
import PlaylistCard from "@/components/PlaylistCard";
import { Heart, Clock, ListMusic, Download } from "lucide-react";

const tabs = [
  { id: "liked", label: "Liked Songs", icon: Heart },
  { id: "playlists", label: "Playlists", icon: ListMusic },
  { id: "recent", label: "Recently Played", icon: Clock },
  { id: "downloaded", label: "Downloaded", icon: Download },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("liked");
  const { likedSongs, recentlyPlayed } = usePlayer();

  const likedSongsList = songs.filter(s => likedSongs.has(s.id));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8">
      <h1 className="text-2xl font-bold text-foreground mb-6 font-display">Your Library</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.1]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "liked" && (
        <div className="glass-card p-2">
          {likedSongsList.length > 0 ? (
            likedSongsList.map((song, i) => <SongRow key={song.id} song={song} index={i} />)
          ) : (
            <EmptyState text="Songs you like will appear here" />
          )}
        </div>
      )}

      {activeTab === "playlists" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      )}

      {activeTab === "recent" && (
        <div className="glass-card p-2">
          {recentlyPlayed.length > 0 ? (
            recentlyPlayed.map((song, i) => <SongRow key={song.id} song={song} index={i} />)
          ) : (
            <EmptyState text="Your recently played songs will appear here" />
          )}
        </div>
      )}

      {activeTab === "downloaded" && (
        <div className="glass-card p-6">
          <EmptyState text="Downloaded songs will appear here" />
        </div>
      )}
    </motion.div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-16 text-center text-muted-foreground">
      <p className="text-sm">{text}</p>
    </div>
  );
}
