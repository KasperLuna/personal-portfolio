import Link from "next/link";
import { type ReactElement } from "react";

export const ButtonLink = (props: {
  icon: ReactElement;
  href: string;
  className?: string;
}) => {
  const { icon, href, className } = props;
  return (
    <Link
      type="button"
      role="link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      //If there's a className prop, use it, otherwise use the default className
      className={
        className
          ? className
          : "m-2 inline-flex items-center rounded-xl bg-slate-200 p-2.5 hover:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-slate-800 dark:fill-black dark:hover:bg-slate-700 dark:focus:ring-gray-500"
      }
    >
      {icon}
    </Link>
  );
};
