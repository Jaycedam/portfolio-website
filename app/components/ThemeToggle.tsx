"use client";
import { BsMoonStars, BsSun, BsGear } from "react-icons/bs";
import { useState, useEffect, Fragment } from "react";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // Prevents desynct UI server - client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md 
          px-4 py-2 text-zinc-900 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white
          dark:text-zinc-50
         "
        >
          <BsMoonStars />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-1/2 mt-2 flex w-auto -translate-x-1/2
            flex-col divide-y divide-zinc-100 overflow-hidden rounded-md
             bg-white shadow-lg ring-1 ring-black 
            ring-opacity-5 focus:outline-none
            dark:divide-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className="flex h-fit w-full items-center gap-2 px-4 py-2 
                hover:bg-primary hover:text-zinc-50 focus-visible:bg-primary focus-visible:text-zinc-50"
                onClick={() => setTheme("light")}
              >
                <BsSun /> Light
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className="flex h-fit w-full items-center gap-2 px-4 py-2 
              hover:bg-primary hover:text-zinc-50 focus-visible:bg-primary focus-visible:text-zinc-50"
                onClick={() => setTheme("dark")}
              >
                <BsMoonStars /> Dark
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className="flex h-fit w-full items-center gap-2 px-4 py-2 
              hover:bg-primary hover:text-zinc-50 focus-visible:bg-primary focus-visible:text-zinc-50"
                onClick={() => setTheme("system")}
              >
                <BsGear /> System
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeToggle;