//Logos
import { CreateevLogo } from "~/assets/CreateevLogo";
import { KasperBoxLogo } from "~/assets/KasperBoxLogo";
import { FundsLogo } from "~/assets/FundsLogo";
import { ZeroTierLogo } from "~/assets/ZeroTierLogo";

import Image from "next/image";
import { Tooltip } from "~/components/Tooltip";
import { ButtonLink } from "~/components/ButtonLink";
import { GithubIcon } from "~/assets/GithubIcon";
import { ExternalLinkIcon } from "~/assets/ExternalLinkIcon";
import { ToothIcon } from "~/assets/ToothIcon";
import { PlanningPokerLogo } from "~/assets/PlanningPokerLogo";

const ProjectList: ProjectWrapperProps[] = [
  {
    title: "Planning Poker",
    tag: "Planning Poker App",
    image: (
      <PlanningPokerLogo className="w-[250px] h-[250px]" />
    ),
    description:
      "A planning poker app built with Tailwind, Next.js, and Firebase. I built this to help my team with our planning poker sessions. Enables our team to vote on tasks and see the results in real time.",
    gitLink: "https://github.com/KasperLuna/planning-poker",
    openToolTip: "Open in new tab",
    openLink: "https://planning-poker.kasperluna.com/",
  },
  {
    title: "ZeroTier Monitor",
    tag: "System Monitor",
    image: <ZeroTierLogo className="w-[250px]" />,
    description:
      "A simple monitor using the ZeroTier API to track network node statuses. As Zerotier is always enabled in my machines, I can simply identify status in the browser. Built with Next.js.",
    gitLink: "https://github.com/KasperLuna/zerotierapi-next",
  },
  {
    title: "Funds",
    tag: "Finance Tracker",
    image: (
      <FundsLogo className="h-[250px] w-[250px] fill-black dark:fill-white" />
    ),
    description:
      "An ongoing project currently using Next.js with Firebase for backend operations and Mantine for styling. Meant to satisfy my own needs for a personal finance tracker",
    gitLink: "https://github.com/KasperLuna/Funds",
    openToolTip: "Open in new tab",
    openLink: "https://funds.kasperluna.com/",
  },
  {
    title: "This Site",
    tag: "Portfolio Site",
    image: (
      <KasperBoxLogo className="h-[250px]  w-[300px] fill-black dark:fill-white" />
    ),
    description:
      "An ongoing project currently using TailwindCSS for styling, RadixUI for accessibility, and Next.js. In the past, using ChakraUI and Framer motion.",
    gitLink: "https://github.com/KasperLuna/personal-portfolio",
    openToolTip: "Open in new tab",
    openLink: "https://kasperluna.com/",
  },
  {
    title: "Pain Care",
    tag: "Dental Record Management System",
    image: (
      <div
      //width="250px" height={"240px"}
      >
        <div
        // mt={"40px"} ml={"38px"}
        >
          <ToothIcon className="h-[250px] w-[250px] fill-black dark:fill-white" />
        </div>
      </div>
    ),
    description:
      "Developed backend processes for the Pain Care System, utilizing Node.js, Express.js, and PostgreSQL to serve templated pages used for dental record management.",
  },
  {
    title: "Dealcrafter",
    tag: "Internal Inventory Management",
    image: (
      <div className="h-[250px] w-[250px]">
        <Image
          alt={"Dealcrafter"}
          src="/dealcrafter.webp"
          width={280}
          height={280}
        />
      </div>
    ),
    description:
      "Developed backend processes for the internal Dealcrafter site, utilizing Node.js, Express.js, PostgreSQL, and Redis to serve templated pages used for inventory management.",
    gitLink: "https://github.com/KasperLuna/Dealcrafter",
  },
  {
    title: "Createev",
    tag: "e-Commerce Concept Site",
    image: <CreateevLogo className="w-[250px] fill-black dark:fill-white" />,
    description:
      "Developed backend processes for the Createev e-commerce concept site. Utilizing Node.js, Express.js and a MySQL database to serve templated pages for e-commerce.",
    gitLink: "https://github.com/KasperLuna/Createev-Concept",
  },
];

type SubIconsProps = {
  gitLink?: string;
  openLink?: string;
  openToolTip?: string;
  title: string;
};

function SubIcons(props: SubIconsProps) {
  return (
    <div>
      {props.gitLink ? (
        <Tooltip
          text="Browse the Github Repo"
          aria-label={`Tooltip for opening Github Repo for ${props.title}`}
        >
          <ButtonLink
            href={props.gitLink}
            ariaLabel={`Open Github Repo for ${props.title}`}
            icon={<GithubIcon className="h-6 w-6 fill-black dark:fill-white" />}
          />
        </Tooltip>
      ) : (
        <></>
      )}
      {props.openLink && props.openToolTip ? (
        <Tooltip
          text={props.openToolTip}
          aria-label={`Tooltip for opening ${props.title} in a new tab`}
        >
          <ButtonLink
            href={props.openLink}
            ariaLabel={`Open ${props.title} in a new tab`}
            icon={
              <ExternalLinkIcon className="h-6 w-6 fill-black dark:fill-white" />
            }
          />
        </Tooltip>
      ) : (
        <div style={{ height: "40px" }}></div>
      )}
    </div>
  );
}

type ProjectWrapperProps = {
  title: string;
  tag: string;
  description: string;
  gitLink?: string;
  openLink?: string;
  openToolTip?: string;
  image: JSX.Element;
};

function ProjectWrapper(props: ProjectWrapperProps) {
  return (
    <div className="animate-scale mx-2 mb-5 max-w-[350px] self-center rounded-3xl border-2 border-solid border-slate-300 border-opacity-20 text-center shadow-md backdrop-blur-lg dark:border-white dark:border-opacity-20">
      <div className="flex flex-col items-center py-4 px-1">
        <h1 className="text-xl font-semibold text-slate-600 dark:text-slate-200">
          {props.title}
        </h1>
        <h2 className="text-base text-slate-600 dark:text-slate-200">
          {props.tag}
        </h2>
        {props.image}
      </div>
      <div className="flex max-h-[240px] min-h-[240px] flex-col items-center justify-between rounded-b-3xl bg-slate-100 py-4 dark:bg-slate-800">
        <div className="min-w-[200px] p-4">
          <p className=" text-slate-600 dark:text-slate-200">
            {props.description}
          </p>
        </div>
        <SubIcons
          title={props.title}
          gitLink={props.gitLink}
          openLink={props.openLink}
          openToolTip={props.openToolTip}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div
      id={"Projects"}
      className="doodleBackground dark:doodleBackgroundDark flex flex-col bg-center bg-blur pt-14 text-center dark:bg-slate-900"
    >
      <div className="flex flex-col gap-4 px-5">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          My Projects and Tools
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400">
          I&apos;ve worked on a few things, feel free to check my repositories!
        </h2>
      </div>
      <div className="flex w-[90%] flex-wrap justify-center gap-4 self-center pt-6">
        {ProjectList.map((project) => (
          <ProjectWrapper
            key={project.title}
            title={project.title}
            tag={project.tag}
            description={project.description}
            gitLink={project.gitLink}
            openLink={project.openLink}
            openToolTip={project.openToolTip}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}
