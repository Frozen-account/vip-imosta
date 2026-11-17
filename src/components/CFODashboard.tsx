"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/site";
import { IconAlert, IconCheck, IconClock } from "./Icons";

/** 2 000 000 € converted at an indicative rate of ~4.30 PLN/€. */
const CIT_LIMIT_PLN = 8_600_000;

type MonthData = {
  key: string;
  label: string;
  closedOn: string;
  revenueYtd: number;
  forecastYear: number;
  whiteListChecked: number;
  ksefInvoices: number;
  cashFlow: { month: string; value: number }[];
};

const MONTHS: MonthData[] = [
  {
    key: "2026-08",
    label: "Август",
    closedOn: "09.09",
    revenueYtd: 5_420_000,
    forecastYear: 8_050_000,
    whiteListChecked: 42,
    ksefInvoices: 312,
    cashFlow: [
      { month: "Мар", value: 182 },
      { month: "Апр", value: 205 },
      { month: "Май", value: 168 },
      { month: "Июн", value: 231 },
      { month: "Июл", value: 214 },
      { month: "Авг", value: 246 },
    ],
  },
  {
    key: "2026-09",
    label: "Сентябрь",
    closedOn: "08.10",
    revenueYtd: 6_130_000,
    forecastYear: 8_120_000,
    whiteListChecked: 47,
    ksefInvoices: 338,
    cashFlow: [
      { month: "Апр", value: 205 },
      { month: "Май", value: 168 },
      { month: "Июн", value: 231 },
      { month: "Июл", value: 214 },
      { month: "Авг", value: 246 },
      { month: "Сен", value: 263 },
    ],
  },
  {
    key: "2026-10",
    label: "Октябрь",
    closedOn: "10.11",
    revenueYtd: 6_910_000,
    forecastYear: 8_310_000,
    whiteListChecked: 51,
    ksefInvoices: 365,
    cashFlow: [
      { month: "Май", value: 168 },
      { month: "Июн", value: 231 },
      { month: "Июл", value: 214 },
      { month: "Авг", value: 246 },
      { month: "Сен", value: 263 },
      { month: "Окт", value: 289 },
    ],
  },
];

const millions = (v: number) =>
  (v / 1_000_000).toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function StatusPill({ tone, children }: { tone: "good" | "warn"; children: React.ReactNode }) {
  const styles = tone === "good" ? "bg-good-bg text-good" : "bg-warn-bg text-warn";
  const Icon = tone === "good" ? IconCheck : IconAlert;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles}`}>
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

export default function CFODashboard() {
  const [monthKey, setMonthKey] = useState(MONTHS[MONTHS.length - 1].key);
  const [hovered, setHovered] = useState<number | null>(null);
  const data = MONTHS.find((m) => m.key === monthKey) ?? MONTHS[MONTHS.length - 1];

  const ytdPct = Math.round((data.revenueYtd / CIT_LIMIT_PLN) * 100);
  const forecastPct = Math.min(100, Math.round((data.forecastYear / CIT_LIMIT_PLN) * 100));
  const citTone = forecastPct >= 95 ? "warn" : "good";
  const maxCash = Math.max(...data.cashFlow.map((c) => c.value));
  const activeBar = hovered ?? data.cashFlow.length - 1;

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-3 rounded-[22px] bg-white/5 ring-1 ring-white/10" />
      <div className="relative rounded-2xl bg-white p-4 text-ink shadow-lift sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Управленческий дашборд CFO
            </p>
            <p className="mt-1 text-lg font-bold">Ваша Sp. z o.o. · {data.label} 2026</p>
          </div>
          <div role="tablist" aria-label="Отчетный месяц" className="flex rounded-lg bg-canvas p-1">
            {MONTHS.map((m) => (
              <button
                key={m.key}
                role="tab"
                type="button"
                aria-selected={m.key === monthKey}
                onClick={() => {
                  setMonthKey(m.key);
                  setHovered(null);
                }}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                  m.key === monthKey ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
                }`}
              >
                {m.label.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* KPI tiles */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <IconClock className="h-3.5 w-3.5" /> Fast Close
            </div>
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">10-е число</p>
            <div className="mt-2">
              <StatusPill tone="good">Закрыто {data.closedOn}</StatusPill>
            </div>
          </div>

          <div className="rounded-xl border border-line p-3 sm:p-4">
            <p className="text-xs font-medium text-muted">Biała Lista VAT & Split Payment</p>
            <p className="mt-2 font-display text-xl font-bold tabular-nums sm:text-2xl">
              {data.whiteListChecked}/{data.whiteListChecked}
            </p>
            <div className="mt-2">
              <StatusPill tone="good">Проверено</StatusPill>
            </div>
          </div>

          <div className="col-span-2 rounded-xl border border-line p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted">Прогноз лимита CIT 9% (до 2 млн €)</p>
              <StatusPill tone={citTone}>
                {citTone === "good" ? "Лимит сохраняется" : "Требуется план"}
              </StatusPill>
            </div>
            <div
              className="relative mt-3 h-3 rounded-full bg-line"
              role="meter"
              aria-label="Использование лимита выручки для ставки CIT 9%"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={forecastPct}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-navy-700/35 transition-[width] duration-500"
                style={{ width: `${forecastPct}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-navy transition-[width] duration-500"
                style={{ width: `calc(${ytdPct}% - 2px)` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted">
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-navy align-middle" />
                Выручка YTD:{" "}
                <b className="font-display tabular-nums text-ink">{millions(data.revenueYtd)} млн PLN</b> ({ytdPct}%)
              </span>
              <span>
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-navy-700/35 align-middle" />
                Прогноз на год:{" "}
                <b className="font-display tabular-nums text-ink">{millions(data.forecastYear)} млн</b> ({forecastPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Cash flow mini chart */}
        <div className="mt-3 rounded-xl border border-line p-3 sm:p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs font-medium text-muted">Операционный Cash Flow, тыс. PLN</p>
            <p className="font-display text-sm font-bold tabular-nums">
              {data.cashFlow[activeBar].month}: {formatNumber(data.cashFlow[activeBar].value)}
            </p>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5 border-b border-line" onMouseLeave={() => setHovered(null)}>
            {data.cashFlow.map((c, i) => (
              <button
                key={c.month}
                type="button"
                aria-label={`${c.month}: ${c.value} тыс. PLN`}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group flex h-full flex-1 items-end focus:outline-none"
              >
                <span
                  className={`block w-full rounded-t-[4px] transition-all duration-300 ${
                    i === activeBar ? "bg-accent" : "bg-navy/80 group-hover:bg-navy"
                  }`}
                  style={{ height: `${(c.value / maxCash) * 100}%` }}
                />
              </button>
            ))}
          </div>
          <div className="mt-1.5 flex gap-1.5 text-center text-[10px] text-muted">
            {data.cashFlow.map((c) => (
              <span key={c.month} className="flex-1">
                {c.month}
              </span>
            ))}
          </div>
        </div>

        {/* KSeF */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3 text-white">
          <div>
            <p className="text-xs text-white/70">KSeF 2.0</p>
            <p className="text-sm font-semibold">
              <span className="font-display tabular-nums">{data.ksefInvoices}</span> e-faktur синхронизировано
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
            <IconCheck className="h-3.5 w-3.5 text-[#6fd3a0]" /> Готово
          </span>
        </div>

        <p className="mt-3 text-[10px] leading-snug text-muted">
          Демонстрационные данные. Лимит 2 млн € пересчитан по ориентировочному курсу ≈ 4,30 PLN/€.
        </p>
      </div>
    </div>
  );
}
