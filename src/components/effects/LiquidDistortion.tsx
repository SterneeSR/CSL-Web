import { useEffect, useRef } from 'react';

const CONFIG = {
  bg: { strength: 6, maxAge: 20 },
  square: { strength: 25, maxAge: 35 },
  logo: { strength: 12, maxAge: 25 },
  text: { strength: 8, maxAge: 20 },
  button: { strength: 4, maxAge: 15 }
};

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
}

export function LiquidDistortion() {
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    let targetX = -1000;
    let targetY = -1000;
    let lastX = -1000;
    let lastY = -1000;
    let currentStrength = 0;
    let currentMaxAge = 20;
    
    let trail: TrailPoint[] = [];
    
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    let animationFrameId: number;
    
    const updateTrailSvg = (points: TrailPoint[], w: number, h: number) => {
      if (!feImageRef.current) return;
      
      let lines = '';
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const life = 1 - (p1.age / currentMaxAge);
        if (life <= 0) continue;
        
        const velocity = Math.hypot(p1.vx, p1.vy);
        // Optical brush width 20-45px based on velocity
        const strokeWidth = Math.min(45, Math.max(20, 20 + velocity * 1.5));
        
        // Neutral is 128. We shift to 135 to displace.
        // Fading out opacity based on age creates the quick decay.
        lines += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="rgba(142,142,128,${life * 0.8})" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
      }

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
          <defs>
            <filter id="blur"><feGaussianBlur stdDeviation="8" /></filter>
          </defs>
          <rect width="100%" height="100%" fill="rgb(128,128,128)"/>
          <g filter="url(#blur)">
            ${lines}
          </g>
        </svg>
      `;
      const encoded = "data:image/svg+xml;base64," + btoa(svg);
      feImageRef.current.setAttribute("href", encoded);
    };

    const render = () => {
      // Determine context
      const hoveredEl = document.elementFromPoint(targetX, targetY) as HTMLElement;
      let context: keyof typeof CONFIG = 'bg';
      
      if (hoveredEl) {
        if (hoveredEl.closest('[data-distort="text"]')) context = 'text';
        else if (hoveredEl.closest('[data-distort="square"]')) context = 'square';
        else if (hoveredEl.closest('[data-distort="logo"]')) context = 'logo';
        else if (hoveredEl.closest('[data-distort="button"]')) context = 'button';
      }

      const targetStrength = CONFIG[context].strength;
      currentMaxAge = CONFIG[context].maxAge;
      
      currentStrength += (targetStrength - currentStrength) * 0.1;

      if (filterRef.current) {
        filterRef.current.setAttribute('scale', currentStrength.toString());
      }
      
      // Update trail
      const vx = targetX - lastX;
      const vy = targetY - lastY;
      
      // Only add point if mouse moved
      if (Math.hypot(vx, vy) > 2) {
        trail.push({ x: targetX, y: targetY, age: 0, vx, vy });
        lastX = targetX;
        lastY = targetY;
      }

      // Age points
      trail.forEach(p => p.age += 1);
      
      // Remove dead points
      trail = trail.filter(p => p.age < currentMaxAge);
      
      updateTrailSvg(trail, window.innerWidth, window.innerHeight);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg className="fixed top-0 left-0 w-0 h-0 pointer-events-none" style={{ zIndex: -1 }}>
      <defs>
        <filter id="liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lensSource" />
          
          <feDisplacementMap ref={filterRef} in="SourceGraphic" in2="lensSource" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          
          {/* Subtle Chromatic Refraction at the edges of the distortion */}
          <feOffset in="displaced" dx="0.5" dy="0" result="red" />
          <feOffset in="displaced" dx="-0.5" dy="0" result="blue" />
          
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
