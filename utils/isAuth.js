"use client";
import TokenService from "@/services/tokenService";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function IsAuth(Component) {
  return function IsAuth(props) {
    const isAuthenticated = TokenService.isAuthenticated()

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/login");
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
