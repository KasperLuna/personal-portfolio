"use client"

import { useEffect, useRef } from "react"

interface SplatViewerProps {
    mouseRef: React.RefObject<{ x: number; y: number }>
}

// Normalized (0–1) position within the section that maps to zero rotation.
// 0 = left edge, 1 = right edge. Match this to where the splat sits visually.
const NEUTRAL_X = 0.75
const NEUTRAL_Y = 0.5

// Camera & scene config
const CAMERA_Z = -5          // distance from origin — more negative = further away
const CAMERA_X = 1.25            // horizontal offset of the camera
const CAMERA_Y = 0.1            // vertical offset of the camera
const SPLAT_SCALE = 6         // uniform scale of the splat model
const SPLAT_X = 2.5           // horizontal world-space offset of the splat (positive = right)
const SPLAT_Y = 0             // vertical world-space offset of the splat (positive = up)
const SPLAT_Z = 0             // depth world-space offset of the splat
const YAW_RANGE = Math.PI     // max yaw rotation (radians) — Math.PI = ±180°
const PITCH_RANGE = Math.PI / 2 // max pitch rotation (radians) — Math.PI/2 = ±90°
const LERP_SPEED = 0.05       // damping factor per frame (0 = frozen, 1 = instant)

export default function SplatViewer({ mouseRef }: SplatViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        let rafId: number
        let cancelled = false
        let rendererRef: { setSize: (w: number, h: number) => void } | null = null

        const run = async () => {
            const SPLAT = await import("gsplat")

            if (cancelled) return

            const scene = new SPLAT.Scene()
            const camera = new SPLAT.Camera()
            const renderer = new SPLAT.WebGLRenderer(canvas)
            rendererRef = renderer

            renderer.setSize(canvas.clientWidth, canvas.clientHeight)

            // Position camera so the splat is centered and fully visible
            camera.position = new SPLAT.Vector3(CAMERA_X, CAMERA_Y, CAMERA_Z)

            let splat: InstanceType<typeof SPLAT.Splat> | null = null

            try {
                // splat = await SPLAT.Loader.LoadAsync(
                splat = await SPLAT.PLYLoader.LoadAsync(
                    "/head.compressed.ply",
                    scene,
                    () => { },
                )
            } catch {
                // Splat failed to load — canvas stays blank, no crash
                return
            }

            if (cancelled) return

            // Scale up and shift right to mirror the old card position
            splat.scale = new SPLAT.Vector3(SPLAT_SCALE, SPLAT_SCALE, SPLAT_SCALE)
            splat.position = new SPLAT.Vector3(SPLAT_X, SPLAT_Y, SPLAT_Z)

            let currentYaw = 0
            let currentPitch = 0

            const frame = () => {
                if (cancelled) return

                const mouse = mouseRef.current ?? { x: 0.5, y: 0.5 }
                const targetYaw = (NEUTRAL_X - mouse.x) * YAW_RANGE
                const targetPitch = (mouse.y - NEUTRAL_Y) * PITCH_RANGE

                // Lerp toward target with damping
                currentYaw += (targetYaw - currentYaw) * LERP_SPEED
                currentPitch += (targetPitch - currentPitch) * LERP_SPEED

                if (splat) {
                    splat.rotation = SPLAT.Quaternion.FromEuler(
                        new SPLAT.Vector3(currentPitch, currentYaw, 0),
                    )
                }

                renderer.render(scene, camera)
                rafId = requestAnimationFrame(frame)
            }

            rafId = requestAnimationFrame(frame)
        }

        run()

        const handleResize = () => {
            const c = canvasRef.current
            if (!c || !rendererRef) return
            rendererRef.setSize(c.clientWidth, c.clientHeight)
        }
        window.addEventListener("resize", handleResize)

        return () => {
            cancelled = true
            cancelAnimationFrame(rafId)
            window.removeEventListener("resize", handleResize)
        }
    }, [mouseRef])

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-label="Interactive 3D Gaussian splat scene"
        />
    )
}
