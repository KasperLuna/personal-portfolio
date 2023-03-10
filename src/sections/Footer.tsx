import React from "react";
import { ButtonLink } from "~/components/ButtonLink";
import { Tooltip } from "~/components/Tooltip";
import { GithubIcon } from "~/assets/GithubIcon";
import { LinkedInIcon } from "~/assets/LinkedInIcon";
import { KasperBoxLogo } from "~/assets/KasperBoxLogo";

export const Links = ["About", "Skills", "Projects", "Contact"];

export default function Footer() {
  return (
    <nav className="justify-self-end border-gray-200 bg-transparent px-2 py-2.5">
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-between gap-3 sm:flex-row">
        <KasperBoxLogo className="w-40 fill-black dark:fill-white" />
        <h3 className="text-slate-600 dark:text-slate-200">
          © 2023 Kasper Luna. All rights reserved
        </h3>
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
      </div>
    </nav>
  );
}
