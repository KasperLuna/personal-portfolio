"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import * as THREE from "three"

function Particles({ count = 1000, isDarkMode = false }: { count?: number; isDarkMode?: boolean }) {
  const mesh = useRef<THREE.Points>(null)
  const light = useRef<THREE.PointLight>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })

  // Create particles
  const particlesPosition = new Float32Array(count * 3)
  const particlesScale = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particlesPosition[i3] = (Math.random() - 0.5) * 10
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 10
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10
    particlesScale[i] = Math.random()
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1
    const damping = 0.1

    // Smoothly interpolate mouse position
    setMouse((prevMouse) => ({
      x: THREE.MathUtils.lerp(prevMouse.x, targetMouse.current.x, damping),
      y: THREE.MathUtils.lerp(prevMouse.y, targetMouse.current.y, damping),
    }))

    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time / 4) + mouse.y * 0.2
      mesh.current.rotation.y = Math.sin(time / 2) + mouse.x * 0.2
    }

    if (light.current) {
      light.current.position.x = Math.sin(time) * 3 + mouse.x * 1.5
      light.current.position.z = Math.cos(time) * 3
      light.current.position.y = Math.sin(time) * 2 + mouse.y * 1.5
    }
  })

  return (
    <>
      <pointLight ref={light} distance={10} intensity={5} color={isDarkMode ? "#8b5cf6" : "#a78bfa"} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={particlesScale.length}
            array={particlesScale}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color={isDarkMode ? "#8b5cf6" : "#a78bfa"}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default function BackgroundScene() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  )
}
