"use client"

import { useState, useEffect } from "react"
import { Search, Wifi, Bell, Info } from "lucide-react"

interface MenuBarProps {
  activeApp: string
  onAppleClick?: () => void
  onControlCenterClick?: () => void
  onSpotlightClick?: () => void
  onNotificationCenterClick?: () => void
}

export function MenuBar({
  activeApp,
  onAppleClick,
  onControlCenterClick,
  onSpotlightClick,
  onNotificationCenterClick,
}: MenuBarProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-7.5 z-[100] bg-white/20 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 select-none drop-shadow-sm text-[13px] font-medium text-white/90">
      {/* Left Section */}
      <div className="flex items-center gap-2 px-1">
        <button 
          onClick={onAppleClick}
          className="hover:bg-white/10 px-2 h-full flex items-center rounded transition-colors font-bold text-white"
        >
          Nathan
        </button>
        
        <span className="font-bold cursor-default px-1 ml-2 border-l border-white/20 pl-4">{activeApp}</span>
        
        <div className="hidden md:flex items-center gap-4 text-white/80">
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">File</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Edit</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">View</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Go</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Window</button>
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-default">Help</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1">
        <button className="hover:bg-white/10 p-1.5 rounded transition-colors h-full">
          <Wifi className="w-4 h-4" />
        </button>
        
        <button 
          onClick={onSpotlightClick}
          className="hover:bg-white/10 p-1.5 rounded transition-colors h-full"
        >
          <Search className="w-4 h-4" />
        </button>

        <button 
          onClick={onControlCenterClick}
          className="hover:bg-white/10 p-1.5 rounded transition-colors h-full"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 rotate-90">
             <path d="M21 4h-2M15 4H3M21 12h-8M9 12H3M21 20h-2M15 20H3M17 2v4M11 10v4M17 18v4" />
          </svg>
        </button>


        <button 
          onClick={onNotificationCenterClick}
          className="hover:bg-white/10 px-2 py-1 rounded transition-colors flex items-center gap-2 tabular-nums"
        >
          <span>{formatDate(time)}</span>
          <span className="font-semibold">{formatTime(time)}</span>
        </button>
      </div>
    </div>
  )
}
