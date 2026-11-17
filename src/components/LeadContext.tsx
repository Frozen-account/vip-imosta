"use client";

import { createContext, useContext, useMemo, useState } from "react";

type LeadContextValue = {
  packageSummary: string;
  setPackageSummary: (summary: string) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [packageSummary, setPackageSummary] = useState("");
  const value = useMemo(() => ({ packageSummary, setPackageSummary }), [packageSummary]);
  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>");
  return ctx;
}
