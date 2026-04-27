import React from 'react'

export default function Background() {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none">
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(-20%, -20%) scale(1); }
          50% { transform: translate(20%, 20%) scale(1.2); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(20%, 20%) scale(1); }
          50% { transform: translate(-20%, -20%) scale(1.4); }
        }
      `}</style>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-void">
        {/* Aurora orb 1 — CSS animation, GPU composited */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, var(--teal) 0%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
            animation: 'aurora-1 22s linear infinite',
          }}
        />
        {/* Aurora orb 2 — CSS animation, GPU composited */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, var(--magenta) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
            animation: 'aurora-2 28s linear infinite',
          }}
        />

        {/* Cinematic Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Subtle Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
      </div>
    </div>
  )
}
