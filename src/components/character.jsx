// Character.js
import { useRef, useEffect, useState } from "react";
import { PerspectiveCamera, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function Model({ visible }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/newOne1.glb");
  const { actions } = useAnimations(animations, group);

  // Map animations
  const standAnim = animations[1]?.name;
  const hitAnim = animations[2]?.name;
  const walkAnim = animations[3]?.name;

  const [current, setCurrent] = useState(standAnim);

  // Track last scroll position to detect direction
  const lastScrollY = useRef(window.scrollY);

  // Animation switching
  useEffect(() => {
    if (!actions || !current) return;
    Object.values(actions).forEach((a) => a.stop());
    actions[current]?.reset().fadeIn(0.3).play();
  }, [current, actions]);

  useEffect(() => {
    let scrollTimeout;

    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY.current;

      // Always walk while scrolling
      if (walkAnim) {
        setCurrent(walkAnim);
      }

      // Detect scroll direction
      if (isScrollingUp) {
        // Rotate 180° smoothly
        gsap.to(group.current.rotation, {
          y: Math.PI, // 180 deg
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Face forward while scrolling down
        gsap.to(group.current.rotation, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Reset to standing when scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (standAnim) setCurrent(standAnim);

        // Always face forward after stopping
        gsap.to(group.current.rotation, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }, 400);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [walkAnim, standAnim]);

  // Click → hit
  const handleClick = () => {
    if (!hitAnim || !standAnim) return;
    setCurrent(hitAnim);
    setTimeout(() => setCurrent(standAnim), 2000);
  };

  // Animate opacity (fade in)
  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.material) {
          gsap.to(child.material, {
            opacity: visible ? 1 : 0,
            duration: 1,
            ease: "power2.out",
          });
          // make sure transparency is enabled
          child.material.transparent = true;
        }
      });
    }
  }, [visible]);

  return (
    <primitive
      ref={group}
      position={[0, -1, 0]}
      object={scene}
      scale={1.5}
      onClick={handleClick}
    />
  );
}

export default function Character({ progress }) {
  const camerRef = useRef();
  const spotLightRef = useRef();
  const [showModel, setShowModel] = useState(false);
  const [showLight, setShowLight] = useState(false);

  useFrame(() => {
    camerRef.current.lookAt(0, 1, 0);
  });

  useEffect(() => {
    // Delay sequence
    const modelTimer = setTimeout(() => {
      setShowModel(true);
    }, 4000); // model after 4s

    const lightTimer = setTimeout(() => {
      setShowLight(true);
    }, 3500); // spotlight after 4.5s

    return () => {
      clearTimeout(modelTimer);
      clearTimeout(lightTimer);
    };
  }, []);

  // Fade in spotlight intensity
  useEffect(() => {
    if (spotLightRef.current && showLight) {
      gsap.fromTo(
        spotLightRef.current,
        { intensity: 0 },
        { intensity: 100, duration: 0.001, ease: "power2.out" }
      );
    }
  }, [showLight]);

  useEffect(() => {
    const updateCamera = () => {
      if (!camerRef.current) return;
      const positions = [
        [0, 0, 5],
        [2.11, 0.89, 1.28],
        [-0.877, 1.1656, 1.26],
        [0, 1, 2],
        [0, 1, 2],
        [0, 0, 5],
      ];
      if (progress >= 1) {
        gsap.to(camerRef.current.position, {
          duration: 0.1,
          x: 0,
          y: 0,
          z: 5,
          ease: "power1.out",
        });
      } else {
        const segmentProgress = 1 / (positions.length - 1);
        const segmentIndex = Math.floor(progress / segmentProgress);
        const percentage = (progress % segmentProgress) / segmentProgress;
        const [StartX, StartY, StartZ] =
          positions[segmentIndex] || positions[0];
        const [EndX, EndY, EndZ] = positions[segmentIndex + 1] || positions[0];
        const newX = StartX + (EndX - StartX) * percentage;
        const newY = StartY + (EndY - StartY) * percentage;
        const newZ = StartZ + (EndZ - StartZ) * percentage;

        gsap.to(camerRef.current.position, {
          duration: 0.1,
          x: newX,
          y: newY,
          z: newZ,
          ease: "power1.out",
        });
      }
    };
    updateCamera();
  }, [progress]);

  return (
    <>
      <PerspectiveCamera
        ref={camerRef}
        fov={75}
        near={0.1}
        far={1000}
        makeDefault
        position={[0, 0, 5]}
      />
      {/* Soft ambient fill */}
      <ambientLight intensity={0.3} />
      {showLight && (
        <spotLight
          ref={spotLightRef}
          position={[0, 5, 3]}
          angle={0.4}
          penumbra={0.3}
          intensity={0} // start from 0, animate with gsap
          castShadow
          target-position={[0, 0, 0]}
        />
      )}
      {/* Floor to see the spotlight circle */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.01, 0]} // just below character feet
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {showModel && <Model visible={showModel} />}
    </>
  );
}
