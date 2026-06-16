"use client";

import { SWRConfig } from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: "include",
  });

  return response.json();
};

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        dedupingInterval: 30000,
      }}
    >
      {children}
    </SWRConfig>
  );
}