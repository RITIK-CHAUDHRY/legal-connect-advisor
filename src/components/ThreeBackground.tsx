
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const elements = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += elements[i].speed;
        child.rotation.y += elements[i].speed * 0.5;
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, i) => (
        <group key={i} position={element.position}>
          {i % 3 === 0 ? (
            <mesh>
              <sphereGeometry args={[element.scale, 8, 8]} />
              <meshPhongMaterial 
                color="#3366cc"
                transparent
                opacity={0.1}
                emissive="#1a2d5c"
              />
            </mesh>
          ) : i % 3 === 1 ? (
            <mesh>
              <boxGeometry args={[element.scale, element.scale, element.scale]} />
              <meshPhongMaterial 
                color="#6633cc"
                transparent
                opacity={0.1}
                emissive="#331a5c"
              />
            </mesh>
          ) : (
            <mesh>
              <octahedronGeometry args={[element.scale, 0]} />
              <meshPhongMaterial 
                color="#cc6633"
                transparent
                opacity={0.1}
                emissive="#5c331a"
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

export const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
        <FloatingElements />
      </Canvas>
    </div>
  );
};
