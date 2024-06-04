"use client";
import { useStore } from "@/app/lib/store";
import { AgencyHomeSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  const { isDark } = useStore();
  return <AgencyHomeSkeleton isDark={isDark} />;
}
