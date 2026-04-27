import React from 'react'

const content = 'FREELANCE · WEB DEVELOPMENT · REACT · FULL-STACK · AVAILABLE FOR HIRE · CLIENT WORK · ANDROID · TYPESCRIPT · OPEN SOURCE · '

export default function Marquee() {
  return (
    <div
      className="relative py-4 overflow-hidden"
      style={{
        transform: 'rotate(-1.5deg) scaleX(1.1)',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-hidden="true"
    >
      {/* Using CSS transform: rotate(-1deg) scaleX(1.05) on mobile via media query handled by parent */}
      <div
        className="whitespace-nowrap flex"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase shrink-0">
          {content}
        </span>
        <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase shrink-0">
          {content}
        </span>
      </div>
    </div>
  )
}
