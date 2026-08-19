import { useEffect, useRef } from 'react';

const CONFIG = {
  bg: { strength: 8, radius: 150 },
  square: { strength: 35, radius: 200 },
  logo: { strength: 20, radius: 120 },
  text: { strength: 15, radius: 150 },
  button: { strength: 5, radius: 80 }
};

export function LiquidDistortion() {
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let currentStrength = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    let animationFrameId: number;
    
    // Generate a radial gradient SVG data URI for the displacement map
    // We update this dynamically to move the "lens"
    const updateLens = (x: number, y: number, radius: number) => {
      if (!feImageRef.current) return;
      // We encode a simple SVG with a circle gradient to act as the displacement source
      // The R and G channels dictate X and Y displacement
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${window.innerWidth}" height="${window.innerHeight}">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#808080" stop-opacity="1" />
              <stop offset="100%" stop-color="#000000" stop-opacity="0" />
            </radialGradient>
          </defs>
          <circle cx="${x}" cy="${y}" r="${radius}" fill="url(#grad)" />
        </svg>
      `;
      const encoded = "data:image/svg+xml;base64," + btoa(svg);
      feImageRef.current.setAttribute("href", encoded);
    };

    const render = () => {
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Detect context
      const hoveredEl = document.elementFromPoint(targetX, targetY) as HTMLElement;
      let context: keyof typeof CONFIG = 'bg';
      
      if (hoveredEl) {
        if (hoveredEl.closest('[data-distort="text"]')) context = 'text';
        else if (hoveredEl.closest('[data-distort="square"]')) context = 'square';
        else if (hoveredEl.closest('[data-distort="logo"]')) context = 'logo';
        else if (hoveredEl.closest('[data-distort="button"]')) context = 'button';
      }

      const targetStrength = CONFIG[context].strength;
      const radius = CONFIG[context].radius;
      
      currentStrength += (targetStrength - currentStrength) * 0.05;

      if (filterRef.current) {
        filterRef.current.scale.baseVal = currentStrength;
      }
      
      updateLens(mouseX, mouseY, radius);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg ref={svgRef} className="fixed top-0 left-0 w-0 h-0 pointer-events-none" style={{ zIndex: -1 }}>
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feImage ref={feImageRef} result="lens" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          <feDisplacementMap ref={filterRef} in="SourceGraphic" in2="lens" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          {/* Subtle Chromatic Aberration */}
          <feOffset in="displaced" dx="1" dy="0" result="red" />
          <feOffset in="displaced" dx="-1" dy="0" result="blue" />
          <feComponentTransfer in="red" result="red-channel">
            <feFuncR type="linear" slope="1" />
            <feFuncG type="linear" slope="0" />
            <feFuncB type="linear" slope="0" />
          </feComponentTransfer>
          <feComponentTransfer in="blue" result="blue-channel">
            <feFuncR type="linear" slope="0" />
            <feFuncG type="linear" slope="0" />
            <feFuncB type="linear" slope="1" />
          </feComponentTransfer>
          <feComponentTransfer in="displaced" result="green-channel">
            <feFuncR type="linear" slope="0" />
            <feFuncG type="linear" slope="1" />
            <feFuncB type="linear" slope="0" />
          </feComponentTransfer>
          <feBlend mode="screen" in="red-channel" in2="blue-channel" result="magenta" />
          <feBlend mode="screen" in="magenta" in2="green-channel" result="final" />
        </filter>
      </defs>
    </svg>
  );
}
