import React from 'react';

export interface CurvedDividerProps {
  fillColor?: string;
  bgFill?: string;
  type?: 'curve-down' | 'curve-up' | 'arc-convex' | 'arc-concave';
  height?: number | string;
  className?: string;
  flip?: boolean;
}

export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  fillColor = '#050505',
  bgFill = 'transparent',
  type = 'curve-down',
  height = 90,
  className = '',
  flip = false,
}) => {
  // SVG paths for smooth organic arcs
  // Type 1: Curve down (a gentle downward bowl or convex arc)
  // Type 2: Curve up (a gentle upward dome)
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ height, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {bgFill !== 'transparent' && (
          <rect width="1440" height="120" fill={bgFill} />
        )}
        {type === 'curve-down' && (
          // White/light to dark downward arc
          <path
            d="M0,0 C360,110 1080,110 1440,0 L1440,120 L0,120 Z"
            fill={fillColor}
          />
        )}
        {type === 'curve-up' && (
          // Dark to light upward dome
          <path
            d="M0,120 C420,10 1020,10 1440,120 L1440,0 L0,0 Z"
            fill={fillColor}
          />
        )}
        {type === 'arc-convex' && (
          // Convex dome covering top
          <path
            d="M0,120 Q720,-30 1440,120 L1440,120 L0,120 Z"
            fill={fillColor}
          />
        )}
        {type === 'arc-concave' && (
          // Concave scoop
          <path
            d="M0,0 Q720,130 1440,0 L1440,120 L0,120 Z"
            fill={fillColor}
          />
        )}
      </svg>
    </div>
  );
};

export default CurvedDivider;
