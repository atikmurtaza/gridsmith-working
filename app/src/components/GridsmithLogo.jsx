import React, { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPHERES = [
  [-2, 1, 0],
  [0, 1, 0],
  [-2, 0, 0],
  [0, 0, 0],
  [2, 0, 0],
  [2, -1, 0],
  [0, -1, 0],
];

const CYLINDERS = [
  { start: 0, end: 1 },
  { start: 0, end: 2 },
  { start: 2, end: 3 },
  { start: 3, end: 4 },
  { start: 4, end: 5 },
  { start: 5, end: 6 },
];

export default function GridsmithLogo() {
  const groupRef = useRef();
  const spheresRef = useRef([]);
  const cylindersRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
        }
      });

      // 0% -> 30%: Disassemble
      // 30% -> 70%: Float chaotically
      // 70% -> 100%: Reassemble

      spheresRef.current.forEach((sphere, i) => {
        if (!sphere) return;
        const startPos = SPHERES[i];
        
        // Random drift positions
        const randomX = startPos[0] + (Math.random() - 0.5) * 10;
        const randomY = startPos[1] + (Math.random() - 0.5) * 10;
        const randomZ = startPos[2] + (Math.random() - 0.5) * 10;

        tl.to(sphere.position, {
          x: randomX,
          y: randomY,
          z: randomZ,
          ease: "power2.inOut",
        }, 0); // Start at 0

        // Return to start
        tl.to(sphere.position, {
          x: startPos[0],
          y: startPos[1],
          z: startPos[2],
          ease: "power2.inOut",
        }, 0.6); // Start returning at 60% of scroll
      });

      cylindersRef.current.forEach((cyl, i) => {
        if (!cyl) return;
        
        // Random drift and rotate
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

        // Return to start
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
          z: p1.x === p2.x ? 0 : Math.PI / 2, // Reset original rotation
          ease: "power2.inOut",
        }, 0.6);
      });

      // Overall group rotation for cinematic feel
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

    return () => ctx.revert();
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
