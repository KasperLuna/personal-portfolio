"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, ContactShadows } from "@react-three/drei"

function Model() {
  const group = useRef<{
    rotation: { x: number; y: number; z: number }
    position: { x: number; y: number; z: number }
  }>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t / 4) / 4
    group.current.rotation.x = Math.sin(t / 4) / 4
    group.current.position.y = (1 + Math.sin(t / 2)) / 10
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group} dispose={null} scale={viewport.width > 768 ? 2 : 1.5}>
        {/* Placeholder for 3D model */}
      </group>
    </Float>
  )
}

export default function HeroModel() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Model />
      <Environment preset="city" />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={1.5} far={4.5} />
    </Canvas>
  )
}
