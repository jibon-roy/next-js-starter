"use client";

import { Navbar } from "../navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { Button } from "@/src/components/ui/button/Button";
import Logo from "../../logo/Logo";
import UserDropdown from "../UserDropdown";

const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Shop",
      path: "/shop",
    },
    {
      label: "Blog",
      path: "/blog",
    },
    {
      label: "Contact",
      path: "/contact",
    },
    {
      label: "About",
      path: "/about",
    },
  ];

  // Example buttons with custom components
  const buttons = [
    {
      label: "Register",
      onClick: () => console.log("Register clicked"),
      component: user ? (
        <div className="max-lg:hidden">
          <UserDropdown />
        </div>
      ) : (
        <div className="flex max-md:flex-col gap-2">
          <Link href="/register">
            <Button variant={"primary"} className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  // Example conditional routes
  const conditionalRoutes = {
    "/pricing": true, // Show pricing page
    "/admin": false, // Hide admin page
  };

  return (
    <div className="mb-16 lg:mb-20">
      <Navbar
        className="max-w-[1920px]  mx-auto sm:px-[1.5%]"
        position="fixed"
        shadow="shadow-xl"
        backgroundColor="bg-[#0F172A] lg:py-4"
        logo={<Logo />}
        activeTextColor="text-primary hover:text-primary-hover! font-semibold"
        textColor="text-dark  font-semibold"
        hoverTextColor="hover:text-white/80"
        navItems={navItems}
        buttons={buttons}
        hideOnScroll
        conditionalRoutes={conditionalRoutes}
        onNavItemClick={(item) => console.log("Nav item clicked:", item.label)}
        onButtonClick={(index, button) =>
          console.log(`Button ${index} clicked:`, button.label)
        }
      />
    </div>
  );
};

export default NavBar;
