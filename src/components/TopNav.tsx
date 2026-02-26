import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 bg-background/60 backdrop-blur-xl border-b border-white/[0.04]">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-full pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition-all"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-3 ml-4">
          <button className="p-2 rounded-full hover:bg-white/[0.06] text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] transition-colors">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">User</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
