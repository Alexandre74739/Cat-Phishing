"use client";

import { useEffect, useState } from "react";
import type { CloudLink } from "@/lib/players";
import { postShow } from "@/lib/showAdmin";

// The server decides who is admin: the admin pseudo never ships in the browser code.
export function useShowAdmin(cloud: CloudLink | undefined) {
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    if (!cloud) return;
    let isActive = true;
    void postShow(cloud).then(({ status }) => {
      if (isActive && status === "ready") setAdminToken(cloud.token);
    });
    return () => {
      isActive = false;
    };
  }, [cloud]);

  return !!cloud && adminToken === cloud.token;
}
