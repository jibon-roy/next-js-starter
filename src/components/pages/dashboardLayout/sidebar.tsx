/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart2, Building2, Folder, LogOut, Menu } from "lucide-react";

import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";
import { logoutHandler } from "@/src/utils/handleLogout";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { FcCdLogo } from "react-icons/fc";

function NavItem({
  href = "#",
  icon: Icon,
  children,
}: {
  href?: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Function to check if a menu item is active
  const isActive = (href: string) => pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm md:text-base rounded-md transition-colors 
        ${isActive(href) ? "bg-[#0EA5E9]" : "text-[#B5B7BD]"} 
        hover:text-gray-100 hover:bg-gray-600`}
    >
      {Icon && <Icon className="h-5 w-5 mr-3 shrink-0" />}
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutHandler(dispatch, router);
    window.dispatchEvent(new Event("logout"));
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-70 p-2 rounded-lg bg-white shadow-lg border border-gray-200 cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <nav
        className={`fixed inset-y-0 left-0 z-70 w-64 bg-[#0F172A] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b-2 border-dashed border-gray-300"
          >
            <div className="flex items-center gap-3">
              {/* <Image
                src=""
                alt="Logo"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:block"
              /> */}
              <FcCdLogo size={150} className="h-20 w-auto mr-3" />
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/demo" icon={BarChart2}>
                    Demo
                  </NavItem>
                  <NavItem href="/organization" icon={Building2}>
                    Demo 2
                  </NavItem>
                  <NavItem href="/projects" icon={Folder}>
                    Demo 3
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="space-y-1">
              <NavItem>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center"
                >
                  <LogOut size={35} className="h-5 w-5 mr-3" />
                  <span className="text-sm md:text-base">Logout</span>
                </button>
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-65 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
