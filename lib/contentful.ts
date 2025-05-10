import { createClient } from 'contentful';

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

if (!space || !accessToken) {
  throw new Error('Missing Contentful environment variables');
}

const client = createClient({
  space,
  accessToken,
});

export interface Project {
  title: string;
  description: string;
  displayImage: string;
  projectUrl: string;
  codeUrl: string;
  techStack: string[];
}

export interface Skill {
  name: string;
  category: string;
  icon: string; // This will be a URL to the icon asset
}

export async function fetchProjects(): Promise<Project[]> {
  const entries = await client.getEntries({ content_type: 'portfolioProject' });
  return entries.items.map((item: any) => {
    const fields = item.fields;
    return {
      title: fields.title,
      description: fields.description,
      displayImage: fields.displayImage?.fields?.file?.url || '',
      projectUrl: fields.projectUrl,
      codeUrl: fields.codeUrl,
      techStack: fields.techStack || [],
    };
  });
}

export async function fetchSkills(): Promise<Skill[]> {
  const entries = await client.getEntries({ content_type: 'portfolioSkill' });
  return entries.items.map((item: any) => {
    const fields = item.fields;
    return {
      name: fields.name,
      category: fields.category,
      icon: fields.icon?.fields?.file?.url || '',
    };
  });
}
