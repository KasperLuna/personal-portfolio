import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

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
  iconColor?: string; // Optional property for icon color
}

export async function fetchProjects(): Promise<Project[]> {
  const entries = await client.getEntries({ content_type: 'portfolioProject' });
  const projects = entries.items.map((item) => {
    const fields = item.fields;
    return {
      title: typeof fields.title === 'string' ? fields.title : '',
      description: typeof fields.description === 'string' ? fields.description : '',
      displayImage:
        typeof fields.displayImage === 'object' &&
        fields.displayImage !== null &&
        'fields' in fields.displayImage &&
        typeof fields.displayImage.fields === 'object' &&
        fields.displayImage.fields !== null &&
        'file' in fields.displayImage.fields
          ? (fields.displayImage.fields as { file?: { url?: string } }).file?.url || ''
          : '',
      projectUrl: typeof fields.projectUrl === 'string' ? fields.projectUrl : '',
      codeUrl: typeof fields.codeUrl === 'string' ? fields.codeUrl : '',
      techStack: Array.isArray(fields.techStack) ? fields.techStack as string[] : [],
      isMonochrome: fields.isMonochrome === true,
    };
  });

  return projects.filter((project) => project.title && project.description);


}

export async function fetchSkills(): Promise<Skill[]> {
  const entries = await client.getEntries({ content_type: 'portfolioSkill' });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  return entries.items.map((item) => {
    const fields = item.fields;
    return {
      name: typeof fields.name === 'string' ? fields.name : '',
      category: typeof fields.category === 'string' ? fields.category : '',
      icon:
        fields.icon &&
        typeof fields.icon === 'object' &&
        'fields' in fields.icon &&
        fields.icon.fields &&
        typeof fields.icon.fields === 'object' &&
        'file' in fields.icon.fields &&
        fields.icon.fields.file &&
        typeof fields.icon.fields.file === 'object' &&
        'url' in fields.icon.fields.file
          ? (fields.icon.fields.file as { url?: string }).url || ''
          : '',
        iconColor: typeof fields.iconColor === 'string' ? fields.iconColor : undefined
    };
  });
}

export type Event = {
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  eventLocation: string;
  eventExpectations: string;
  eventMapSrc: string;
};

export async function getEventBySlug(
  slug: string,
  contentType = "event",
): Promise<Event | null> {
  const entries = await client.getEntries({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
  });

  const item = entries.items[0];
  if (!item) return null;

  if (item.fields.slug !== slug) return null;

  const fields = item.fields as unknown as Event;
  return {
    eventTitle: fields.eventTitle,
    eventDescription: fields.eventDescription,
    eventDate: new Date(fields.eventDate),
    eventLocation: fields.eventLocation,
    eventExpectations: fields.eventExpectations,
    eventMapSrc: fields.eventMapSrc,
  };
}
