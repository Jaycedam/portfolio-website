import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenuAltRight } from "react-icons/bi";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { MdEmail } from "react-icons/md";
import NavLink from "@/components/nav-link";
import LogoSVG from "@/components/svg/logo-svg";
import { getServerSession } from "next-auth/next";
import { options } from "@/api/auth/[...nextauth]/options";
import { GoSignOut } from "react-icons/go";

const navLinks = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/projects",
    label: "Proyectos",
  },
];

export default async function Navbar() {
  // get current session of user if logged in
  const session = await getServerSession(options);
  return (
    <div className=" fixed inset-0 z-50 h-14 border-b bg-background/70 backdrop-blur">
      <nav className="container flex h-full items-center justify-between">
        {/* logo  */}
        <Link href="/">
          <LogoSVG />
        </Link>

        <ul className="hidden items-center gap-4 md:flex">
          {navLinks.map((item, index) => (
            <li key={index}>
              <NavLink href={item.href} label={item.label} />
            </li>
          ))}

          {session && (
            <>
              <li>
                <NavLink href="/admin" label="Admin" />
              </li>

              <Link
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="/api/auth/signout"
              >
                <GoSignOut className="h-5 w-auto" />
              </Link>
            </>
          )}

          <li>
            <ThemeToggle />
          </li>
          <li>
            <a
              href={process.env.EMAIL}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <MdEmail className="h-[1.25rem] w-[1.25rem]" />
            </a>
          </li>
        </ul>

        {/* mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <BiMenuAltRight className="h-8 w-8" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="grid items-center justify-center text-center"
            >
              <ul className="flex flex-col gap-4 py-16">
                {navLinks.map((item, index) => (
                  <li key={index}>
                    {/* SheetClose is used as child to close the nav when the child is clicked */}
                    <SheetClose asChild>
                      <NavLink href={item.href} label={item.label} />
                    </SheetClose>
                  </li>
                ))}
                {session && (
                  <SheetClose asChild>
                    <li>
                      <NavLink href="/admin" label="Admin" />
                    </li>
                  </SheetClose>
                )}
              </ul>

              <ul className="flex items-center justify-center gap-4">
                {session && (
                  <Link
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    })}
                    href="/api/auth/signout"
                  >
                    <GoSignOut className="h-5 w-auto" />
                  </Link>
                )}
                <li>
                  <ThemeToggle />
                </li>
                <li>
                  <a
                    href={process.env.EMAIL}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    })}
                  >
                    <MdEmail className="h-6 w-6" />
                  </a>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
