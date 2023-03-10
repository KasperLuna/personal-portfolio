import Image from "next/image";
import { useState } from "react";
import { ArrowIcon } from "~/assets/ArrowIcon";
import { HatIcon } from "~/assets/HatIcon";
import { PeopleIcon } from "~/assets/PeopleIcon";
import { StackIcon } from "~/assets/StackIcon";

const features = [
  {
    name: "Full Stack Developer",
    description:
      "With a particular focus on Frontend Development, I've utilized React.js (Next.js), PostgreSQL, Express.js, and Node.js to full effect.",
    icon: StackIcon,
  },
  {
    name: "Project Management",
    description:
      "I've handled my teams to push projects forward from conceptualization all the way through development and delivery.",
    icon: HatIcon,
  },
  {
    name: "Team Oriented",
    description:
      "I firmly believe that learning and working closely with others is the surefire way to become a better worker. I love building things!",
    icon: PeopleIcon,
  },
];

export default function About() {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [perspective, setPerspective] = useState(500);
  const width = 470;
  const height = 547;
  return (
    <div
      id="About"
      className="overflow-hidden bg-white py-11 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl justify-center px-6 pb-10 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col-reverse justify-center gap-9 sm:max-w-2xl sm:flex-col-reverse lg:max-w-none lg:flex-row">
          <div className="lg:max-w-lg">
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Hi, I&apos;m Kasper.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              I&apos;m a full stack software engineer based in Manila, and an
              honors graduate of B.S. Information Systems at the University of
              Santo Tomas.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-gray-300">
                    <div
                      className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    >
                      <feature.icon />
                    </div>
                    {feature.name}{" "}
                  </dt>
                  <dd className="inline text-slate-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            id="face"
            className="hover:animate-scale active:animate-shrink animate-scale-loop-smooth
             cursor-pointer select-none"
            onMouseOver={() => {
              const face = document.getElementById("face");
              face?.classList.remove("animate-scale-loop-smooth");
              const arrow = document.getElementById("arrow");
              arrow?.classList.add("fade-out");
            }}
            onMouseMove={(e) => {
              setYRotation(15 * ((e.nativeEvent.offsetX - width / 2) / width));
              setXRotation(
                -15 * ((e.nativeEvent.offsetY - height / 2) / height)
              );
              setPerspective(1000);
            }}
            onMouseLeave={() => {
              setYRotation(0);
              setXRotation(0);
              setPerspective(500);
            }}
          >
            <Image
              src="/face.webp"
              alt="Kasper Luna's Graduation Photo"
              className="pointer-events-none mx-auto rounded-3xl shadow-xl sm:mx-auto lg:mx-0"
              width={470}
              style={{
                transform: `perspective(${perspective}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
              }}
              height={547}
            />

            <div id={"arrow"}>
              <ArrowIcon className=" absolute h-12 w-12 translate-x-[15rem] translate-y-2 transform fill-black dark:fill-white" />
              <small className="absolute translate-x-[17rem] translate-y-1 rotate-[6deg] transform font-thin text-gray-900 dark:text-gray-300">
                hover me!
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
