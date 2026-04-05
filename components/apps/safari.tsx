"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, Share, Plus, X, Lock, Star, Download } from "lucide-react"

export function Safari({ initialUrl = "https://www.apple.com" }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl)
  const [tabs, setTabs] = useState([
    { id: 1, title: initialUrl === "https://www.apple.com" ? "Apple" : new URL(initialUrl).hostname, url: initialUrl, active: true, favicon: initialUrl === "https://www.apple.com" ? "🍎" : "🌐" },
  ])
  const [activeTab, setActiveTab] = useState(1)

  const favorites = [
    { name: "Apple", color: "from-gray-700 to-gray-900", favicon: "🍎", url: "https://www.apple.com" },
    { name: "GitHub", color: "from-gray-800 to-black", favicon: "🐙", url: "https://github.com" },
    { name: "Twitter", color: "from-blue-400 to-blue-600", favicon: "🐦", url: "https://twitter.com" },
    { name: "YouTube", color: "from-red-500 to-red-700", favicon: "▶️", url: "https://youtube.com" },
  ]

  const closeTab = (id: number) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter((tab) => tab.id !== id))
      if (activeTab === id) {
        setActiveTab(tabs[0].id)
      }
    }
  }

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: "New Tab",
      url: "https://www.apple.com",
      active: false,
      favicon: "🍎",
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
    setUrl("https://www.apple.com")
  }
  
  const handleUrlSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let submitUrl = url
      if (!submitUrl.startsWith("http://") && !submitUrl.startsWith("https://")) {
        submitUrl = "https://" + submitUrl
      }
      setUrl(submitUrl)
      setTabs(tabs.map(tab => tab.id === activeTab ? { ...tab, url: submitUrl, title: new URL(submitUrl).hostname, favicon: "🌐" } : tab))
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-white relative">
      {/* Tab bar */}
      <div className="h-10 bg-[#e8e8e8] border-b border-gray-300 flex items-center px-2 gap-1 overflow-x-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group h-8 px-3 rounded-t flex items-center gap-2 min-w-[120px] max-w-[200px] cursor-pointer ${
              activeTab === tab.id ? "bg-white shadow-sm" : "bg-[#d4d4d4] hover:bg-[#c8c8c8]"
            }`}
            onClick={() => {
              setActiveTab(tab.id)
              setUrl(tab.url)
            }}
          >
            <span className="text-sm">{tab.favicon}</span>
            <span className="text-xs flex-1 truncate">{tab.title}</span>
            <button
              className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5"
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded shrink-0" onClick={addTab}>
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center px-3 gap-2">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-lg px-4 py-2 transition-colors">
          <Lock className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleUrlSubmit}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 w-full"
          />
          <RotateCw 
            className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" 
            onClick={() => {
              const current = url;
              setUrl("");
              setTimeout(() => setUrl(current), 10);
            }} 
          />
        </div>

        <button className="hidden sm:block p-1.5 hover:bg-gray-100 rounded transition-colors">
          <Share className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hidden sm:block p-1.5 hover:bg-gray-100 rounded transition-colors">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Favorites bar */}
      <div className="h-8 bg-[#fafafa] border-b border-gray-200 flex items-center px-4 gap-4 overflow-x-auto whitespace-nowrap hidden sm:flex">
        {favorites.map((fav) => (
          <button
            key={fav.name}
            onClick={() => {
              setUrl(fav.url)
              setTabs(tabs.map(tab => tab.id === activeTab ? { ...tab, url: fav.url, title: fav.name, favicon: fav.favicon } : tab))
            }}
            className="flex items-center gap-2 px-2 py-0.5 hover:bg-gray-100 rounded transition-colors shrink-0"
          >
            <span className="text-sm">{fav.favicon}</span>
            <span className="text-xs text-gray-700">{fav.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-white w-full h-full">
        {url !== "https://www.apple.com" && url.startsWith("http") ? (
          <iframe 
            src={url} 
            className="w-full h-full absolute inset-0 border-none bg-white" 
            title="Browser"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        ) : (
          <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-16 h-full overflow-y-auto">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Safari
                </h1>
                <p className="text-lg md:text-xl text-gray-600">Fast. Private. Energy efficient.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
                {favorites.map((site) => (
                  <button
                    key={site.name}
                    onClick={() => {
                      setUrl(site.url)
                      setTabs(tabs.map(tab => tab.id === activeTab ? { ...tab, url: site.url, title: site.name, favicon: site.favicon } : tab))
                    }}
                    className="group aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <div className="text-4xl md:text-5xl">{site.favicon}</div>
                    <span className="text-xs md:text-sm font-medium text-gray-700">{site.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-16 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
                <Star className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Privacy. That's Safari.</h2>
                <p className="text-sm md:text-base text-gray-600">
                  Safari is designed to protect your information and enable you to choose what you share.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

