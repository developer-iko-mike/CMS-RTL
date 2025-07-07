import React from 'react';

export default function ProductSVG({
  fill = "#000000",
  width = 24,
  height = 24,
  onClick,
  className
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 24 24" 
      version="1.1"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    >
      <title />
      <g 
        fill="none" 
        fillRule="evenodd" 
        id="页面-1" 
        stroke="none" 
        strokeWidth="1"
      >
        <g 
          id="导航图标" 
          transform="translate(-325.000000, -80.000000)"
        >
          <g 
            id="编组" 
            transform="translate(325.000000, 80.000000)"
          >
            <polygon 
              fill="transparent" 
              fillOpacity="0.01" 
              fillRule="nonzero" 
              id="路径" 
              points="24 0 0 0 0 24 24 24"
            />
            <polygon 
              id="路径" 
              points="22 7 12 2 2 7 2 17 12 22 22 17" 
              stroke={fill}
              strokeLinejoin="round" 
              strokeWidth="1.5"
            />
            <line 
              id="路径" 
              stroke={fill} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              x1="2" 
              x2="12" 
              y1="7" 
              y2="12"
            />
            <line 
              id="路径" 
              stroke={fill} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              x1="12" 
              x2="12" 
              y1="22" 
              y2="12"
            />
            <line 
              id="路径" 
              stroke={fill} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              x1="22" 
              x2="12" 
              y1="7" 
              y2="12"
            />
            <line 
              id="路径" 
              stroke={fill} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              x1="17" 
              x2="7" 
              y1="4.5" 
              y2="9.5"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}