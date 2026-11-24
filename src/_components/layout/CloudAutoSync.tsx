"use client";

import { useEffect } from "react";
import { startAutoSync } from "@/lib/cloudSync";

export function CloudAutoSync() {
  useEffect(startAutoSync, []);
  return null;
}
