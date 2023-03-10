import React from "react";
import { ButtonLink } from "~/components/ButtonLink";
import { Tooltip } from "~/components/Tooltip";
import { GithubIcon } from "~/assets/GithubIcon";
import { LinkedInIcon } from "~/assets/LinkedInIcon";
import { DropdownMenu } from "~/components/DropdownMenu";

export const Links = ["About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  return (
    <>
      <nav className="border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="inline-flex items-center">
            <Tooltip text="Check out my Github!">
              <ButtonLink
                icon={
                  <GithubIcon className="h-6 w-6 fill-black dark:fill-white" />
                }
                ariaLabel="Kasper's Github"
                href={"https://github.com/KasperLuna"}
              />
            </Tooltip>
            <Tooltip text="Connect with me on LinkedIn!">
              <ButtonLink
                icon={<LinkedInIcon />}
                ariaLabel="Kasper's LinkedIn"
                href={"https://www.linkedin.com/in/kasperluna/"}
              />
            </Tooltip>
          </div>
          <div className="md:hidden">
            <DropdownMenu />
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
              {Links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
