"use client";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../pages/dashboardLayout/dropdown-menu";
import Image from "next/image";
import { RootState } from "@/src/redux/store";

const UserDropdown = ({ className }: { className?: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <div></div>;
  }
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex items-center gap-2">
            <Image
              src="/user.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-9 sm:h-9 cursor-pointer"
            />
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
