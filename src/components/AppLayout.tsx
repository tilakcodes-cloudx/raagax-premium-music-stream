import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TopNav from "@/components/TopNav";
import MusicPlayer from "@/components/MusicPlayer";
import { useState } from "react";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      {/* Main Content - offset for sidebar on desktop, player on bottom */}
      <div className="md:ml-64 pb-[88px] md:pb-[88px]">
        {/* Add extra bottom padding on mobile for bottom nav */}
        <div className="mb-[52px] md:mb-0">
          <TopNav />
          <main className="px-4 md:px-8 py-6">
            <Outlet />
          </main>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
