"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useStore } from "../lib/store";
import clsx from "clsx";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sliceUrl = pathname.split("/");
  const route = sliceUrl[sliceUrl.length - 1];
  const attachRoute = pathname.includes("attach");
  const { isDark } = useStore();
  const addLabel = () => {
    switch (route) {
      case "dashboard":
        return "plantillas";
      case "reports":
        return "reportes";
      case "clients":
        return "clientes";
      case "potential-customer":
        return "clientes potenciales";
      default:
        return "Usuarios";
    }
  };
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div
      style={{
        opacity: attachRoute ? 0 : 1,
      }}
      className="relative flex"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={clsx(
          "peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 transition",
          {
            "bg-white": !isDark,
            "bg-dark-dark-background-panels": isDark,
            "border-gray-200": !isDark,
            "border-dark-dark-border": isDark,
          }
        )}
        placeholder={`Buscar ${addLabel()}`}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
