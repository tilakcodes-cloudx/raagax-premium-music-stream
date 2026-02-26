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
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: string[];
}

export const songs: Song[] = [
  // Kannada
  { id: "k1", title: "Kantara Title Track", artist: "Sai Vignesh", album: "Kantara", duration: "3:45", durationMs: 225000, cover: "/images/cover-1.jpg", language: "Kannada", genre: "Folk" },
  { id: "k2", title: "Belageddu", artist: "Armaan Malik", album: "Kirik Party", duration: "4:12", durationMs: 252000, cover: "/images/cover-3.jpg", language: "Kannada", genre: "Melody" },
  { id: "k3", title: "Neenaade Naa", artist: "Sanjith Hegde", album: "Yuvarathnaa", duration: "3:58", durationMs: 238000, cover: "/images/cover-6.jpg", language: "Kannada", genre: "Melody" },
  // Tamil
  { id: "t1", title: "Arabic Kuthu", artist: "Anirudh", album: "Beast", duration: "3:30", durationMs: 210000, cover: "/images/cover-2.jpg", language: "Tamil", genre: "Pop" },
  { id: "t2", title: "Vaathi Coming", artist: "Anirudh", album: "Master", duration: "3:45", durationMs: 225000, cover: "/images/cover-4.jpg", language: "Tamil", genre: "Pop" },
  { id: "t3", title: "Why This Kolaveri Di", artist: "Dhanush", album: "3", duration: "3:32", durationMs: 212000, cover: "/images/cover-7.jpg", language: "Tamil", genre: "Pop" },
  // Telugu
  { id: "te1", title: "Butta Bomma", artist: "Armaan Malik", album: "Ala Vaikunthapurramuloo", duration: "3:28", durationMs: 208000, cover: "/images/cover-5.jpg", language: "Telugu", genre: "Melody" },
  { id: "te2", title: "Oo Antava", artist: "Indravathi Chauhan", album: "Pushpa", duration: "3:15", durationMs: 195000, cover: "/images/cover-2.jpg", language: "Telugu", genre: "Pop" },
  { id: "te3", title: "Samajavaragamana", artist: "Sid Sriram", album: "Ala Vaikunthapurramuloo", duration: "4:05", durationMs: 245000, cover: "/images/cover-1.jpg", language: "Telugu", genre: "Classical" },
  // Hindi
  { id: "h1", title: "Kesariya", artist: "Arijit Singh", album: "Brahmastra", duration: "4:28", durationMs: 268000, cover: "/images/cover-3.jpg", language: "Hindi", genre: "Melody" },
  { id: "h2", title: "Apna Bana Le", artist: "Arijit Singh", album: "Bhediya", duration: "4:15", durationMs: 255000, cover: "/images/cover-6.jpg", language: "Hindi", genre: "Romantic" },
  { id: "h3", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2", duration: "4:22", durationMs: 262000, cover: "/images/cover-5.jpg", language: "Hindi", genre: "Romantic" },
  // English
  { id: "e1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", durationMs: 200000, cover: "/images/cover-4.jpg", language: "English", genre: "Pop" },
  { id: "e2", title: "Shape of You", artist: "Ed Sheeran", album: "÷", duration: "3:53", durationMs: 233000, cover: "/images/cover-7.jpg", language: "English", genre: "Pop" },
  { id: "e3", title: "Perfect", artist: "Ed Sheeran", album: "÷", duration: "4:23", durationMs: 263000, cover: "/images/cover-3.jpg", language: "English", genre: "Romantic" },
];

export const playlists: Playlist[] = [
  { id: "p1", name: "Trending in India", description: "The hottest tracks right now", cover: "/images/cover-1.jpg", songs: ["k1", "t1", "te2", "h1", "e1"] },
  { id: "p2", name: "Top Kannada Hits", description: "Best of Sandalwood", cover: "/images/cover-3.jpg", songs: ["k1", "k2", "k3"] },
  { id: "p3", name: "Tamil Vibes", description: "Kollywood's finest", cover: "/images/cover-2.jpg", songs: ["t1", "t2", "t3"] },
  { id: "p4", name: "Telugu Beats", description: "Tollywood chart-toppers", cover: "/images/cover-5.jpg", songs: ["te1", "te2", "te3"] },
  { id: "p5", name: "Bollywood Hits", description: "Hindi music at its best", cover: "/images/cover-6.jpg", songs: ["h1", "h2", "h3"] },
  { id: "p6", name: "Global English Charts", description: "Worldwide hits", cover: "/images/cover-4.jpg", songs: ["e1", "e2", "e3"] },
];

export const moodPlaylists: Playlist[] = [
  { id: "m1", name: "Chill", description: "Relax and unwind", cover: "/images/cover-6.jpg", songs: ["k3", "h2", "e3", "te3"] },
  { id: "m2", name: "Workout", description: "High energy beats", cover: "/images/cover-7.jpg", songs: ["t1", "t2", "te2", "e1"] },
  { id: "m3", name: "Romantic", description: "Love is in the air", cover: "/images/cover-3.jpg", songs: ["k2", "h1", "h3", "e3"] },
  { id: "m4", name: "Party", description: "Turn it up!", cover: "/images/cover-2.jpg", songs: ["t1", "te2", "e2", "e1"] },
  { id: "m5", name: "Devotional", description: "Spiritual melodies", cover: "/images/cover-5.jpg", songs: ["te3", "k1"] },
];

export const getSongById = (id: string): Song | undefined => songs.find(s => s.id === id);
