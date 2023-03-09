import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import React from "react";
import { MenuIcon } from "~/assets/MenuIcon";
import { Links } from "~/sections/Navbar";

const DropdownMenu = () => {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            aria-label="Expand Menu"
            className="m-2 inline-flex items-center rounded-xl bg-slate-200 p-2.5 hover:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:bg-slate-800 dark:fill-black dark:hover:bg-slate-700 dark:focus:ring-gray-500"
          >
            <MenuIcon />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
              "bg-white dark:bg-gray-800"
            )}
          >
            {Links.map((item) => (
              <DropdownMenuPrimitive.Item
                key={item}
                className={clsx(
                  "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                  "text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900"
                )}
              >
                <a
                  href={`#${item}`}
                  className="flex-grow text-gray-700 dark:text-gray-300"
                >
                  {item}
                </a>
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export { DropdownMenu };
