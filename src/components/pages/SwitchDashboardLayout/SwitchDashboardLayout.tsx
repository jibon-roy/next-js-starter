"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminOverview from "../dashboard/admin-dashboard/AdminOverview";
import UserOverview from "../dashboard/user-dashboard/UserOverview";
// import { useSelector } from "react-redux";
// import { RootState } from "@/src/redux/store";

const SwitchDashboardLayout = () => {
  //   const user = useSelector((state: RootState) => state.auth.user);
  //   const userRole = user?.role;
  const router = useRouter();

  const [userRole] = useState<"ADMIN" | "USER">("ADMIN");

  useEffect(() => {
    if (!userRole) {
      router.push("/auth/signin");
    }
  }, [router, userRole]);

  if (userRole === "USER") {
    return (
      <>
        <UserOverview />
      </>
    );
  } else if (userRole === "ADMIN") {
    return (
      <>
        <AdminOverview />
      </>
    );
  }

  return <></>;
};

export default SwitchDashboardLayout;
