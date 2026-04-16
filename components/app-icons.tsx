import Image from "next/image"

export const FinderIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-GffQFvnmGS4oNDht4LFcZ2BqkEsK2D.jpg"
      alt="Finder"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
      priority
    />
  </div>
)

export const SafariIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-V4Q21hXOK9GNFULWIvh5QmeJfVBfSO.jpg"
      alt="Safari"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
      priority
    />
  </div>
)

export const MessagesIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg sharp-icon">
    <svg viewBox="0 0 64 64" className="w-3/4 h-3/4" fill="white">
      <path d="M32 8C18.745 8 8 17.523 8 29.333c0 6.4 3.2 12.134 8.267 16.134v8.8l8.533-4.667c2.4.8 4.933 1.2 7.2 1.2 13.255 0 24-9.523 24-21.333S45.255 8 32 8z" />
    </svg>
  </div>
)

export const CalendarIcon = () => {
  const today = new Date().getDate()
  return (
    <div className="w-full h-full rounded-[22%] bg-white flex flex-col overflow-hidden shadow-lg sharp-icon">
      <div className="h-1/4 bg-gradient-to-b from-red-500 to-red-600" />
      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl md:text-4xl font-bold text-gray-800">{today}</span>
      </div>
    </div>
  )
}

export const PhotosIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/493155-vxGeIhTw0EvXAZbKcAyW67QfvNVrfq.webp"
      alt="Photos"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
    />
  </div>
)

export const MusicIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-vvoaxB7U9YJzKLYcq9aiQZVl3SnXd1.jpg"
      alt="Music"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
    />
  </div>
)

export const NotesIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/notes_macos_bigsur_icon_189901-y0UlhiIg1eRRO2QrupDcgrpio0AqcE.png"
      alt="Notes"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
    />
  </div>
)

export const VSCodeIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-[#ffffff] flex items-center justify-center shadow-lg relative overflow-hidden sharp-icon group border border-gray-200/50">
    {/* macOS-style subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/30 to-transparent" />
    <Image 
      src="/vscode.svg" 
      alt="VS Code" 
      fill 
      className="object-contain p-[18%] transition-transform group-hover:scale-105 relative z-10"
      unoptimized={true}
    />
  </div>
)




export const TerminalIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terminal-2021-06-03-cP8LONJhjquJOgYKNSOIWIy2pZuqxT.webp"
      alt="Terminal"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
    />
  </div>
)

export const DockerIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image src="/docker.png" alt="Docker" fill unoptimized={true} className="object-cover" />
  </div>
)

export const GitHubIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-[#181717] flex items-center justify-center shadow-lg sharp-icon overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
    <svg viewBox="0 0 24 24" className="w-[68%] h-[68%] fill-white relative z-10 transition-transform group-hover:scale-110">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  </div>
)

export const SettingsIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2b78f13e-cbc8-4e7f-95ad-c00d7c135305-cover-gvYiSJ6pKiss5jkFyGibVGT51FcY3N.png"
      alt="Settings"
      fill
      sizes="256px"
      quality={100}
      className="object-cover"
    />
  </div>
)

export const LaunchpadIcon = () => (
  <div className="w-full h-full rounded-[22%] overflow-hidden relative sharp-icon">
    <Image src="/launchpad-custom.png" alt="Launchpad" fill unoptimized={true} className="object-cover" priority />
  </div>
)

export const FolderIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-b from-blue-400 to-blue-500 flex items-center justify-center shadow-lg relative overflow-hidden group sharp-icon">
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    <svg viewBox="0 0 64 64" className="w-2/3 h-2/3 drop-shadow-md" fill="white">
      <path d="M8 16c0-2.21 1.79-4 4-4h16l4 4h20c2.21 0 4 1.79 4 4v28c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4V16z" />
    </svg>
  </div>
)

export const DocumentsIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-white flex items-center justify-center shadow-lg border border-gray-100 relative overflow-hidden sharp-icon">
    <div className="absolute top-0 left-0 w-full h-1/4 bg-gray-50 border-b border-gray-100" />
    <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
)

export const DownloadsIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg overflow-hidden sharp-icon">
    <svg viewBox="0 0 64 64" className="w-3/4 h-3/4" fill="white">
      <path d="M8 16c0-2.21 1.79-4 4-4h16l4 4h20c2.21 0 4 1.79 4 4v28c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4V16z" />
    </svg>
  </div>
)

export const PhotographyIcon = () => (
  <div className="w-full h-full overflow-hidden relative sharp-icon">
    <Image src="/myportfolioimage.png" alt="Photography" fill unoptimized={true} className="object-cover" priority />
  </div>
)

export const VideoCardIcon = ({ src }: { src: string }) => (
  <div className="w-full h-full overflow-hidden rounded-lg shadow-lg bg-black flex items-center justify-center">
    <video src={src} autoPlay muted loop playsInline className="max-w-full max-h-full object-contain" />
  </div>
)
export const TrashIcon = () => (
  <div className="w-full h-full p-[5%] flex items-center justify-center relative sharp-icon">
    <Image
      src="/app_trash.webp"
      alt="Trash"
      fill
      sizes="256px"
      quality={100}
      className="object-contain"
    />
  </div>
)
