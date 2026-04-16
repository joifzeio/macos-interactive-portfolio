"use client"

import type React from "react"

import { useState } from "react"
import type { AppType, WindowState } from "./macos-desktop"
import {
  FinderIcon,
  MailIcon,
  SafariIcon,
  MessagesIcon,
  NotesIcon,
  VSCodeIcon,
  TerminalIcon,
  DockerIcon,
  GitHubIcon,
  LaunchpadIcon,
  TrashIcon,
} from "./app-icons"

interface DockProps {
  onAppClick: (app: AppType, title: string) => void
  minimizedWindows: WindowState[]
  onUnminimize: (id: string) => void
  onLaunchpadClick: () => void
  openApps: AppType[]
  isMobile?: boolean
}

const dockApps = [
  { id: "finder" as AppType, icon: FinderIcon, label: "Finder" },
  { id: "mail" as AppType, icon: MailIcon, label: "Mail" },
  { id: "safari" as AppType, icon: SafariIcon, label: "Safari" },
  { id: "messages" as AppType, icon: MessagesIcon, label: "Messages" },
  { id: "notes" as AppType, icon: NotesIcon, label: "Notes" },
  { id: "vscode" as AppType, icon: VSCodeIcon, label: "VS Code" },
  { id: "terminal" as AppType, icon: TerminalIcon, label: "Terminal" },
  { id: "docker" as AppType, icon: DockerIcon, label: "Docker" },
  { id: "github" as AppType, icon: GitHubIcon, label: "GitHub" },
]

export function Dock({ onAppClick, minimizedWindows, onUnminimize, onLaunchpadClick, openApps, isMobile }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{ app: AppType; x: number; y: number } | null>(null)

  const handleContextMenu = (e: React.MouseEvent, app: AppType) => {
    e.preventDefault()
    setContextMenu({ app, x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div
        className={`fixed z-40 transition-all duration-300 ${
          isMobile ? "left-2 top-1/2 -translate-y-1/2" : "bottom-2 left-1/2 -translate-x-1/2"
        }`}
      >
        <div
          className={`bg-white/20 backdrop-blur-2xl macos-dock-shadow rounded-2xl p-1.5 flex gap-1.5 border border-white/20 ${
            isMobile ? "flex-col items-center" : "flex-row items-end"
          }`}
        >
          {/* Launchpad icon */}
          <button
            className="relative group transition-transform duration-200 ease-out"
            style={{
              transform:
                hoveredApp === "launchpad"
                  ? isMobile
                    ? "scale(1.2) translateX(8px)"
                    : "scale(1.2) translateY(-8px)"
                  : "scale(1)",
            }}
            onClick={onLaunchpadClick}
            onMouseEnter={() => setHoveredApp("launchpad")}
            onMouseLeave={() => setHoveredApp(null)}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl shadow-lg overflow-hidden">
              <LaunchpadIcon />
            </div>
            <div
              className={`absolute bg-gray-800/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                isMobile ? "left-full ml-4 top-1/2 -translate-y-1/2" : "-top-10 left-1/2 -translate-x-1/2"
              }`}
            >
              Launchpad
            </div>
          </button>

          <div className={`${isMobile ? "h-px w-8 my-1" : "w-px h-12 mx-1"} bg-white/30`} />

          {dockApps.map((app, index) => {
            const isHovered = hoveredApp === app.id
            const isOpen = openApps.includes(app.id)
            const IconComponent = app.icon

            return (
              <button
                key={app.id}
                data-app={app.id}
                className="relative group transition-transform duration-200 ease-out"
                style={{
                  transform: isHovered
                    ? isMobile
                      ? "scale(1.2) translateX(8px)"
                      : "scale(1.2) translateY(-8px)"
                    : "scale(1)",
                }}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => onAppClick(app.id, app.label)}
                onContextMenu={(e) => handleContextMenu(e, app.id)}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl shadow-lg overflow-hidden">
                  <IconComponent />
                </div>

                {/* Tooltip */}
                <div
                  className={`absolute bg-gray-800/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                    isMobile ? "left-full ml-4 top-1/2 -translate-y-1/2" : "-top-10 left-1/2 -translate-x-1/2"
                  }`}
                >
                  {app.label}
                </div>

                {/* Running indicator */}
                {isOpen && (
                  <div
                    className={`absolute bg-gray-700 rounded-full ${
                      isMobile
                        ? "left-0 top-1/2 -translate-y-1/2 w-1 h-3"
                        : "-bottom-1 left-1/2 -translate-x-1/2 w-1 h-1"
                    }`}
                  />
                )}
              </button>
            )
          })}

          {/* Divider */}
          <div className={`${isMobile ? "h-px w-8 my-1" : "w-px h-10 mx-1"} bg-white/20`} />

          {/* Trash icon */}
          <button
            className="relative group transition-transform duration-200 ease-out"
            style={{
              transform:
                hoveredApp === "trash"
                  ? isMobile
                    ? "scale(1.2) translateX(8px)"
                    : "scale(1.2) translateY(-8px)"
                  : "scale(1)",
            }}
            onClick={() => onAppClick("trash" as AppType, "Trash")}
            onMouseEnter={() => setHoveredApp("trash")}
            onMouseLeave={() => setHoveredApp(null)}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 overflow-hidden">
              <TrashIcon />
            </div>
            <div
              className={`absolute bg-gray-800/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                isMobile ? "left-full ml-4 top-1/2 -translate-y-1/2" : "-top-10 left-1/2 -translate-x-1/2"
              }`}
            >
              Trash
            </div>
          </button>
        </div>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          className="fixed bg-[var(--macos-menu-bg)] macos-blur border border-black/10 rounded-lg shadow-lg py-1 z-[100] min-w-[180px]"
          style={{ left: contextMenu.x, top: contextMenu.y - 100 }}
          onClick={() => setContextMenu(null)}
        >
          <button className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors">
            Options
          </button>
          <button className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors">
            Show in Finder
          </button>
          <div className="h-px bg-black/10 my-1" />
          <button className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors">
            Quit
          </button>
        </div>
      )}
    </>
  )
}
