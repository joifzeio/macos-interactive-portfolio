"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Folder, Home, Download, ImageIcon, Music, Video, Grid3x3, List, Search } from "lucide-react"
import type { AppType } from "../macos-desktop"

interface FinderProps {
  initialFolder?: string
  onFileOpen?: (appId: AppType, title: string) => void
}

const sidebarItems = [
  { icon: Home, label: "Home", color: "text-blue-500" },
  { icon: Download, label: "Downloads", color: "text-green-500" },
  { icon: Folder, label: "Documents", color: "text-blue-400" },
  { icon: ImageIcon, label: "Pictures", color: "text-purple-500" },
  { icon: Music, label: "Music", color: "text-pink-500" },
  { icon: Video, label: "Movies", color: "text-orange-500" },
]

const documentsFiles = [
  { name: "README.md", type: "file", size: "4 KB", modified: "Today, 10:30 AM", icon: "📄", appId: "readme" },
  { name: "Resume.pdf", type: "file", size: "2.4 MB", modified: "Last Week", icon: "📄" },
  { name: "Projects", type: "folder", items: 3, modified: "Today, 2:30 PM", icon: "📁" },
  { name: "Saveur_Ramen.app", type: "app", size: "128 MB", modified: "Yesterday", icon: "🍜", appId: "safari", title: "Saveur Ramen" },
  { name: "Soiree_InterFacs.app", type: "app", size: "64 MB", modified: "Jan 10", icon: "🎉", appId: "safari", title: "Soirée Inter-Facs" },
]

const downloadsFiles = [
  { name: "VS-Code-Setup.zip", type: "file", size: "156 MB", modified: "Today, 2:15 PM", icon: "📦" },
  { name: "wallpaper-collection.zip", type: "file", size: "45 MB", modified: "Yesterday", icon: "📦" },
]

const picturesFiles = [
  { name: "Profile_Photo.jpg", type: "file", size: "3.2 MB", modified: "Jan 15", icon: "🖼️", appId: "photos" },
  { name: "Project_Screenshots", type: "folder", items: 24, modified: "Yesterday", icon: "📁" },
]

export function Finder({ initialFolder = "Documents", onFileOpen }: FinderProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFolder, setCurrentFolder] = useState(initialFolder)

  useEffect(() => {
    setCurrentFolder(initialFolder)
  }, [initialFolder])

  const getCurrentFiles = () => {
    switch (currentFolder) {
      case "Downloads":
        return downloadsFiles
      case "Pictures":
        return picturesFiles
      case "Documents":
      default:
        return documentsFiles
    }
  }

  const files = getCurrentFiles()
  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDoubleClick = (file: any) => {
    if (file.type === "folder") {
      // In a more complex app, this would navigate. For now, we'll keep it simple
      if (file.name === "Projects") setCurrentFolder("Documents")
      else if (file.name === "Project_Screenshots") setCurrentFolder("Pictures")
    } else if (file.appId && onFileOpen) {
      onFileOpen(file.appId as AppType, file.title || file.name)
    }
  }


  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 border-r border-gray-200 p-3">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">Favorites</div>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setCurrentFolder(item.label)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-200 transition-colors text-sm ${
                currentFolder === item.label ? "bg-gray-200" : ""
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-1">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-2">iCloud</div>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-200 transition-colors text-sm">
            <Folder className="w-4 h-4 text-blue-500" />
            <span>iCloud Drive</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium">{currentFolder}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-32"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View toggles */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
              <button
                className={`p-1 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                className={`p-1 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File list/grid */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 gap-1">
              {filteredFiles.map((file) => (
                <button
                  key={file.name}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 transition-colors ${
                    selectedItem === file.name ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedItem(file.name)}
                  onDoubleClick={() => handleDoubleClick(file)}
                >
                  <span className="text-2xl">{file.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {file.type === "folder" ? `${(file as any).items} items` : file.size} • {file.modified}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.name}
                  className={`flex flex-col items-center gap-2 p-3 rounded hover:bg-blue-50 transition-colors ${
                    selectedItem === file.name ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedItem(file.name)}
                  onDoubleClick={() => handleDoubleClick(file)}
                >
                  <span className="text-5xl">{file.icon}</span>
                  <div className="text-sm font-medium text-center line-clamp-2">{file.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="h-6 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600 bg-gray-50">
          <span>{filteredFiles.length} items</span>
          <span>{selectedItem ? "1 item selected" : ""}</span>
        </div>
      </div>
    </div>
  )

}
