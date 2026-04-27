"use client";
import React from "react";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  return (
    <div
      className={`relative flex font-semibold overflow-hidden text-smoke transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/* Glass Layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit"
        style={{
          backdropFilter: "blur(12px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: "rgba(255, 255, 255, 0.05)" }}
      />
      <div
        className="absolute inset-0 z-20 rounded-inherit overflow-hidden"
        style={{
          boxShadow:
            "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export interface DockItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

export const GlassDock: React.FC<{ items: DockItem[]; className?: string }> = ({
  items,
  className = "",
}) => (
  <>
    <GlassFilter />
    <GlassEffect
      className={`rounded-[2rem] p-3 hover:p-4 hover:rounded-[2.5rem] bg-void/50 ${className}`}
    >
      <div className="flex items-center justify-center gap-3 md:gap-5 rounded-[2rem] px-2 overflow-hidden">
        {items.map((item, index) => {
          const content = (
            <div
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-smoke/80 hover:text-teal transition-all duration-700 hover:scale-[1.3] cursor-pointer"
              style={{
                transformOrigin: "center bottom",
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
              }}
              onClick={item.onClick}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
            </div>
          );

          return item.href ? (
            <a key={index} href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}>
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    </GlassEffect>
  </>
);

export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none", position: 'absolute', width: 0, height: 0 }}>
    <filter
      id="glass-distortion"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.01"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="mapped" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="1.5"
        specularConstant="0.3"
        specularExponent="15"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-50" y="-50" z="200" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        in2="SourceAlpha"
        operator="in"
        result="litImage"
      />
      <feComposite
        in="SourceGraphic"
        in2="litImage"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="composited"
      />
      <feDisplacementMap
        in="composited"
        in2="softMap"
        scale="8"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);
