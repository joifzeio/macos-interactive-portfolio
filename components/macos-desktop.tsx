"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Dock } from "./dock"
import { Window } from "./window"
import { DesktopIcon } from "./desktop-icon"
import { Spotlight } from "./spotlight"
import { ContextMenu } from "./context-menu"
import { NotificationCenter } from "./notification-center"
import { Launchpad } from "./launchpad"
import { AboutThisMac } from "./about-this-mac"
import { ControlCenter } from "./control-center"
import { Finder } from "./apps/finder"
import { Safari } from "./apps/safari"
import { Messages } from "./apps/messages"
import { Calendar } from "./apps/calendar"
import { Photos } from "./apps/photos"
import { Music } from "./apps/music"
import { Notes } from "./apps/notes"
import { VSCode } from "./apps/vscode"
import { Terminal } from "./apps/terminal"
import { Docker } from "./apps/docker"
import { GitBash } from "./apps/git-bash"
import { DownloadsIcon, FolderIcon, DocumentsIcon, PhotographyIcon, VideoCardIcon } from "./app-icons"
import { AnimatedWallpaper } from "./animated-wallpaper"
import { WebShortcut } from "./apps/web-shortcut"
import { Readme } from "./apps/readme"

export type AppType =
  | "finder"
  | "safari"
  | "messages"
  | "settings"
  | "calendar"
  | "photos"
  | "music"
  | "notes"
  | "vscode"
  | "terminal"
  | "docker"
  | "git"
  | "strategy"
  | "market"
  | "ops"
  | "readme"
  | "web-shortcut"

export interface WindowState {
  id: string
  app: AppType
  title: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface DesktopIconState {
  id: string
  app: AppType
  label: string
  icon: any
  position: { x: number; y: number }
  size?: { width: number; height: number }
}

interface ContextMenuState {
  x: number
  y: number
  items: Array<{ label: string; action: () => void; divider?: boolean }>
}

export function MacOSDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [highestZIndex, setHighestZIndex] = useState(10)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)
  const [launchpadOpen, setLaunchpadOpen] = useState(false)
  const [activeApp, setActiveApp] = useState<string>("Finder")
  const [aboutThisMacOpen, setAboutThisMacOpen] = useState(false)
  const [controlCenterOpen, setControlCenterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [desktopIcons, setDesktopIcons] = useState<DesktopIconState[]>([])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      setDesktopIcons(prevIcons => {
        if (prevIcons.length === 0) {
          // Initial setup
          return [
            {
              id: "strategy",
              app: "strategy",
              label: "Enterprise Strategy",
              icon: FolderIcon,
              position: { x: window.innerWidth - 120, y: 50 },
            },
            {
              id: "readme",
              app: "readme",
              label: "README.md",
              icon: DocumentsIcon,
              position: { x: window.innerWidth - 120, y: 160 },
            },
            {
              id: "photography",
              app: "photos",
              label: "Photography",
              icon: PhotographyIcon,
              position: mobile ? { x: 140, y: 340 } : { x: 750, y: 550 },
              size: { width: 140, height: 180 },
            },
            {
              id: "downloads",
              app: "finder",
              label: "Downloads",
              icon: DownloadsIcon,
              position: { x: window.innerWidth - 120, y: 450 },
            },
            {
              id: "ramen",
              app: "web-shortcut",
              label: "Saveur Ramen",
              icon: () => <VideoCardIcon src="/saveurramenshowcase.mp4" />,
              position: mobile ? { x: 100, y: 100 } : { x: 150, y: 150 },
              size: { width: 230, height: 130 },
            },
            {
              id: "interfacs",
              app: "web-shortcut",
              label: "Soirée Inter-Facs",
              icon: () => <VideoCardIcon src="/interfacsshowcasevideo.mp4" />,
              position: mobile ? { x: 120, y: 220 } : { x: 450, y: 350 },
              size: { width: 230, height: 130 },
            },
          ]
        }
        
        // Reposition only if they are off-screen or if we want to snap back for mobile
        return prevIcons.map(icon => {
          if (mobile) {
            // Mobile snapping logic for project cards
            if (icon.id === "ramen") return { ...icon, position: { x: 100, y: 100 } }
            if (icon.id === "interfacs") return { ...icon, position: { x: 120, y: 220 } }
            if (icon.id === "photography") return { ...icon, position: { x: 140, y: 340 } }
            
            // For standard icons, move them to the right edge if they are too far right
            if (icon.position.x > window.innerWidth - 80) {
              return { ...icon, position: { x: window.innerWidth - 120, y: icon.position.y } }
            }
          } else {
            // Desktop snapping logic (optional, but good for consistency)
            if (icon.id === "ramen") return { ...icon, position: { x: 150, y: 150 } }
            if (icon.id === "interfacs") return { ...icon, position: { x: 450, y: 350 } }
            if (icon.id === "photography") return { ...icon, position: { x: 750, y: 550 } }
          }
          return icon
        })
      })
    }
    
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault()
        setSpotlightOpen(true)
      }
      if (e.key === "Escape") {
        setSpotlightOpen(false)
        setLaunchpadOpen(false)
        setContextMenu(null)
      }
      if (e.key === "F4" || (e.ctrlKey && e.key === "ArrowUp")) {
        e.preventDefault()
        setLaunchpadOpen(!launchpadOpen)
      }
    }

    const handleClick = () => {
      setContextMenu(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("click", handleClick)
    }
  }, [launchpadOpen])

  const openApp = (app: AppType, title: string) => {
    setLaunchpadOpen(false)
    setActiveApp(title)
    const existingWindow = windows.find((w) => w.app === app && w.title === title && !w.isMinimized)

    if (existingWindow) {
      focusWindow(existingWindow.id)
      const dockIcon = document.querySelector(`[data-app="${app}"]`)
      if (dockIcon) {
        dockIcon.classList.add("animate-bounce")
        setTimeout(() => dockIcon.classList.remove("animate-bounce"), 500)
      }
      return
    }

    const minimizedWindow = windows.find((w) => w.app === app && w.isMinimized)
    if (minimizedWindow) {
      unminimizeWindow(minimizedWindow.id)
      return
    }

    const initialSize = isMobile 
      ? { width: window.innerWidth - 40, height: window.innerHeight - 160 }
      : { width: 900, height: 600 }
    
    const initialPosition = isMobile
      ? { x: 20, y: 60 }
      : { x: 100 + windows.length * 30, y: 80 + windows.length * 30 }

    const newWindow: WindowState = {
      id: `${app}-${Date.now()}`,
      app,
      title,
      isMinimized: false,
      isMaximized: false,
      position: initialPosition,
      size: initialSize,
      zIndex: highestZIndex + 1,
    }

    setWindows([...windows, newWindow])
    setHighestZIndex(highestZIndex + 1)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const unminimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w)))
    setHighestZIndex(highestZIndex + 1)
  }

  const maximizeWindow = (id: string) => {
    setWindows(
      windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isMaximized: !w.isMaximized,
              position: w.isMaximized ? w.position : { x: 0, y: 0 },
              size: w.isMaximized ? w.size : { width: window.innerWidth, height: window.innerHeight - 80 },
            }
          : w,
      ),
    )
  }

  const focusWindow = (id: string) => {
    const newZIndex = highestZIndex + 1
    setWindows(windows.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w)))
    setHighestZIndex(newZIndex)
    const window = windows.find((w) => w.id === id)
    if (window) {
      setActiveApp(window.title)
    }
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, position } : w)))
  }

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, size } : w)))
  }

  const updateIconPosition = (id: string, position: { x: number; y: number }) => {
    let finalPosition = position
    if (isMobile) {
      // Prevent icons from being dropped behind the left dock (e.g., width 80px)
      finalPosition = {
        x: Math.max(90, position.x),
        y: position.y,
      }
    }
    setDesktopIcons(desktopIcons.map((icon) => (icon.id === id ? { ...icon, position: finalPosition } : icon)))
  }

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: "New Folder", action: () => console.log("New folder") },
        { label: "Get Info", action: () => console.log("Get info") },
        { divider: true, label: "", action: () => {} },
        { label: "Show View Options", action: () => console.log("View options") },
      ],
    })
  }

  const renderAppContent = (app: AppType, title: string) => {
    switch (app) {
      case "finder":
        return <Finder initialFolder={title} />
      case "safari":
        return <Safari />
      case "messages":
        return <Messages />
      case "calendar":
        return <Calendar />
      case "photos":
        return <Photos />
      case "music":
        return <Music />
      case "readme":
        return <Readme />
      case "notes":
        return <Notes />
      case "vscode":
        return <VSCode />
      case "terminal":
        return <Terminal />
      case "docker":
        return <Docker />
      case "git":
        return <GitBash />
      case "web-shortcut":
        return <WebShortcut id={app} name={title} />
      default:
        return (
          <div className="p-8 h-full flex flex-col items-center justify-center text-center gap-4 bg-slate-900 text-white">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="max-w-md text-slate-400">
              Confidential business documentation for {title}. Access restricted to authorized personnel.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#2d5a7b]" />
      <AnimatedWallpaper />

      {/* Top right header */}
      <div className="absolute top-2 right-4 z-40 flex gap-4 text-sm font-medium text-white select-none drop-shadow-md">
        <span>Nathan</span>
        <span>{formatTime(currentTime)}</span>
      </div>

      <div className="absolute inset-0" onContextMenu={handleDesktopContextMenu}>
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={icon.position}
            size={icon.size}
            isMobile={isMobile}
            onPositionChange={(pos) => updateIconPosition(icon.id, pos)}
            onDoubleClick={() => openApp(icon.app, icon.label)}
          />
        ))}

      </div>


      {windows.map(
        (window) =>
          !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.app === "web-shortcut" ? `${window.title.toLowerCase().replace(/\s+/g, "_")}.gif` : window.title}
              position={window.position}
              size={window.size}
              zIndex={window.zIndex}
              isMaximized={window.isMaximized}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => focusWindow(window.id)}
              onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
              onSizeChange={(size) => updateWindowSize(window.id, size)}
              isMobile={isMobile}
              headerRight={
                window.app === "web-shortcut" ? (
                  <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <Info className="w-4 h-4 text-gray-400" />
                  </button>
                ) : null
              }
            >
              {renderAppContent(window.app, window.title)}
            </Window>
          ),
      )}

      <Dock
        onAppClick={openApp}
        minimizedWindows={windows.filter((w) => w.isMinimized)}
        onUnminimize={unminimizeWindow}
        onLaunchpadClick={() => setLaunchpadOpen(!launchpadOpen)}
        openApps={windows.map((w) => w.app)}
        isMobile={isMobile}
      />

      {spotlightOpen && <Spotlight onClose={() => setSpotlightOpen(false)} onOpenApp={openApp} />}

      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextMenu.items} />}

      {notificationCenterOpen && <NotificationCenter onClose={() => setNotificationCenterOpen(false)} />}

      {launchpadOpen && <Launchpad onClose={() => setLaunchpadOpen(false)} onOpenApp={openApp} />}

      {aboutThisMacOpen && <AboutThisMac onClose={() => setAboutThisMacOpen(false)} />}

      {controlCenterOpen && <ControlCenter onClose={() => setControlCenterOpen(false)} />}
    </div>
  )
}
