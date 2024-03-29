import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@components/ui/button";
import NavLink from "@components/nav-link";
import LogoSVG from "@components/svg/logo-svg";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { NavLinks } from "@/utils/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@components/ui/sheet";
import { MailPlus, Menu } from "lucide-react";
import SignOutBtn from "@components/sign-out-btn";
import { options } from "@/app/api/auth/[...nextauth]/options";
import es from "@/locales/es";
import { Separator } from "@components/ui/separator";

export default async function Navbar() {
  const t = es.nav;

  // get current session of user if logged in
  const session = await getServerSession(options);

  const navLinks: NavLinks = [
    {
      href: "/",
      label: t.home,
    },
    {
      href: "/projects",
      label: t.projects,
    },
    {
      href: "/blog",
      label: t.blog,
    },
  ];

  return (
    <header className="sticky top-1 z-50 mx-auto flex h-14 w-[95%] items-center justify-between gap-4 rounded-full border bg-background/60 px-4 shadow backdrop-blur md:w-auto md:max-w-full md:px-8">
      <div className="flex gap-4">
        {/* logo  */}
        <Link aria-label="homepage" href="/">
          <LogoSVG size={10} />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex h-full items-center gap-4">
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink layoutId="navbar" href={item.href}>
                  {item.label}
                </NavLink>
              </li>
            ))}

            {session && (
              <li>
                <NavLink layoutId="navbar" href="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <Separator orientation="vertical" className="hidden h-2/4 md:block" />

      {/* icons nav  */}
      <nav className="hidden md:block">
        <ul className="flex gap-2">
          {session && (
            <li>
              <SignOutBtn />
            </li>
          )}

          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              href="/#contact"
            >
              <MailPlus className="h-5" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* mobile nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="grid items-center justify-center rounded-b-3xl text-center"
          >
            <ul className="flex flex-col flex-wrap items-center gap-4 px-8 py-16">
              {navLinks.map((item, index) => (
                <li key={index}>
                  {/* SheetClose is used as child to close the nav when the child is clicked */}
                  <SheetClose asChild>
                    <NavLink layoutId="navbar" href={item.href}>
                      {item.label}
                    </NavLink>
                  </SheetClose>
                </li>
              ))}
              {session && (
                <li>
                  <SheetClose asChild>
                    <NavLink layoutId="navbar" href="/admin">
                      Admin
                    </NavLink>
                  </SheetClose>
                </li>
              )}
            </ul>

            <ul className="flex items-center justify-center gap-4">
              {session && (
                <li>
                  <SheetClose asChild>
                    <SignOutBtn />
                  </SheetClose>
                </li>
              )}

              <li>
                <ThemeToggle />
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    })}
                    href={"/#contact"}
                  >
                    <MailPlus className="h-5" />
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
