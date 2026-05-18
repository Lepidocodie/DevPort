"use client";

import { useEffect, useRef, useState } from "react";

interface InteractiveGridProps {
  gridColor?: string;
  dotColor?: string;
  hoverColor?: string;
  gridSize?: number;
  repulsionStrength?: number;
  radius?: number;
  dotSize?: number;
  gridThickness?: number;
  baseOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot { x: number; y: number; vx: number; vy: number; size: number; targetSize: number; }

function parseColor(c: string) {
  if (!c || c === "transparent") return { r: 0, g: 0, b: 0 };
  const h = c.replace("#", "");
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
}

export function InteractiveGrid({
  gridColor = "#FFFFFF", dotColor = "#FFFFFF", hoverColor = "#00EDFF",
  gridSize = 60, repulsionStrength = -0.65, radius = 290,
  dotSize = 1.5, gridThickness = 0.5, baseOpacity = 0.09,
  className = "", style,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dotsRef = useRef<Map<string, Dot>>(new Map());
  const mouseRef = useRef<{x:number;y:number}|null>(null);
  const [mounted, setMounted] = useState(false);
  const pRef = useRef({ gridColor, dotColor, hoverColor, gridSize, repulsionStrength, radius, dotSize, gridThickness, baseOpacity });

  useEffect(() => { pRef.current = { gridColor, dotColor, hoverColor, gridSize, repulsionStrength, radius, dotSize, gridThickness, baseOpacity }; },
    [gridColor, dotColor, hoverColor, gridSize, repulsionStrength, radius, dotSize, gridThickness, baseOpacity]);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const maxDist = 400;

    const getSize = () => ({ w: canvas.clientWidth||1, h: canvas.clientHeight||1 });
    const initDots = () => {
      dotsRef.current.clear();
      const {w,h} = getSize();
      const gs = pRef.current.gridSize;
      for (let gx=-gs; gx<w+gs*2; gx+=gs)
        for (let gy=-gs; gy<h+gs*2; gy+=gs)
          dotsRef.current.set(`${gx},${gy}`, {x:gx,y:gy,vx:0,vy:0,size:1,targetSize:1});
    };

    let {w,h} = getSize();
    canvas.width=w; canvas.height=h;
    initDots();

    const hoverI = (x:number,y:number) => {
      const m=mouseRef.current; if(!m) return 0;
      const d=Math.sqrt((x-m.x)**2+(y-m.y)**2);
      return d>pRef.current.radius ? 0 : Math.pow(1-d/pRef.current.radius,3.5);
    };
    const push = (bx:number,by:number) => {
      const m=mouseRef.current; const rep=pRef.current.repulsionStrength*25;
      if(!m||rep===0) return {x:0,y:0};
      const dx=bx-m.x,dy=by-m.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d===0) return {x:0,y:0};
      const p=Math.pow(1-Math.min(d/maxDist,1),2)*rep;
      return {x:(dx/d)*p, y:(dy/d)*p};
    };

    const animate = () => {
      const p=pRef.current; const hc=parseColor(p.hoverColor); const gc=parseColor(p.gridColor); const dc=parseColor(p.dotColor);
      ctx.clearRect(0,0,w,h);
      dotsRef.current.forEach((dot,key) => {
        const [gxS,gyS]=key.split(","); const gx=parseInt(gxS),gy=parseInt(gyS);
        const hi=hoverI(dot.x,dot.y);
        const rd=dotsRef.current.get(`${gx+p.gridSize},${gy}`);
        if(rd) { const a=(hi+hoverI(rd.x,rd.y))/2; ctx.beginPath(); ctx.moveTo(dot.x,dot.y); ctx.lineTo(rd.x,rd.y); ctx.lineWidth=p.gridThickness+a*2; ctx.strokeStyle=`rgba(${Math.round(gc.r+(hc.r-gc.r)*a)},${Math.round(gc.g+(hc.g-gc.g)*a)},${Math.round(gc.b+(hc.b-gc.b)*a)},${p.baseOpacity+(1-p.baseOpacity)*a})`; ctx.stroke(); }
        const bd=dotsRef.current.get(`${gx},${gy+p.gridSize}`);
        if(bd) { const a=(hi+hoverI(bd.x,bd.y))/2; ctx.beginPath(); ctx.moveTo(dot.x,dot.y); ctx.lineTo(bd.x,bd.y); ctx.lineWidth=p.gridThickness+a*2; ctx.strokeStyle=`rgba(${Math.round(gc.r+(hc.r-gc.r)*a)},${Math.round(gc.g+(hc.g-gc.g)*a)},${Math.round(gc.b+(hc.b-gc.b)*a)},${p.baseOpacity+(1-p.baseOpacity)*a})`; ctx.stroke(); }
      });
      dotsRef.current.forEach((dot,key) => {
        const [gxS,gyS]=key.split(","); const gx=parseInt(gxS),gy=parseInt(gyS);
        const cp=push(gx,gy); const tx=gx+cp.x, ty=gy+cp.y;
        dot.vx=(dot.vx+(tx-dot.x)*0.04)*0.75; dot.vy=(dot.vy+(ty-dot.y)*0.04)*0.75;
        dot.x+=dot.vx; dot.y+=dot.vy;
        const hi=hoverI(dot.x,dot.y);
        dot.targetSize=p.dotSize+hi*p.dotSize; dot.size+=(dot.targetSize-dot.size)*0.15;
        ctx.beginPath(); ctx.arc(dot.x,dot.y,Math.max(p.dotSize*0.5,dot.size),0,Math.PI*2);
        ctx.fillStyle=`rgba(${Math.round(dc.r+(hc.r-dc.r)*hi)},${Math.round(dc.g+(hc.g-dc.g)*hi)},${Math.round(dc.b+(hc.b-dc.b)*hi)},${p.baseOpacity+(1-p.baseOpacity)*hi})`;
        ctx.fill();
      });
      animRef.current=requestAnimationFrame(animate);
    };
    animRef.current=requestAnimationFrame(animate);

    const onMove = (e:MouseEvent) => {
      const r=canvas.getBoundingClientRect(); const x=(e.clientX-r.left)*(w/r.width); const y=(e.clientY-r.top)*(h/r.height);
      mouseRef.current = (x>=0&&y>=0&&x<=w&&y<=h) ? {x,y} : null;
    };
    window.addEventListener("mousemove",onMove);
    const ro=new ResizeObserver(()=>{ const s=getSize(); w=s.w; h=s.h; canvas.width=w; canvas.height=h; initDots(); });
    ro.observe(canvas);
    return () => { window.removeEventListener("mousemove",onMove); ro.disconnect(); if(animRef.current) cancelAnimationFrame(animRef.current); };
  }, [mounted]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",...style}} />;
}
