import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";
import cover5 from "@/assets/cover-5.jpg";
import cover6 from "@/assets/cover-6.jpg";
import cover7 from "@/assets/cover-7.jpg";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationMs: number;
  cover: string;
  language: string;
  genre: string;
  liked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: string[];
}

export const covers = { cover1, cover2, cover3, cover4, cover5, cover6, cover7 };

export const songs: Song[] = [
  { id: "k1", title: "Kantara Title Track", artist: "Sai Vignesh", album: "Kantara", duration: "3:45", durationMs: 225000, cover: cover1, language: "Kannada", genre: "Folk" },
  { id: "k2", title: "Belageddu", artist: "Armaan Malik", album: "Kirik Party", duration: "4:12", durationMs: 252000, cover: cover3, language: "Kannada", genre: "Melody" },
  { id: "k3", title: "Neenaade Naa", artist: "Sanjith Hegde", album: "Yuvarathnaa", duration: "3:58", durationMs: 238000, cover: cover6, language: "Kannada", genre: "Melody" },
  { id: "t1", title: "Arabic Kuthu", artist: "Anirudh", album: "Beast", duration: "3:30", durationMs: 210000, cover: cover2, language: "Tamil", genre: "Pop" },
  { id: "t2", title: "Vaathi Coming", artist: "Anirudh", album: "Master", duration: "3:45", durationMs: 225000, cover: cover4, language: "Tamil", genre: "Pop" },
  { id: "t3", title: "Why This Kolaveri Di", artist: "Dhanush", album: "3", duration: "3:32", durationMs: 212000, cover: cover7, language: "Tamil", genre: "Pop" },
  { id: "te1", title: "Butta Bomma", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo", duration: "3:28", durationMs: 208000, cover: cover5, language: "Telugu", genre: "Melody" },
  { id: "te2", title: "Oo Antava", artist: "Indravathi Chauhan", album: "Pushpa", duration: "3:15", durationMs: 195000, cover: cover2, language: "Telugu", genre: "Pop" },
  { id: "te3", title: "Samajavaragamana", artist: "Sid Sriram", album: "Ala Vaikunthapurramuloo", duration: "4:05", durationMs: 245000, cover: cover1, language: "Telugu", genre: "Classical" },
  { id: "h1", title: "Kesariya", artist: "Arijit Singh", album: "Brahmastra", duration: "4:28", durationMs: 268000, cover: cover3, language: "Hindi", genre: "Melody" },
  { id: "h2", title: "Apna Bana Le", artist: "Arijit Singh", album: "Bhediya", duration: "4:15", durationMs: 255000, cover: cover6, language: "Hindi", genre: "Romantic" },
  { id: "h3", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: "4:22", durationMs: 262000, cover: cover5, language: "Hindi", genre: "Romantic" },
  { id: "e1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", durationMs: 200000, cover: cover4, language: "English", genre: "Pop" },
  { id: "e2", title: "Shape of You", artist: "Ed Sheeran", album: "÷", duration: "3:53", durationMs: 233000, cover: cover7, language: "English", genre: "Pop" },
  { id: "e3", title: "Perfect", artist: "Ed Sheeran", album: "÷", duration: "4:23", durationMs: 263000, cover: cover3, language: "English", genre: "Romantic" },
];

export const playlists: Playlist[] = [
  { id: "p1", name: "Trending in India", description: "The hottest tracks right now", cover: cover1, songs: ["k1", "t1", "te2", "h1", "e1"] },
  { id: "p2", name: "Top Kannada Hits", description: "Best of Sandalwood", cover: cover3, songs: ["k1", "k2", "k3"] },
  { id: "p3", name: "Tamil Vibes", description: "Kollywood's finest", cover: cover2, songs: ["t1", "t2", "t3"] },
  { id: "p4", name: "Telugu Beats", description: "Tollywood chart-toppers", cover: cover5, songs: ["te1", "te2", "te3"] },
  { id: "p5", name: "Bollywood Hits", description: "Hindi music at its best", cover: cover6, songs: ["h1", "h2", "h3"] },
  { id: "p6", name: "Global English Charts", description: "Worldwide hits", cover: cover4, songs: ["e1", "e2", "e3"] },
];

export const moodPlaylists: Playlist[] = [
  { id: "m1", name: "Chill", description: "Relax and unwind", cover: cover6, songs: ["k3", "h2", "e3", "te3"] },
  { id: "m2", name: "Workout", description: "High energy beats", cover: cover7, songs: ["t1", "t2", "te2", "e1"] },
  { id: "m3", name: "Romantic", description: "Love is in the air", cover: cover3, songs: ["k2", "h1", "h3", "e3"] },
  { id: "m4", name: "Party", description: "Turn it up!", cover: cover2, songs: ["t1", "te2", "e2", "e1"] },
  { id: "m5", name: "Devotional", description: "Spiritual melodies", cover: cover5, songs: ["te3", "k1"] },
];

export const getSongById = (id: string): Song | undefined => songs.find(s => s.id === id);
