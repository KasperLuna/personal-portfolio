import { fetchSkills } from "@/lib/contentful"
import { Suspense } from "react"
import SkillsClient from "./skills-client"

export const revalidate = 86400 // 24 hours in seconds

export default async function Skills() {
  const skills = await fetchSkills()
  return <Suspense fallback={<div>Loading skills...</div>}>
    <SkillsClient skills={skills} />
  </Suspense>
}
