import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPHERES = [
  // Group 1 (Left Structure)
  [-1.5, 1.5, 0],   // 0: top-left
  [0.5, 1.5, 0],    // 1: top-center
  [-1.5, -0.5, 0],  // 2: bottom-left
  [0.5, -0.5, 0],   // 3: center-right

  // Group 2 (Right Structure)
  [-0.5, 0.5, 0],   // 4: middle-left
  [1.5, 0.5, 0],    // 5: middle-right
  [1.5, -1.5, 0],   // 6: bottom-right
  [-0.5, -1.5, 0],  // 7: bottom-left
];

const CYLINDERS = [
  // Group 1 Connections
  { start: 0, end: 1 }, // top horizontal
  { start: 0, end: 2 }, // left vertical
  { start: 2, end: 3 }, // lower horizontal

  // Group 2 Connections
  { start: 4, end: 5 }, // middle horizontal
  { start: 5, end: 6 }, // right vertical
  { start: 6, end: 7 }, // bottom horizontal
];

export default function GridsmithLogo() {
  const groupRef = useRef();
  const spheresRef = useRef([]);
  const cylindersRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const triggerEl = document.getElementById('main-scroll-container');
      if (!triggerEl) return;

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrub
          }
        });

        spheresRef.current.forEach((sphere, i) => {
          if (!sphere) return;
          const startPos = SPHERES[i];
          
          const randomX = startPos[0] + (Math.random() - 0.5) * 10;
          const randomY = startPos[1] + (Math.random() - 0.5) * 10;
          const randomZ = startPos[2] + (Math.random() - 0.5) * 10;

          tl.to(sphere.position, {
            x: randomX,
            y: randomY,
            z: randomZ,
            ease: "power2.inOut",
          }, 0);

          tl.to(sphere.position, {
            x: startPos[0],
            y: startPos[1],
            z: startPos[2],
            ease: "power2.inOut",
          }, 0.6);
        });

        cylindersRef.current.forEach((cyl, i) => {
          if (!cyl) return;
          
          const randomX = (Math.random() - 0.5) * 15;
          const randomY = (Math.random() - 0.5) * 15;
          const randomZ = (Math.random() - 0.5) * 15;
          
          const randomRotX = Math.random() * Math.PI * 4;
          const randomRotY = Math.random() * Math.PI * 4;

          tl.to(cyl.position, {
            x: "+=" + randomX,
            y: "+=" + randomY,
            z: "+=" + randomZ,
            ease: "power2.inOut",
          }, 0);
          
          tl.to(cyl.rotation, {
            x: randomRotX,
            y: randomRotY,
            ease: "power2.inOut",
          }, 0);

          const connection = CYLINDERS[i];
          const p1 = new THREE.Vector3(...SPHERES[connection.start]);
          const p2 = new THREE.Vector3(...SPHERES[connection.end]);
          const center = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

          tl.to(cyl.position, {
            x: center.x,
            y: center.y,
            z: center.z,
            ease: "power2.inOut",
          }, 0.6);

          tl.to(cyl.rotation, {
            x: 0,
            y: 0,
            z: p1.x === p2.x ? 0 : Math.PI / 2,
            ease: "power2.inOut",
          }, 0.6);
        });

        tl.to(groupRef.current.rotation, {
          y: Math.PI * 2,
          x: Math.PI / 4,
          ease: "none",
        }, 0);
        
        tl.to(groupRef.current.rotation, {
          y: Math.PI * 4,
          x: 0,
          ease: "power2.inOut",
        }, 0.6);

      }, groupRef);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Ambient slight rotation even without scroll
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const material = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2,
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      {/* Spheres */}
      {SPHERES.map((pos, i) => (
        <mesh 
          key={`sphere-${i}`} 
          position={pos} 
          ref={el => spheresRef.current[i] = el}
          material={material}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.3, 32, 32]} />
        </mesh>
      ))}

      {/* Connecting Cylinders */}
      {CYLINDERS.map((conn, i) => {
        const p1 = new THREE.Vector3(...SPHERES[conn.start]);
        const p2 = new THREE.Vector3(...SPHERES[conn.end]);
        const distance = p1.distanceTo(p2);
        const center = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        // If x is same, it's vertical. If y is same, it's horizontal.
        const isHorizontal = p1.y === p2.y;
        
        return (
          <mesh
            key={`cyl-${i}`}
            position={center}
            rotation={[0, 0, isHorizontal ? Math.PI / 2 : 0]}
            ref={el => cylindersRef.current[i] = el}
            material={material}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.12, 0.12, distance, 16]} />
          </mesh>
        );
      })}
    </group>
  );
}
