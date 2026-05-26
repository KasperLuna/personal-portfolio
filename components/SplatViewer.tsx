"use client"

import { useEffect, useRef } from "react"

interface SplatViewerProps {
    mouseRef: React.RefObject<{ x: number; y: number }>
    isHoveringRef: React.RefObject<boolean>
}

// Normalized (0–1) position within the section that maps to zero rotation.
// 0 = left edge, 1 = right edge. Match this to where the splat sits visually.
const NEUTRAL_X = 0.75
const NEUTRAL_Y = 0.5

// Camera & scene config
const BASE_FOV = 35          // vertical FOV (degrees) — telephoto: low distortion, zoomed in
const BASE_ASPECT = 16 / 9  // reference aspect — used only for cover-FOV calculation
const MD_BREAKPOINT = 768   // px — matches Tailwind md; below = mobile layout
const CAMERA_Z = 11          // compensated for FOV halving (5 × tan35°/tan17.5° ≈ 11)
const CAMERA_X = 1.25        // horizontal offset of the camera
const CAMERA_Y = 0.15         // vertical offset of the camera
const SPLAT_SCALE = 13        // uniform scale of the splat model
const SPLAT_X = 2.4          // horizontal world-space offset of the splat (positive = right)
const SPLAT_Y = 0            // vertical world-space offset of the splat (positive = up)
const SPLAT_Z = 0            // depth world-space offset of the splat
const YAW_RANGE = Math.PI    // max yaw rotation (radians) — Math.PI = ±180°
const PITCH_RANGE = Math.PI / 2 // max pitch rotation (radians) — Math.PI/2 = ±90°
const MAX_YAW = Math.PI / 3   // hard clamp on yaw output (radians) — Math.PI/6 = ±30°
const MAX_PITCH = Math.PI / 3  // hard clamp on pitch output (radians) — Math.PI/8 = ±22.5°
const LERP_SPEED = 0.05      // damping factor per frame (0 = frozen, 1 = instant)
// Idle loop — circular pattern amplitude and speed
const IDLE_YAW_AMP = MAX_YAW * 0.5       // half of max yaw
const IDLE_PITCH_AMP = MAX_PITCH * 0.35   // gentler on pitch
const IDLE_SPEED = 0.01                  // radians per frame (~60fps → ~10s per orbit)

export default function SplatViewer({ mouseRef, isHoveringRef }: SplatViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // Tracks the neutral X position (0–1) that maps to zero yaw;
    // updated on resize so it matches where the splat visually sits.
    const neutralXRef = useRef(NEUTRAL_X)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        let rafId: number
        let cancelled = false
        let threeRenderer: import("three").WebGLRenderer | null = null
        let cameraRef: import("three").PerspectiveCamera | null = null

        const run = async () => {
            const THREE = await import("three")
            const { SplatMesh } = await import("@sparkjsdev/spark")

            if (cancelled) return

            const scene = new THREE.Scene()
            const w = canvas.clientWidth
            const h = canvas.clientHeight

            const initAspect = w / h
            const camera = new THREE.PerspectiveCamera(BASE_FOV, initAspect, 0.1, 1000)
            camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z)
            // On mobile (< md) center on the splat; on desktop offset right
            const applyLookAt = (cam: typeof camera, width: number) => {
                if (width < MD_BREAKPOINT) {
                    cam.lookAt(SPLAT_X, SPLAT_Y, SPLAT_Z)
                    neutralXRef.current = 0.5
                } else {
                    cam.lookAt(0, SPLAT_Y, SPLAT_Z)
                    neutralXRef.current = NEUTRAL_X
                }
            }
            applyLookAt(camera, w)
            // Cover: on narrow aspect viewports widen FOV so the scene fills the canvas.
            // Skip on mobile — the canvas is a standalone block, not a background fill;
            // the cover formula would push FOV past 80° and make the splat look tiny.
            if (w >= MD_BREAKPOINT && initAspect < BASE_ASPECT) {
                const baseHalfWidth = Math.tan((BASE_FOV / 2) * (Math.PI / 180)) * BASE_ASPECT
                camera.fov = 2 * Math.atan(baseHalfWidth / initAspect) * (180 / Math.PI)
                camera.updateProjectionMatrix()
            }
            cameraRef = camera

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
            renderer.setPixelRatio(window.devicePixelRatio)
            // false = don't overwrite CSS-driven size
            renderer.setSize(w, h, false)
            threeRenderer = renderer

            // Pivot handles world position + mouse-driven rotation
            const pivot = new THREE.Group()
            pivot.position.set(SPLAT_X, SPLAT_Y, SPLAT_Z)
            scene.add(pivot)

            const splat = new SplatMesh({ url: "/head.sog" })
            splat.scale.setScalar(SPLAT_SCALE)
            // 3DGS PLY uses OpenCV convention (Y-down, Z-forward).
            // THREE.js uses Y-up, Z-toward-viewer. A π rotation around X corrects this.
            splat.rotation.x = Math.PI
            pivot.add(splat)

            let currentYaw = 0
            let currentPitch = 0
            let idleAngle = 0

            const frame = () => {
                if (cancelled) return

                const hovering = isHoveringRef.current ?? false
                let targetYaw: number
                let targetPitch: number

                if (hovering) {
                    const mouse = mouseRef.current ?? { x: 0.5, y: 0.5 }
                    targetYaw = Math.max(-MAX_YAW, Math.min(MAX_YAW,
                        (mouse.x - neutralXRef.current) * YAW_RANGE
                    ))
                    targetPitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH,
                        (mouse.y - NEUTRAL_Y) * PITCH_RANGE
                    ))
                } else {
                    idleAngle += IDLE_SPEED
                    targetYaw = Math.cos(idleAngle) * IDLE_YAW_AMP
                    targetPitch = Math.sin(idleAngle) * IDLE_PITCH_AMP
                }

                // Lerp toward target with damping
                currentYaw += (targetYaw - currentYaw) * LERP_SPEED
                currentPitch += (targetPitch - currentPitch) * LERP_SPEED

                pivot.rotation.set(currentPitch, currentYaw, 0)

                renderer.render(scene, camera)
                rafId = requestAnimationFrame(frame)
            }

            rafId = requestAnimationFrame(frame)
        }

        run()

        const handleResize = () => {
            const c = canvasRef.current
            if (!c || !threeRenderer || !cameraRef) return
            const w = c.clientWidth
            const h = c.clientHeight
            const aspect = w / h
            threeRenderer.setSize(w, h, false)
            cameraRef.aspect = aspect
            // Cover: wider FOV on narrow-aspect viewports so the scene fills canvas width.
            // Skip on mobile — same reason as above.
            if (w >= MD_BREAKPOINT && aspect < BASE_ASPECT) {
                const baseHalfWidth = Math.tan((BASE_FOV / 2) * (Math.PI / 180)) * BASE_ASPECT
                cameraRef.fov = 2 * Math.atan(baseHalfWidth / aspect) * (180 / Math.PI)
            } else {
                cameraRef.fov = BASE_FOV
            }
            // Mobile vs desktop camera direction
            if (w < MD_BREAKPOINT) {
                cameraRef.lookAt(SPLAT_X, SPLAT_Y, SPLAT_Z)
                neutralXRef.current = 0.5
            } else {
                cameraRef.lookAt(0, SPLAT_Y, SPLAT_Z)
                neutralXRef.current = NEUTRAL_X
            }
            cameraRef.updateProjectionMatrix()
        }
        window.addEventListener("resize", handleResize)

        return () => {
            cancelled = true
            cancelAnimationFrame(rafId)
            window.removeEventListener("resize", handleResize)
            threeRenderer?.dispose()
        }
    }, [mouseRef, isHoveringRef])

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-label="Interactive 3D Gaussian splat scene"
        />
    )
}
