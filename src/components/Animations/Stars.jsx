import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import gsap from "gsap";

function StarsInner({
  count = 700,
  speed = 0.02,
  size = 0.8,
  depth = 200,
  starColor = "#ffffff",
}) {
  const pointsRef = useRef();

  // generate random positions once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 0] = (Math.random() - 0.5) * 300;
      pos[i3 + 1] = (Math.random() - 0.5) * 180;
      pos[i3 + 2] = -Math.random() * depth;
    }
    return pos;
  }, [count, depth]);

  // animate stars slowly drifting forward
  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += speed; // move in z
      if (positions[i + 2] > 0) {
        positions[i + 2] = -depth;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // subtle twinkle effect with gsap
  useEffect(() => {
    if (pointsRef.current) {
      gsap.to(pointsRef.current.material, {
        opacity: 0.6,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={starColor}
        size={size}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function StarfieldBackground() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", border: "1px white" }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      <StarsInner />
    </Canvas>
  );
}
