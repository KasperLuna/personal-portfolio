"use client"
import dynamic from "next/dynamic"
const BackgroundScene = dynamic(() => import("./background-scene"), {
  ssr: false,
  loading: () => null,
})
export default function BackgroundSceneClient() {
  return <BackgroundScene />
}
