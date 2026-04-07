"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MOON_TEXTURE = "/about-moon/moon-texture.jpg";
const MOON_DISPLACEMENT = "/about-moon/moon-displacement.jpg";

export function MoonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(MOON_TEXTURE);
    const displacementMap = textureLoader.load(MOON_DISPLACEMENT);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      displacementMap,
      displacementScale: 0.05,
      bumpMap: displacementMap,
      bumpScale: 0.04,
    });
    material.emissive = new THREE.Color("#151829");
    material.emissiveIntensity = 0.5;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const getSize = () => {
      const w =
        typeof window !== "undefined" && window.innerWidth < 800
          ? window.innerWidth
          : window.innerWidth / 2;
      const h = window.innerHeight;
      return { w, h };
    };

    let { w, h } = getSize();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 10, 5);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(25, w / h);
    camera.position.z = 20;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("#151829", 1);
    renderer.setSize(w, h);
    renderer.render(scene, camera);

    scene.add(new THREE.AmbientLight("#151829", 0.8));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;

    const onResize = () => {
      const next = getSize();
      w = next.w;
      h = next.h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    let rafId = 0;
    const loop = () => {
      mesh.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      displacementMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas id="webgl" ref={canvasRef} />
    </div>
  );
}
