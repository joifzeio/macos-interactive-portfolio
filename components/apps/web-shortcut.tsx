"use client"

import { ExternalLink } from "lucide-react"

interface WebShortcutProps {
  id: string
  name: string
  videoSrc?: string
  description: string
  externalLink?: {
    label: string
    url: string
  }
}

const projectData: Record<string, Omit<WebShortcutProps, "id" | "name">> = {
  "Saveur Ramen": {
    videoSrc: "/saveurramenshowcase.mp4",
    description: "Saveur Ramen is a high-performance web experience designed for a modern Japanese restaurant. It features a seamless, visually stunning interface that highlights the artistry of ramen preparation. Built with Next.js and Framer Motion, it offers smooth transitions and a premium feel that matches the restaurant's aesthetic.",
    externalLink: {
      label: "Open Website",
      url: "https://saveur-ramen.vercel.app",
    },
  },
  "Soirée Inter-Facs": {
    videoSrc: "/interfacsshowcasevideo.mp4",
    description: "Soirée Inter-Facs is a comprehensive event management and ticketing platform for university parties. It handles high-traffic registrations, real-time ticket validation, and features a dynamic social feed for attendees. The project focuses on scalability and ease of use for organizers and students.",
    externalLink: {
      label: "Open Website",
      url: "https://soiree-inter-facs.vercel.app",
    },
  },
}

export function WebShortcut({ id, name, onOpenApp }: { id: string; name: string; onOpenApp?: Function }) {
  const data = projectData[name] || {
    description: "Project documentation for " + name + ". Access restricted to authorized personnel.",
  }

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd] text-[#1d1d1f] font-sans">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-4 md:p-6 gap-6">
        {/* Showcase Area */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-sm relative group">
          {data.videoSrc ? (
            <video 
              src={data.videoSrc} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
              {name}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200/60 w-full" />

        {/* Text Description Area */}
        <div className="flex-1">
          <p className="text-[15px] md:text-[16px] leading-[1.5] text-gray-700 whitespace-pre-wrap">
            {data.description}
          </p>
        </div>

        {/* Footer Link */}
        {data.externalLink && (
          <div className="pt-2 pb-4">
            <button 
              onClick={() => {
                if (onOpenApp) {
                  onOpenApp("safari", data.externalLink?.url)
                } else {
                  window.open(data.externalLink?.url, "_blank")
                }
              }}
              className="text-blue-500 hover:text-blue-600 text-sm md:text-base font-medium flex items-center gap-1 group w-fit cursor-pointer bg-transparent border-none p-0"
            >
              {data.externalLink.label}
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d1d6;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>
    </div>
  )
}
