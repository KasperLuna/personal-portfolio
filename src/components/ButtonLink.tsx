import Link from "next/link";
import { type ReactElement } from "react";

export const ButtonLink = (props: { icon: ReactElement; href: string }) => {
  const { icon, href } = props;
  return (
    <Link
      type="button"
      role="link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="m-2 inline-flex items-center rounded-xl bg-slate-200 p-2.5 hover:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-slate-800 dark:fill-black dark:hover:bg-slate-700 dark:focus:ring-gray-500"
    >
      {icon}
    </Link>
  );
};
