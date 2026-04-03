"use client"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { motion, useDragControls, useMotionValue } from "framer-motion"

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isMaximized: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
  onSizeChange: (size: { width: number; height: number }) => void
  headerRight?: ReactNode
  isMobile?: boolean
}

export function Window({
  id,
  title,
  children,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  headerRight,
  isMobile,
}: WindowProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  
  const dragControls = useDragControls()
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)

  // Sync motion values with prop changes (e.g. from parent snapping/restoring)
  useEffect(() => {
    if (!isDragging) {
      x.set(position.x)
      y.set(position.y)
    }
  }, [position, isDragging, x, y])

  const handleDragStart = () => {
    onFocus()
    setIsDragging(true)
    document.body.style.userSelect = "none"
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.userSelect = "auto"
    onPositionChange({ x: Math.round(x.get()), y: Math.round(y.get()) })
  }

  const handleResizeMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing && !isMaximized) {
        onSizeChange({
          width: Math.max(280, e.clientX - x.get()),
          height: Math.max(200, e.clientY - y.get()),
        })
      }
    },
    [isResizing, isMaximized, x, y, onSizeChange],
  )

  const handleResizeMouseUp = useCallback(() => {
    setIsResizing(false)
    document.body.style.userSelect = "auto"
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMouseMove)
      document.addEventListener("mouseup", handleResizeMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleResizeMouseMove)
      document.removeEventListener("mouseup", handleResizeMouseUp)
    }
  }, [isResizing, handleResizeMouseMove, handleResizeMouseUp])

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    document.body.style.userSelect = "none"
  }

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={true}
      dragElastic={0.05}
      dragTransition={{ power: 0.2, timeConstant: 250 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        width: size.width,
        height: size.height,
        x,
        y,
        zIndex,
        touchAction: "none",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute flex flex-col macos-window-shadow overflow-hidden backdrop-blur-[20px] bg-white/72 border border-white/20 shadow-2xl transition-shadow duration-200 ${
        isMobile ? "rounded-[20px]" : "rounded-xl"
      } ${
        isDragging ? "shadow-dark-2xl" : ""
      }`}
      onMouseDown={() => onFocus()}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Title bar */}
      <div
        className={`window-titlebar flex-shrink-0 ${isMobile ? "h-12" : "h-11"} bg-white/40 border-b border-gray-200/50 flex items-center justify-between px-4 cursor-default select-none group`}
        onPointerDown={(e) => {
          e.stopPropagation()
          dragControls.start(e)
        }}
        onDoubleClick={onMaximize}
        style={{ touchAction: "none" }}
      >
        <div className="flex items-center gap-2">
          <button
            className={`w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-all flex items-center justify-center ${
              showControls || isMobile ? "opacity-100" : "opacity-60"
            }`}
            onClick={onClose}
          >
            {(showControls || isMobile) && <span className="text-[8px] text-red-900 pointer-events-none">✕</span>}
          </button>
          <button
            className={`w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-all flex items-center justify-center ${
              showControls || isMobile ? "opacity-100" : "opacity-60"
            }`}
            onClick={onMinimize}
          >
            {(showControls || isMobile) && <Minimize2 className="w-2 h-2 text-yellow-900 pointer-events-none" />}
          </button>
          <button
            className={`w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-all flex items-center justify-center ${
              showControls || isMobile ? "opacity-100" : "opacity-60"
            }`}
            onClick={onMaximize}
          >
            {(showControls || isMobile) && <Maximize2 className="w-2 h-2 text-green-900 pointer-events-none" />}
          </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700/80 tracking-tight">
          {title}
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col overflow-auto bg-white/60 ${isDragging ? "pointer-events-none" : ""}`}>
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50 transition-colors hover:bg-black/5" onMouseDown={handleResizeMouseDown} />
      )}
    </motion.div>
  )
}
