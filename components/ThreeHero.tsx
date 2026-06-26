"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Scene ---------- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* ---------- Materials ---------- */
    const material = new THREE.MeshPhysicalMaterial({
      color: "#d9e8e2",
      roughness: 0.2,
      metalness: 0.42,
      transmission: 0.38,
      thickness: 1.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      emissive: "#114c5a",
      emissiveIntensity: 0.05,
      envMapIntensity: 1.4
    });

    const accent = new THREE.MeshPhysicalMaterial({
      color: "#ffc801",
      roughness: 0.16,
      metalness: 0.65,
      emissive: "#ff9932",
      emissiveIntensity: 0.2,
      clearcoat: 0.5
    });

    /* ---------- Shapes ---------- */
    const shapes = [
      new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 2), material),
      new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.18, 128, 20), accent),
      new THREE.Mesh(new THREE.OctahedronGeometry(0.82, 0), material),
      new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.014, 8, 180), accent)
    ];
    const basePositions = [
      new THREE.Vector3(-0.6, 0.18, 0),
      new THREE.Vector3(1.42, -0.52, -0.25),
      new THREE.Vector3(-1.95, -1.18, -0.8),
      new THREE.Vector3(0, 0, 0)
    ];
    shapes.forEach((s, i) => {
      s.position.copy(basePositions[i]);
      group.add(s);
    });
    shapes[3].rotation.set(Math.PI / 2.8, 0.3, 0.1);

    /* ---------- Glow Sprites ---------- */
    const glowCanvas = createGlowCanvas();
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const glow1Mat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const glow1 = new THREE.Sprite(glow1Mat);
    glow1.scale.set(3.5, 3.5, 1);
    glow1.position.copy(shapes[1].position);
    group.add(glow1);

    const glow2Mat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    const glow2 = new THREE.Sprite(glow2Mat);
    glow2.scale.set(5, 5, 1);
    glow2.position.set(0, 0, -1);
    group.add(glow2);

    /* ---------- Particles ---------- */
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      particleGeom,
      new THREE.PointsMaterial({
        color: "#ffc801",
        size: 0.028,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(particles);

    /* ---------- Lighting ---------- */
    const keyLight = new THREE.PointLight("#ffc801", 28, 16);
    keyLight.position.set(2.5, 2, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight("#114c5a", 14, 12);
    rimLight.position.set(-3, -1, 3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight("#ff9932", 7, 10);
    fillLight.position.set(0, 3, -2);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight("#f1f6f4", 0.7));

    /* ---------- Input tracking ---------- */
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let scrollProgress = 0;

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);

    /* ---------- Animation loop ---------- */
    let frame = 0;
    let animationId = 0;

    const animate = () => {
      frame += reduceMotion ? 0.002 : 0.008;

      // Spring-physics mouse following
      smoothX += (pointerX - smoothX) * 0.04;
      smoothY += (pointerY - smoothY) * 0.04;

      // Group follows mouse
      group.rotation.y += (smoothX * 0.28 - group.rotation.y) * 0.03;
      group.rotation.x += (-smoothY * 0.18 - group.rotation.x) * 0.03;

      // Individual rotations — slow, organic
      shapes[0].rotation.y += 0.004;
      shapes[0].rotation.x += 0.002;
      shapes[1].rotation.x -= 0.006;
      shapes[1].rotation.z += 0.003;
      shapes[2].rotation.z += 0.004;
      shapes[2].rotation.y -= 0.003;

      // Floating — multiple sine waves for organic motion
      shapes[0].position.y =
        basePositions[0].y +
        Math.sin(frame * 1.2) * 0.14 +
        Math.sin(frame * 0.7) * 0.07;
      shapes[0].position.x =
        basePositions[0].x + Math.sin(frame * 0.5) * 0.07;

      shapes[1].position.y =
        basePositions[1].y +
        Math.sin(frame * 1.6 + 1.2) * 0.11 +
        Math.cos(frame * 0.9) * 0.05;
      shapes[1].position.x =
        basePositions[1].x + Math.cos(frame * 0.6) * 0.05;

      shapes[2].position.y =
        basePositions[2].y + Math.sin(frame * 1.0 + 2.4) * 0.09;

      // Scroll parallax — objects drift apart and shrink
      group.position.y = -scrollProgress * 2;
      group.scale.setScalar(1 - scrollProgress * 0.3);

      // Glow follows golden shapes
      glow1.position.copy(shapes[1].position);
      glow2.position.x += (smoothX * 0.5 - glow2.position.x) * 0.02;
      glow2.position.y += (-smoothY * 0.5 - glow2.position.y) * 0.02;

      // Particles gentle drift
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0004;

      // Lights follow mouse
      keyLight.position.x = 2.5 + smoothX * 2;
      keyLight.position.y = 2 - smoothY * 1.5;
      fillLight.position.x = smoothX * -1.5;

      // Fade on scroll
      renderer.domElement.style.opacity = String(
        Math.max(0, 1 - scrollProgress * 0.7)
      );

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };
    animate();

    /* ---------- Cleanup ---------- */
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      shapes.forEach((s) => s.geometry.dispose());
      material.dispose();
      accent.dispose();
      particleGeom.dispose();
      (particles.material as THREE.Material).dispose();
      glowTexture.dispose();
      glow1Mat.dispose();
      glow2Mat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-mount" aria-hidden="true" />;
}

/* ---------- Glow Texture ---------- */
function createGlowCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 200, 1, 0.55)");
  gradient.addColorStop(0.35, "rgba(255, 153, 50, 0.18)");
  gradient.addColorStop(1, "rgba(255, 153, 50, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return canvas;
}
