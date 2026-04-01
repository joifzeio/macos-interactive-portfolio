"use client"

import { useState } from "react"

export function Messages() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSend = () => {
    console.log("Sending message:", formData)
    // Add send logic here (e.g., API call)
    alert("Message sent! (Simulation)")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="flex flex-col h-full bg-white text-[#1d1d1f] font-sans">
      {/* Contact Form Fields */}
      <div className="flex flex-col border-b border-gray-100">
        <div className="flex items-center px-6 py-3 border-b border-gray-100/50">
          <label className="w-16 text-sm text-gray-400 font-medium">Name:</label>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-gray-300"
          />
        </div>
        <div className="flex items-center px-6 py-3 border-b border-gray-100/50">
          <label className="w-16 text-sm text-gray-400 font-medium">From:</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-gray-300"
          />
        </div>
        <div className="flex items-center px-6 py-3">
          <label className="w-16 text-sm text-gray-400 font-medium">Subject:</label>
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="flex-1 bg-transparent border-none outline-none text-[15px] placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Message Body */}
      <div className="flex-1 p-6 flex flex-col relative">
        <textarea
          placeholder="Write your message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="flex-1 bg-transparent border-none outline-none resize-none text-[15px] placeholder:text-gray-300 py-2 leading-relaxed"
        />

        {/* Send Button */}
        <div className="absolute bottom-6 right-6">
          <button
            onClick={handleSend}
            disabled={!formData.message.trim()}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              formData.message.trim()
                ? "bg-[#8a8a8e] text-white hover:bg-[#6e6e73]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
