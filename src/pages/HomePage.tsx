import { motion } from "framer-motion";
import { playlists, moodPlaylists, songs } from "@/data/songs";
import PlaylistCard from "@/components/PlaylistCard";
import SongRow from "@/components/SongRow";
import { usePlayer } from "@/context/PlayerContext";

export default function HomePage() {
  const { recentlyPlayed } = usePlayer();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-8"
    >
      {/* Greeting */}
      <section className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-foreground font-display"
        >
          {getGreeting()}
        </motion.h1>

        {/* Quick Play Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {playlists.slice(0, 6).map((pl, i) => (
            <QuickPlayCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <Section title="Recently Played">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentlyPlayed.slice(0, 6).map((song, i) => (
              <RecentCard key={song.id} song={song} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* Featured Playlists */}
      <Section title="Featured Playlists">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {playlists.map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      </Section>

      {/* Mood Playlists */}
      <Section title="Mood & Activities">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moodPlaylists.map((pl, i) => (
            <PlaylistCard key={pl.id} playlist={pl} index={i} />
          ))}
        </div>
      </Section>

      {/* All Songs */}
      <Section title="All Songs">
        <div className="glass-card p-2">
          {songs.map((song, i) => (
            <SongRow key={song.id} song={song} index={i} />
          ))}
        </div>
      </Section>
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-4 font-display">{title}</h2>
      {children}
    </section>
  );
}

function QuickPlayCard({ playlist, index }: { playlist: any; index: number }) {
  const { playQueue } = usePlayer();

  const handlePlay = () => {
    const queueSongs = playlist.songs.map((id: string) => getSongById(id)).filter(Boolean);
    if (queueSongs.length) playQueue(queueSongs);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 group"
      onClick={handlePlay}
    >
      <img src={playlist.cover} alt={playlist.name} className="w-12 h-12 object-cover" />
      <span className="text-sm font-semibold text-foreground truncate pr-3">{playlist.name}</span>
    </motion.div>
  );
}

function RecentCard({ song, index }: { song: any; index: number }) {
  const { playSong } = usePlayer();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card-hover p-3 cursor-pointer group"
      onClick={() => playSong(song)}
    >
      <div className="relative mb-3">
        <img src={song.cover} alt={song.title} className="w-full aspect-square rounded-lg object-cover" />
        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-primary/30">
          <svg className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
      <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
    </motion.div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}
