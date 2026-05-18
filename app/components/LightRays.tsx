"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

interface LightRaysProps {
  color1?: string;
  color2?: string;
  backgroundColor?: string;
  intensity?: number;
  rays?: number;
  reach?: number;
  speed?: number;
  position?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
}

const VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAGMENT_SHADER = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float mod289(float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

float permute(float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

float taylorInvSqrt(float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  float diagonal = length(u_resolution);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)),
    u_reach, 1.0) *
    clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  float speed = u_rays * 10.0;

  vec2 rayPos1 = u_rayPos1;
  vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
  float raySeedA1 = 36.2214 * speed;
  float raySeedB1 = 21.11349 * speed;
  float raySpeed1 = 1.5 * speed;

  vec2 rayPos2 = u_rayPos2;
  vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
  float raySeedA2 = 22.39910 * speed;
  float raySeedB2 = 18.0234 * speed;
  float raySpeed2 = 1.1 * speed;

  float strength1 = rayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
  float strength2 = rayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);

  float brightness = 1.0 * u_reach - (coord.y / u_resolution.y);
  float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);

  float alpha1 = strength1 * attenuation * u_colors[0].a;
  float alpha2 = strength2 * attenuation * u_colors[1].a;

  vec3 premultColor1 = u_colors[0].rgb * alpha1;
  vec3 premultColor2 = u_colors[1].rgb * alpha2;

  vec3 blendedColor = premultColor1 + premultColor2;
  float blendedAlpha = alpha1 + alpha2 * (1.0 - alpha1);

  vec3 finalRGB = blendedColor / max(blendedAlpha, 0.0001);
  gl_FragColor = vec4(finalRGB * blendedAlpha, blendedAlpha);
}
`;

export function LightRays({
  color1 = "#00EDFF",
  color2 = "#CC3366",
  backgroundColor = "transparent",
  intensity = 50,
  rays = 30,
  reach = 40,
  speed = 10,
  position = 80,
  className = "",
  style,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  const c1 = useMemo(() => hexToRgb(color1), [color1]);
  const c2 = useMemo(() => hexToRgb(color2), [color2]);

  useEffect(() => { setMounted(true); }, []);

  // Setup Three.js
  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      premultipliedAlpha: true,
      alpha: true,
      antialias: true,
      precision: "highp",
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(1024, 1024);
    const material = new THREE.ShaderMaterial({
      fragmentShader: FRAGMENT_SHADER,
      vertexShader: VERTEX_SHADER,
      uniforms: {
        u_colors: {
          value: [
            new THREE.Vector4(c1[0], c1[1], c1[2], 1),
            new THREE.Vector4(c2[0], c2[1], c2[2], 1),
          ],
        },
        u_intensity: { value: mapRange(intensity, 0, 100, 0, 0.5) },
        u_rays: { value: mapRange(rays, 0, 100, 0, 0.3) },
        u_reach: { value: mapRange(reach, 0, 100, 0, 0.5) },
        u_time: { value: Math.random() * 10000 },
        u_resolution: { value: [container.clientWidth, container.clientHeight] },
        u_rayPos1: { value: [(position / 100) * container.clientWidth, -0.4 * container.clientHeight] },
        u_rayPos2: { value: [(position / 100 + 0.02) * container.clientWidth, -0.5 * container.clientHeight] },
      },
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (mesh.material instanceof THREE.ShaderMaterial) {
        mesh.material.uniforms.u_time.value += (delta * speed) / 1000 / 10;
      }
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted, c1, c2, intensity, rays, reach, speed, position]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        overflow: "hidden",
        backgroundColor,
        ...style,
      }}
    />
  );
}
