import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

// --- Constants & Config ---
const GLOBE_RADIUS = 2;
const ARC_COUNT = 30;
const NODE_COUNT = 60;
const PARTICLE_SPEED = 0.005;

const LABELS = [
  'GST', 'UPI', 'Banking', 'Account Aggregator', 
  'Bureau', 'Financial Statements', 'Alternative Data'
];

// Utility: Generate random point on a sphere surface
const getRandomPointOnSphere = (radius) => {
  const phi = Math.acos( -1 + ( 2 * Math.random() ) );
  const theta = Math.sqrt( NODE_COUNT * Math.PI ) * phi;
  
  const r = radius;
  return new THREE.Vector3(
    r * Math.cos(theta) * Math.sin(phi),
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(phi)
  );
};

// Utility: Create a Bezier curve between two points that arcs outward
const getArcPoints = (pointA, pointB, radius) => {
  const distance = pointA.distanceTo(pointB);
  // Control point is pushed outward from the center relative to the distance between points
  const midPoint = new THREE.Vector3().addVectors(pointA, pointB).multiplyScalar(0.5);
  const controlPoint = midPoint.normalize().multiplyScalar(radius + distance * 0.4);
  
  const curve = new THREE.QuadraticBezierCurve3(pointA, controlPoint, pointB);
  return curve;
};

// --- Subcomponents ---

// 1. Globe Mesh (Wireframe + Core)
function CoreGlobe() {
  return (
    <group>
      {/* Core dark sphere to block lines behind it */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.05, 32, 32]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      
      {/* Wireframe outer sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial 
          color="#5E0ED7" 
          transparent 
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// 2. Network Nodes & Labels
function NetworkNodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }).map(() => getRandomPointOnSphere(GLOBE_RADIUS));
  }, []);

  const labels = useMemo(() => {
    // Select random nodes to attach labels to
    const shuffled = [...nodes].sort(() => 0.5 - Math.random());
    return LABELS.map((text, i) => ({
      text,
      position: shuffled[i].clone().multiplyScalar(1.05) // Slightly offset from surface
    }));
  }, [nodes]);

  return (
    <group>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Floating Labels */}
      {labels.map((lbl, i) => (
        <Html key={i} position={lbl.position} center>
          <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(94,14,215,0.3)] select-none pointer-events-none tracking-widest uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5E0ED7] mr-2 animate-pulse" />
            {lbl.text}
          </div>
        </Html>
      ))}
    </group>
  );
}

// 3. Arcs and Moving Particles
function AnimatedArcs() {
  const arcs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ARC_COUNT; i++) {
      const pointA = getRandomPointOnSphere(GLOBE_RADIUS);
      const pointB = getRandomPointOnSphere(GLOBE_RADIUS);
      const curve = getArcPoints(pointA, pointB, GLOBE_RADIUS);
      
      // We store individual random speeds and offsets for the particles
      arr.push({
        curve,
        points: curve.getPoints(50),
        particleOffset: Math.random(),
        particleSpeed: PARTICLE_SPEED * (0.5 + Math.random()),
        color: Math.random() > 0.5 ? '#5E0ED7' : '#ffffff' // Mix of purple and white arcs
      });
    }
    return arr;
  }, []);

  const particlesRef = useRef([]);

  useFrame(() => {
    arcs.forEach((arc, i) => {
      if (!particlesRef.current[i]) return;
      
      arc.particleOffset += arc.particleSpeed;
      if (arc.particleOffset > 1) arc.particleOffset = 0; // Loop back
      
      const point = arc.curve.getPoint(arc.particleOffset);
      particlesRef.current[i].position.copy(point);
    });
  });

  return (
    <group>
      {arcs.map((arc, i) => (
        <group key={i}>
          {/* Static Arc Line */}
          <Line 
            points={arc.points} 
            color={arc.color} 
            lineWidth={0.5} 
            transparent 
            opacity={0.15} 
          />
          {/* Moving Particle */}
          <mesh ref={(el) => (particlesRef.current[i] = el)}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={arc.color} toneMapped={false} />
            <pointLight color={arc.color} intensity={0.5} distance={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 4. Interactive Scene Wrapper (Handles Mouse Follow)
function Scene() {
  const groupRef = useRef();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto rotation
      groupRef.current.rotation.y += delta * 0.05;
      
      // Interactive mouse follow rotation (subtle)
      const targetX = mouse.y * 0.1;
      const targetY = mouse.x * 0.1;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      // Note: We don't override Y entirely, just add the delta for auto-rotate
    }
  });

  return (
    <group ref={groupRef}>
      <CoreGlobe />
      <NetworkNodes />
      <AnimatedArcs />
    </group>
  );
}

// --- Main Export ---
export default function DataGlobe() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#000000', 4, 10]} />
        <ambientLight intensity={0.5} />
        
        <Scene />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false} // Handled custom in useFrame
        />
      </Canvas>
    </div>
  );
}
