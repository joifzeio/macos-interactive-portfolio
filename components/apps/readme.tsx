"use client"

export function Readme() {
  return (
    <div className="h-full bg-white text-[#1d1d1f] flex flex-col font-mono selection:bg-blue-100">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6 text-[14px] md:text-[15px] leading-relaxed">
          <section>
            <h1 className="text-lg font-bold mb-4"># Welcome to Nathan's Portfolio</h1>
            <p>
              You've arrived at my personal, interactive macOS-inspired workspace. Feel free to explore my projects, skills, and creative experiments.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">## What is this place</h2>
            <p>
              This is a digital home built to showcase high-performance web experiences. Built using Next.js and Framer Motion, it’s a sandbox for modern front-end development and a mirror of the tools I use every day.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">## How to get around</h2>
            <h3 className="font-bold mb-2">### The Desktop</h3>
            <p>
              The desktop icons represent my key work. Open <strong>Saveur Ramen</strong> for a modern Japanese restaurant web experience, or <strong>Soirée Inter-Facs</strong> for an event ticketing hub. Each project is designed with a premium, user-centric focus.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-2">### The Dock</h3>
            <p>
              At the bottom (or the side on mobile), you'll find the main apps.
            </p>
            <ul className="mt-4 space-y-1">
              <li><strong>Finder</strong>: Browse my project documentation.</li>
              <li><strong>Messages</strong>: My take on messaging platforms.</li>
              <li><strong>Safari</strong>: My internal browser for exploring external links natively.</li>
              <li><strong>GitHub</strong>: A quick jump into my coding world.</li>
              <li><strong>Terminal</strong>: For power users and command line enthusiasts.</li>
              <li><strong>Launchpad</strong>: Access even more apps like VSCode, GitHub, and other surprises.</li>
            </ul>
          </section>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 6px;
          border: 3px solid #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  )
}
