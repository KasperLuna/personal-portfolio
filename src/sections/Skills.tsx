import { ChakraUIIcon } from "~/assets/ChakraUIIcon";
import { CSSIcon } from "~/assets/CSSIcon";
import { ExpressIcon } from "~/assets/ExpressIcon";
import { FramerIcon } from "~/assets/FramerIcon";
import { GithubIcon } from "~/assets/GithubIcon";
import { HTMLIcon } from "~/assets/HTMLIcon";
import { MaterialUIIcon } from "~/assets/MaterialUIIcon";
import { NextIcon } from "~/assets/NextIcon";
import { NodeJsIcon } from "~/assets/NodeJsIcon";
import { ReactIcon } from "~/assets/ReactIcon";
import { TailwindIcon } from "~/assets/TailwindIcon";
import { ButtonLink } from "~/components/ButtonLink";
import { Tooltip } from "~/components/Tooltip";
import { PHPIcon } from "~/assets/PHPIcon";
import { RedisIcon } from "~/assets/RedisIcon";
import { PostgresIcon } from "~/assets/PostgresIcon";
import { MySQLIcon } from "~/assets/MySQLIcon";
import { FirebaseIcon } from "~/assets/FirebaseIcon";
import { GitIcon } from "~/assets/GitIcon";
import { AzureIcon } from "~/assets/AzureIcon";
import { HerokuIcon } from "~/assets/HerokuIcon";
import { GoogleCloudIcon } from "~/assets/GoogleCloudIcon";
import { NetlifyIcon } from "~/assets/NetlifyIcon";
import { VercelIcon } from "~/assets/VercelIcon";

const FrontendSkills = [
  {
    title: "HTML5",
    icon: <HTMLIcon className="h-12 w-12 fill-[#dd4b25]" />,
    link: "https://html.com/html5/",
  },
  {
    title: "CSS3",
    icon: <CSSIcon className="h-12 w-12 fill-[#264de4]" />,
    link: "https://www.w3.org/Style/CSS/Overview.en.html",
  },
  {
    title: "React.js",
    icon: <ReactIcon className="h-12 w-12 stroke-[#61dafb]" />,
    link: "https://reactjs.org",
  },
  {
    title: "Next.js",
    icon: <NextIcon className="h-12 w-12 fill-black dark:fill-white" />,
    link: "https://nextjs.org",
  },
  {
    title: "Chakra UI",
    icon: <ChakraUIIcon className="h-12 w-12 fill-[#56c8c7]" />,
    link: "https://chakra-ui.com",
  },
  {
    title: "Material UI (MUI)",
    icon: <MaterialUIIcon className="h-12 w-12 fill-[#007fff]" />,
    link: "https://mui.com",
  },
  {
    title: "Framer Motion",
    icon: <FramerIcon className="h-12 w-12 fill-black dark:fill-white" />,
    link: "https://www.framer.com/",
  },
  {
    title: "Tailwind CSS",
    icon: <TailwindIcon className="h-12 w-12 fill-[#07B1CF]" />,
    link: "https://www.tailwindcss.com/",
  },
];

const BackendSkills = [
  {
    title: "Node.js",
    icon: <NodeJsIcon className="h-12 w-12 fill-[#23b45d]" />,
    link: "https://nodejs.org/en/",
  },
  {
    title: "Express.js",
    icon: <ExpressIcon className="h-12 w-12 fill-black dark:fill-white" />,
    link: "https://expressjs.com",
  },
  {
    title: "PHP",
    icon: <PHPIcon className="h-12 w-12 fill-[#787cb4]" />,
    link: "https://www.php.net",
  },
  {
    title: "Redis",
    icon: <RedisIcon className="h-12 w-12 fill-[#d82c20]" />,
    link: "https://redis.io",
  },
  {
    title: "PostgreSQL",
    icon: <PostgresIcon className="h-12 w-12 fill-[#336791] stroke-1" />,
    link: "https://www.postgresql.org",
  },
  {
    title: "MySQL",
    icon: <MySQLIcon className="h-12 w-12 fill-[#f57900] stroke-1" />,
    link: "https://www.mysql.com",
  },
  {
    title: "Firebase",
    icon: <FirebaseIcon className="h-12 w-12 fill-[#4db33d]" />,
    link: "https://firebase.google.com",
  },
];

const DeploymentSkills = [
  {
    title: "Git",
    icon: <GitIcon className="h-12 w-12 fill-[#f05033]" />,
    link: "https://git-scm.com",
  },
  {
    title: "Github",
    icon: <GithubIcon className="h-12 w-12 fill-black dark:fill-white" />,
    link: "https://github.com",
  },
  {
    title: "Microsoft Azure",
    icon: <AzureIcon className="h-12 w-12 fill-[#008ad7]" />,
    link: "https://azure.microsoft.com/en-us/",
  },
  {
    title: "Heroku",
    icon: <HerokuIcon className="h-12 w-12 fill-[#6762a5]" />,
    link: "https://www.heroku.com",
  },
  {
    title: "Google Cloud Platform",
    icon: <GoogleCloudIcon className="h-12 w-12" />,
    link: "https://cloud.google.com",
  },
  {
    title: "Netlify",
    icon: <NetlifyIcon className="h-12 w-12 fill-[#38aeba]" />,
    link: "https://www.netlify.com",
  },
  {
    title: "Vercel",
    icon: <VercelIcon className="h-12 w-12 fill-black dark:fill-white" />,
    link: "https://vercel.com",
  },
];

const AllSkills = [
  {
    title: "Frontend",
    array: FrontendSkills,
  },
  {
    title: "Backend",
    array: BackendSkills,
  },
  {
    title: "Deployment",
    array: DeploymentSkills,
  },
];

type SkillProps = {
  key?: string;
  title: string;
  icon: JSX.Element;
  link: string;
};

function SkillIcon(props: SkillProps) {
  return (
    <Tooltip text={props.title}>
      <ButtonLink
        icon={props.icon}
        ariaLabel={`Link to ${props.title}`}
        href={props.link}
        className="m-2 inline-flex items-center rounded-full bg-slate-200 p-2.5 hover:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-slate-800 dark:fill-black dark:hover:bg-slate-700 dark:focus:ring-gray-500"
      />
    </Tooltip>
  );
}

type SkilGroupProps = {
  title: string;
  array: SkillProps[];
};

function SkillGroup({ title, array }: SkilGroupProps) {
  return (
    <div>
      <div className="hover:animate-scale mt-5 w-fit rounded-xl border border-slate-300  px-5 shadow-md dark:border-slate-200 sm:w-auto md:min-w-[730px]">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-cyan-900 dark:text-cyan-400">
            {title}
          </h1>
          <div className="relative justify-center gap-6">
            {array.map((skill) => {
              return (
                <SkillIcon
                  key={skill.title}
                  title={skill.title}
                  icon={skill.icon}
                  link={skill.link}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div
      id="Skills"
      className="doodleBackground dark:doodleBackgroundDark flex flex-col place-items-center content-center overflow-hidden bg-auto bg-center px-5 pb-48 pt-40 text-center backdrop-filter dark:bg-slate-900 sm:px-5 md:px-10"
    >
      <div className="flex flex-col gap-4">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Technical Skills
        </h1>
        <h2 className="text-xl text-slate-900 dark:text-slate-100">
          Here&apos;s some of the tricks I&apos;ve picked up along the way.
        </h2>
      </div>
      {AllSkills.map((group) => {
        return (
          <SkillGroup
            key={group.title}
            title={group.title}
            array={group.array}
          />
        );
      })}
    </div>
  );
}
