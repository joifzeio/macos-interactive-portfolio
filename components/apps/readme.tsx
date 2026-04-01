"use client"

export function Readme() {
  return (
    <div className="h-full bg-white text-[#1d1d1f] flex flex-col font-mono selection:bg-blue-100">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6 text-[14px] md:text-[15px] leading-relaxed">
          <section>
            <h1 className="text-lg font-bold mb-4"># Welcome to gucduck</h1>
            <p>
              You made it. No need to duck and cover. This is Chris’s little corner of the internet and you are invited to waddle through it.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">## What is this place</h2>
            <p>
              gucduck is a personal website that looks and feels like macOS, the operating system on Apple computers. Everything is interactive. Click. Drag. Open. Waddle.
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2">## How to get around</h2>
            <h3 className="font-bold mb-2">### The desktop</h3>
            <p>
              The desktop icons are little highlights and random treasures from my life. Projects. Experiments. Stories. Each one opens something worth poking around.
            </p>
          </section>

          <section>
            <h3 className="font-bold mb-2">### The dock</h3>
            <p>
              On desktop, the dock lives at the bottom of the screen. On mobile, it shifts to the left side.
            </p>
            <p className="mt-4">
              This is where the main apps live.
            </p>
            <ul className="mt-4 space-y-1">
              <li>Finder lets you browse files.</li>
              <li>Notes holds written thoughts.</li>
              <li>Photos shows my photography.</li>
              <li>Music plays tracks.</li>
              <li>Terminal runs commands.</li>
              <li>Apps opens the full launcher with even more things like Photo Booth, Stocks, and other surprises.</li>
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
