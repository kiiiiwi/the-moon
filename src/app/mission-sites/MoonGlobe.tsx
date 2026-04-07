/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

const moonTextureUrl = "/mission-sites/moon-texture.jpg";
const moonDisplacementMapUrl = "/mission-sites/moon-displacement.jpg";

const MOON_INITIAL_ROTATION_Y = -1.6;
const MOON_INITIAL_ROTATION_X = -0.2;
const CJK_FONT_FAMILY = "\"Source Han Sans SC\", \"Noto Sans CJK SC\", \"Microsoft YaHei\", \"PingFang SC\", sans-serif";

export interface LandingSite {
  id: string;
  name: string;
  mission: string;
  lat: number;
  lon: number;
  country: string;
  program: string;
}

export const landingSites: LandingSite[] = [
  { id: "luna9", name: "Luna 9", mission: "Luna 9", lat: 8, lon: -64.37, country: "USSR", program: "Luna" },
  { id: "luna13", name: "Luna 13", mission: "Luna 13", lat: 18.87, lon: -62.05, country: "USSR", program: "Luna" },
  { id: "luna16", name: "Luna 16", mission: "Luna 16", lat: -0.51, lon: 56.36, country: "USSR", program: "Luna" },
  { id: "luna17", name: "Luna 17", mission: "Luna 17", lat: 38.28, lon: -35.0, country: "USSR", program: "Luna" },
  { id: "luna20", name: "Luna 20", mission: "Luna 20", lat: 3.79, lon: 56.62, country: "USSR", program: "Luna" },
  { id: "luna21", name: "Luna 21", mission: "Luna 21", lat: 26, lon: 30.41, country: "USSR", program: "Luna" },
  { id: "luna24", name: "Luna 24", mission: "Luna 24", lat: 12.71, lon: 62.2, country: "USSR", program: "Luna" },
  { id: "surveyor1", name: "Surveyor 1", mission: "Surveyor 1", lat: -2.47, lon: -43.34, country: "USA", program: "Surveyor" },
  { id: "surveyor3", name: "Surveyor 3", mission: "Surveyor 3", lat: -3.02, lon: -23.42, country: "USA", program: "Surveyor" },
  { id: "surveyor5", name: "Surveyor 5", mission: "Surveyor 5", lat: 1.46, lon: 23.19, country: "USA", program: "Surveyor" },
  { id: "surveyor6", name: "Surveyor 6", mission: "Surveyor 6", lat: 0.47, lon: -1.43, country: "USA", program: "Surveyor" },
  { id: "surveyor7", name: "Surveyor 7", mission: "Surveyor 7", lat: -40.98, lon: -11.51, country: "USA", program: "Surveyor" },
  { id: "apollo11", name: "Apollo 11", mission: "Apollo 11", lat: 0.67, lon: 23.47, country: "USA", program: "Apollo" },
  { id: "apollo12", name: "Apollo 12", mission: "Apollo 12", lat: -3.01, lon: -23.42, country: "USA", program: "Apollo" },
  { id: "apollo14", name: "Apollo 14", mission: "Apollo 14", lat: -3.65, lon: -17.47, country: "USA", program: "Apollo" },
  { id: "apollo15", name: "Apollo 15", mission: "Apollo 15", lat: 26.13, lon: 3.63, country: "USA", program: "Apollo" },
  { id: "apollo16", name: "Apollo 16", mission: "Apollo 16", lat: -8.97, lon: 15.5, country: "USA", program: "Apollo" },
  { id: "apollo17", name: "Apollo 17", mission: "Apollo 17", lat: 20.19, lon: 30.77, country: "USA", program: "Apollo" },
  { id: "chang_e3", name: "嫦娥三号", mission: "Chang'e 3", lat: 44.12, lon: -19.51, country: "China", program: "Chang'e" },
  { id: "chang_e4", name: "嫦娥四号", mission: "Chang'e 4", lat: -45.45, lon: 177.6, country: "China", program: "Chang'e" },
  { id: "chang_e5", name: "嫦娥五号", mission: "Chang'e 5", lat: 43.06, lon: -51.92, country: "China", program: "Chang'e" },
  { id: "chandrayaan3", name: "Chandrayaan-3", mission: "Chandrayaan-3", lat: -69.37, lon: 32.32, country: "India", program: "Chandrayaan" },
  { id: "slim", name: "SLIM", mission: "SLIM", lat: -13.32, lon: 25.25, country: "Japan", program: "SLIM" },
  { id: "im_1", name: "IM-1", mission: "IM-1", lat: -80.13, lon: 1.44, country: "USA", program: "Commercial" },
  { id: "chang_e6", name: "嫦娥六号", mission: "Chang'e 6", lat: -41.63, lon: -153.98, country: "China", program: "Chang'e" },
  { id: "blueghost1", name: "Blue Ghost 1", mission: "Blue Ghost 1", lat: 18.53, lon: 61.81, country: "USA", program: "Commercial" },
  { id: "im_2", name: "IM-2", mission: "IM-2", lat: -84.79, lon: 29.2, country: "USA", program: "Commercial" },
];

interface MoonGlobeProps {
  highlightedMissions: string[];
  onHoverSite?: (site: LandingSite | null) => void;
}

export function MoonGlobe({ highlightedMissions, onHoverSite }: MoonGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [markerTooltip, setMarkerTooltip] = useState<{
    site: LandingSite;
    x: number;
    y: number;
  } | null>(null);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(false);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    moon: THREE.Mesh;
    markers: Map<string, THREE.Mesh>;
    glowMarkers: Map<string, THREE.Mesh>;
    labelSprites: Map<string, THREE.Sprite>;
    animId: number;
    isDragging: boolean;
    prevMouse: { x: number; y: number };
    rotationY: number;
    rotationX: number;
    targetRotationY: number;
    targetRotationX: number;
    autoRotate: boolean;
  } | null>(null);

  const highlightedRef = useRef<string[]>([]);
  highlightedRef.current = highlightedMissions;

  const autoRotateEnabledRef = useRef(autoRotateEnabled);
  autoRotateEnabledRef.current = autoRotateEnabled;

  const initScene = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(4, 2, 4);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xbbbbdd, 0.5);
    fillLight.position.set(-4, -1, 2);
    scene.add(fillLight);

    const moonGeo = new THREE.SphereGeometry(1, 128, 128);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(moonTextureUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const displacementMap = textureLoader.load(moonDisplacementMapUrl);
    displacementMap.minFilter = THREE.LinearMipmapLinearFilter;
    displacementMap.generateMipmaps = true;
    displacementMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      map: texture,
      displacementMap,
      displacementScale: 0.03,
      bumpMap: displacementMap,
      bumpScale: 0.6,
      roughness: 0.92,
      metalness: 0.0,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);

    const glowGeo = new THREE.SphereGeometry(1.015, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x303040,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    const markers = new Map<string, THREE.Mesh>();
    const glowMarkers = new Map<string, THREE.Mesh>();
    const labelSprites = new Map<string, THREE.Sprite>();

    const countryColors: Record<string, number> = {
      USA: 0x3DC8E0,
      USSR: 0xD4A056,
      China: 0xD98E6A,
      India: 0xE8C170,
      Japan: 0xB266FF,
    };

    for (const site of landingSites) {
      const phi = (90 - site.lat) * (Math.PI / 180);
      const theta = (site.lon + 180) * (Math.PI / 180);
      const r = 1.01;
      const x = -r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const markerGeo = new THREE.SphereGeometry(0.018, 12, 12);
      const color = countryColors[site.country] || 0xF1D088;
      const markerMat = new THREE.MeshBasicMaterial({ color });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(x, y, z);
      moon.add(marker);
      markers.set(site.id, marker);

      const glowRingGeo = new THREE.RingGeometry(0.025, 0.045, 24);
      const glowRingMat = new THREE.MeshBasicMaterial({
        color: 0xF1D088,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
      glowRing.position.set(x, y, z);
      glowRing.lookAt(0, 0, 0);
      moon.add(glowRing);
      glowMarkers.set(site.id, glowRing);
    }

    const state = {
      renderer,
      scene,
      camera,
      moon,
      markers,
      glowMarkers,
      labelSprites,
      animId: 0,
      isDragging: false,
      prevMouse: { x: 0, y: 0 },
      rotationY: MOON_INITIAL_ROTATION_Y,
      rotationX: MOON_INITIAL_ROTATION_X,
      targetRotationY: MOON_INITIAL_ROTATION_Y,
      targetRotationX: MOON_INITIAL_ROTATION_X,
      autoRotate: false,
    };

    moon.rotation.y = MOON_INITIAL_ROTATION_Y;
    moon.rotation.x = MOON_INITIAL_ROTATION_X;
    glowMesh.rotation.y = MOON_INITIAL_ROTATION_Y;
    glowMesh.rotation.x = MOON_INITIAL_ROTATION_X;

    const onMouseDown = (e: MouseEvent) => {
      state.isDragging = true;
      state.autoRotate = false;
      state.prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!state.isDragging) return;
      const dx = e.clientX - state.prevMouse.x;
      const dy = e.clientY - state.prevMouse.y;
      state.targetRotationY += dx * 0.005;
      state.targetRotationX += dy * 0.005;
      state.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.targetRotationX));
      state.prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      state.isDragging = false;
      if (autoRotateEnabledRef.current) {
        setTimeout(() => { state.autoRotate = true; }, 3000);
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredSite: string | null = null;

    renderer.domElement.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const markerMeshes = Array.from(markers.values());
      const intersects = raycaster.intersectObjects(markerMeshes);

      const containerRect = container.getBoundingClientRect();
      const relX = e.clientX - containerRect.left;
      const relY = e.clientY - containerRect.top;

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const found = landingSites.find(s => markers.get(s.id) === hitMesh);
        if (found) {
          if (found.id !== hoveredSite) {
            hoveredSite = found.id;
            onHoverSite?.(found);
            renderer.domElement.style.cursor = "pointer";
          }
          setMarkerTooltip({ site: found, x: relX, y: relY });
        }
      } else if (hoveredSite) {
        hoveredSite = null;
        onHoverSite?.(null);
        setMarkerTooltip(null);
        renderer.domElement.style.cursor = "grab";
      }
    });

    const animate = () => {
      state.animId = requestAnimationFrame(animate);

      if (!autoRotateEnabledRef.current) {
        state.autoRotate = false;
      }

      if (state.autoRotate && autoRotateEnabledRef.current) {
        state.targetRotationY += 0.002;
      }

      state.rotationY += (state.targetRotationY - state.rotationY) * 0.08;
      state.rotationX += (state.targetRotationX - state.rotationX) * 0.08;

      moon.rotation.y = state.rotationY;
      moon.rotation.x = state.rotationX;
      glowMesh.rotation.y = state.rotationY;
      glowMesh.rotation.x = state.rotationX;

      const highlighted = highlightedRef.current;
      for (const site of landingSites) {
        const glow = glowMarkers.get(site.id);
        const marker = markers.get(site.id);
        if (!glow || !marker) continue;

        const isHighlighted = highlighted.some(
          m => site.mission.toLowerCase().includes(m.toLowerCase()) ||
            site.program.toLowerCase().includes(m.toLowerCase()) ||
            site.country.toLowerCase().includes(m.toLowerCase()) ||
            site.id.toLowerCase().includes(m.toLowerCase())
        );

        const glowMaterial = glow.material as THREE.MeshBasicMaterial;
        const markerMaterial = marker.material as THREE.MeshBasicMaterial;

        if (isHighlighted) {
          glowMaterial.opacity += (0.9 - glowMaterial.opacity) * 0.1;
          markerMaterial.color.lerp(new THREE.Color(0xF1D088), 0.1);
          const scale = 1.5 + Math.sin(Date.now() * 0.005) * 0.3;
          marker.scale.setScalar(scale);
          glow.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.2);
        } else {
          glowMaterial.opacity += (0 - glowMaterial.opacity) * 0.1;
          marker.scale.setScalar(1);
          const color = countryColors[site.country] || 0xF1D088;
          markerMaterial.color.lerp(new THREE.Color(color), 0.1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = state;

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(state.animId);
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHoverSite]);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.autoRotate = autoRotateEnabled;
    }
  }, [autoRotateEnabled]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 400, fontFamily: CJK_FONT_FAMILY }}>
      <div ref={containerRef} className="w-full h-full cursor-grab" />

      <button
        onClick={() => setAutoRotateEnabled(prev => !prev)}
        className="absolute z-10 flex items-center gap-2"
        style={{ top: 12, left: 12 }}
      >
        <div
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            background: autoRotateEnabled
              ? "rgba(52, 199, 89, 0.9)"
              : "rgba(120, 120, 128, 0.32)",
            padding: 2,
            cursor: "pointer",
            transition: "background 0.25s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              transform: autoRotateEnabled ? "translateX(20px)" : "translateX(0px)",
              transition: "transform 0.25s ease",
            }}
          />
        </div>
        <span style={{
          color: "rgba(193, 250, 248, 0.6)",
          fontSize: "0.65rem",
          userSelect: "none",
        }}>
          自动旋转
        </span>
      </button>

      {markerTooltip && (
        <div
          className="pointer-events-none absolute z-10 px-3 py-2 rounded-lg text-xs whitespace-nowrap"
          style={{
            left: markerTooltip.x + 14,
            top: markerTooltip.y - 36,
            background: "rgba(10, 10, 26, 0.88)",
            border: "1px solid rgba(241, 208, 136, 0.45)",
            color: "#F1D088",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 14px rgba(241, 208, 136, 0.18)",
          }}
        >
          <span style={{ opacity: 0.6, marginRight: 4 }}>📍</span>
          <strong>{markerTooltip.site.name}</strong>
          <span style={{ opacity: 0.55, marginLeft: 6 }}>{markerTooltip.site.country}</span>
        </div>
      )}
    </div>
  );
}
