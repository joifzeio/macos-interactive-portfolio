"use client"

import React from "react"

import { useState, useCallback, useEffect } from "react"

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
  const [clicks, setClicks] = useState(0)
  const [isSelected, setIsSelected] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)

  const scaleFactor = isMobile ? 0.65 : 1
  const isLarge = size && (size.width > 100 || size.height > 100)
  const width = (size?.width ?? 100) * scaleFactor
  const iconHeight = (size?.height ?? 64) * scaleFactor
  const padding = isMobile ? 10 : 32

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      
      // If we moved the icon, don't trigger a click
      if (hasMoved) {
        setHasMoved(false)
        return
      }

      setIsSelected(true)

      // Mobile: Single click opens app
      if (isMobile) {
        onDoubleClick()
        setTimeout(() => setIsSelected(false), 300)
        return
      }

      // Desktop: Double click logic
      const newClicks = clicks + 1
      setClicks(newClicks)

      if (newClicks === 2) {
        onDoubleClick()
        setIsSelected(false)
        setClicks(0)
      } else {
        setTimeout(() => setClicks(0), 300)
      }
    },
    [clicks, onDoubleClick, isMobile, hasMoved],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left click
    setIsDragging(true)
    setHasMoved(false)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
    if (isDragging && onPositionChange) {
      setHasMoved(true)
      onPositionChange({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    },
    [isDragging, dragOffset, onPositionChange],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setHasMoved(false)
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && onPositionChange) {
        setHasMoved(true)
        // Prevent scrolling while dragging
        if (e.cancelable) e.preventDefault()
        const touch = e.touches[0]
        onPositionChange({
          x: touch.clientX - dragOffset.x,
          y: touch.clientY - dragOffset.y,
        })
      }
    },
    [isDragging, dragOffset, onPositionChange],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("touchend", handleTouchEnd)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])



  return (
    <div
      className={`absolute flex flex-col items-center gap-1 transition-all cursor-default select-none group hover:scale-105 ${
        isLarge 
          ? "bg-[#7c88b4]/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10" 
          : `p-2 rounded-lg ${isSelected ? "bg-blue-500/30" : "hover:bg-white/10"}`
      } ${isDragging ? "opacity-70 z-50 transition-none" : "z-10"}`}
      style={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        width: isLarge ? `${width + padding * 2}px` : `${width}px`,
        padding: isLarge ? `${padding}px` : undefined,
        touchAction: "none", // Prevent browser handling of touch
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
    </div>
  )
}
