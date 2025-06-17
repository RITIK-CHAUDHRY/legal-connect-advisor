
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LegalElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scalesRef = useRef<THREE.Group>(null);
  
  const elements = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.001 + 0.0005,
      rotationSpeed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  const scales = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30,
      ] as [number, number, number],
      scale: Math.random() * 2 + 1,
      speed: Math.random() * 0.0005 + 0.0002,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += elements[i]?.rotationSpeed || 0.01;
        child.rotation.y += (elements[i]?.rotationSpeed || 0.01) * 0.7;
        child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      });
    }

    if (scalesRef.current) {
      scalesRef.current.rotation.y -= 0.0003;
      scalesRef.current.children.forEach((child, i) => {
        child.rotation.z += scales[i]?.speed || 0.001;
        child.position.y += Math.sin(state.clock.elapsedTime * 0.3 + i * 2) * 0.003;
      });
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {elements.map((element, i) => (
          <group key={i} position={element.position}>
            {i % 4 === 0 ? (
              // Legal documents/papers
              <mesh>
                <boxGeometry args={[element.scale * 0.1, element.scale * 1.2, element.scale * 0.8]} />
                <meshPhongMaterial 
                  color="#2563eb"
                  transparent
                  opacity={0.15}
                  emissive="#1e40af"
                  emissiveIntensity={0.1}
                />
              </mesh>
            ) : i % 4 === 1 ? (
              // Gavel head
              <mesh>
                <cylinderGeometry args={[element.scale * 0.3, element.scale * 0.3, element.scale * 0.8, 8]} />
                <meshPhongMaterial 
                  color="#d97706"
                  transparent
                  opacity={0.2}
                  emissive="#92400e"
                  emissiveIntensity={0.1}
                />
              </mesh>
            ) : i % 4 === 2 ? (
              // Law books
              <mesh>
                <boxGeometry args={[element.scale * 0.6, element.scale * 0.8, element.scale * 0.15]} />
                <meshPhongMaterial 
                  color="#059669"
                  transparent
                  opacity={0.18}
                  emissive="#047857"
                  emissiveIntensity={0.1}
                />
              </mesh>
            ) : (
              // Hexagonal badges (legal seals)
              <mesh>
                <cylinderGeometry args={[element.scale * 0.4, element.scale * 0.4, element.scale * 0.1, 6]} />
                <meshPhongMaterial 
                  color="#7c3aed"
                  transparent
                  opacity={0.2}
                  emissive="#5b21b6"
                  emissiveIntensity={0.15}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      <group ref={scalesRef}>
        {scales.map((scale, i) => (
          <group key={`scale-${i}`} position={scale.position}>
            {/* Scale base */}
            <mesh position={[0, -scale.scale * 0.8, 0]}>
              <cylinderGeometry args={[scale.scale * 0.4, scale.scale * 0.4, scale.scale * 0.2, 16]} />
              <meshPhongMaterial 
                color="#1f2937"
                transparent
                opacity={0.1}
                emissive="#374151"
                emissiveIntensity={0.05}
              />
            </mesh>
            {/* Scale pillar */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[scale.scale * 0.05, scale.scale * 0.05, scale.scale * 1.6, 8]} />
              <meshPhongMaterial 
                color="#6b7280"
                transparent
                opacity={0.15}
                emissive="#4b5563"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Scale beam */}
            <mesh position={[0, scale.scale * 0.6, 0]}>
              <boxGeometry args={[scale.scale * 1.2, scale.scale * 0.05, scale.scale * 0.05]} />
              <meshPhongMaterial 
                color="#eab308"
                transparent
                opacity={0.2}
                emissive="#ca8a04"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Left pan */}
            <mesh position={[-scale.scale * 0.5, scale.scale * 0.5, 0]}>
              <cylinderGeometry args={[scale.scale * 0.15, scale.scale * 0.15, scale.scale * 0.03, 16]} />
              <meshPhongMaterial 
                color="#dc2626"
                transparent
                opacity={0.15}
                emissive="#b91c1c"
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Right pan */}
            <mesh position={[scale.scale * 0.5, scale.scale * 0.5, 0]}>
              <cylinderGeometry args={[scale.scale * 0.15, scale.scale * 0.15, scale.scale * 0.03, 16]} />
              <meshPhongMaterial 
                color="#dc2626"
                transparent
                opacity={0.15}
                emissive="#b91c1c"
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, 15, 5]} intensity={0.3} color="#eab308" />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5} 
          color="#06b6d4" 
        />
        <LegalElements />
      </Canvas>
    </div>
  );
};
