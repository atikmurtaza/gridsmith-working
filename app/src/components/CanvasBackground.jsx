import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import GridsmithLogo from './GridsmithLogo';

export default function CanvasBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-bg-dark">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#f3e5ab" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#cd7f32" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <GridsmithLogo />
        </Float>

        <Sparkles count={100} scale={12} size={2} speed={0.4} color="#d4af37" opacity={0.2} />

        <Environment preset="city" />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.2} />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
