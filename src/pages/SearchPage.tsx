import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { songs } from "@/data/songs";
import SongRow from "@/components/SongRow";

const languages = ["All", "Kannada", "Tamil", "Telugu", "Hindi", "English"];
const genres = ["All", "Pop", "Melody", "Romantic", "Classical", "Folk", "EDM"];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedLang, setSelectedLang] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filtered = useMemo(() => {
    return songs.filter(s => {
      const matchesQuery = !query || 
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase()) ||
        s.album.toLowerCase().includes(query.toLowerCase());
      const matchesLang = selectedLang === "All" || s.language === selectedLang;
      const matchesGenre = selectedGenre === "All" || s.genre === selectedGenre;
      return matchesQuery && matchesLang && matchesGenre;
    });
  }, [query, selectedLang, selectedGenre]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-8">
      <h1 className="text-2xl font-bold text-foreground mb-6 font-display">Search</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search songs, artists, albums..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full max-w-lg bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 mb-6 text-sm"
      />

      {/* Language Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedLang === lang
                ? "bg-primary text-primary-foreground"
                : "bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-white/[0.1]"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Genre Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre
                ? "bg-white/[0.15] text-foreground"
                : "bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="glass-card p-2">
        {filtered.length > 0 ? (
          filtered.map((song, i) => <SongRow key={song.id} song={song} index={i} />)
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">Try different keywords or filters</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
