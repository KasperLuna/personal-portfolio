"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Float, Environment, ContactShadows } from "@react-three/drei"
import type { Group } from "three"
import { useTheme } from "next-themes"

function Model({ isDarkMode }: { isDarkMode: boolean }) {
  const group = useRef<Group>(null)
  // const { nodes } = useGLTF("/models/abstract_shape.glb") as any
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
        {/* <mesh geometry={nodes.Cube.geometry} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color={isDarkMode ? "#8b5cf6" : "#a78bfa"}
            roughness={0.5}
            metalness={0.8}
            envMapIntensity={0.8}
          />
        </mesh> */}
      </group>
    </Float>
  )
}

export default function HeroModel() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Model isDarkMode={isDarkMode} />
      <Environment preset="city" />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={1.5} far={4.5} />
    </Canvas>
  )
}
