"use client"

import React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, useDragControls } from "framer-motion"

interface DesktopIconProps {
  icon: string | React.ComponentType
  label: string
  onDoubleClick: () => void
  position?: { x: number; y: number }
  onPositionChange?: (pos: { x: number; y: number }) => void
  size?: { width: number; height: number }
  isMobile?: boolean
}

export function DesktopIcon({ icon, label, onDoubleClick, position, onPositionChange, size, isMobile }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  const scaleFactor = isMobile ? 0.65 : 1
  const isLarge = size && (size.width > 100 || size.height > 100)
  const width = (size?.width ?? 100) * scaleFactor
  const iconHeight = (size?.height ?? 64) * scaleFactor
  const padding = isMobile ? 10 : 32

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    if (onPositionChange) {
      onPositionChange({
        x: (position?.x ?? 0) + info.offset.x,
        y: (position?.y ?? 0) + info.offset.y,
      })
    }
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onPointerDown={(e) => {
        setIsSelected(true)
        if (isMobile) {
          onDoubleClick()
          setTimeout(() => setIsSelected(false), 300)
        }
      }}
      whileHover={{ scale: isMobile ? 1 : 1.05 }}
      onDoubleClick={() => !isMobile && onDoubleClick()}
      className={`absolute flex flex-col items-center gap-1 cursor-default select-none group ${isDragging ? "z-50 transition-none" : "z-10"} ${
        isLarge 
          ? `rounded-2xl transition-all duration-300 ${
              isSelected 
                ? "bg-[#7c88b4]/60 backdrop-blur-md shadow-2xl border border-white/20" 
                : "hover:bg-[#7c88b4]/40 hover:backdrop-blur-md hover:shadow-xl hover:border hover:border-white/10"
            }`
          : `p-2 rounded-lg ${isSelected ? "bg-blue-500/30 font-semibold" : "hover:bg-white/10"}`
      } ${isDragging ? "transition-none" : ""}`}
      style={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        width: isLarge ? `${width + padding * 2}px` : `${width}px`,
        padding: isLarge ? `${padding}px` : undefined,
        zIndex: isSelected ? 50 : 10,
        touchAction: "none",
      }}
    >
      {typeof icon === "string" ? (
        <div className="text-5xl pointer-events-none mb-1">{icon}</div>
      ) : (
        <div 
          className="pointer-events-none overflow-hidden shadow-lg" 
          style={{ 
            width: "100%", 
            height: isLarge ? `${iconHeight}px` : "64px",
            borderRadius: isLarge ? "8px" : "22%" 
          }}
        >
          {typeof icon !== "string" && React.createElement(icon)}
        </div>
      )}
      <span className={`font-medium text-white drop-shadow-md text-center break-words w-full pointer-events-none ${isLarge ? (isMobile ? "text-[10px] mt-1" : "text-sm mt-2") : "text-xs mt-1"}`}>
        {label}
      </span>
    </motion.div>
  )
}
