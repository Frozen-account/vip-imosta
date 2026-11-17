"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/site";
import { IconArrow, IconCheck } from "./Icons";
import { useLead } from "./LeadContext";

/**
 * Indicative pricing model (PLN netto / month). Final retainer is fixed after the express audit.
 * Base VIP retainer includes: up to 40 documents, SLA < 60 min, Fast Close, US/ZUS representation,
 * 3 h/month of a corporate lawyer.
 */
const PRICING = {
  base: 2400,
  includedDocs: 40,
  perExtraDoc: 7,
  perPerson: 45,
  perVisit: 600,
  paymentConcierge: 700,
  cfoReport: 1500,
};

/** Owner hours saved per month for each component. */
const HOURS = {
  base: 4, // tax office letters, ZUS, chasing the accountant
  perDoc: 0.04, // ~2.4 min per document: collecting, forwarding, answering questions
  perPerson: 0.5, // payroll / B2B invoices coordination
  perVisit: 2.5, // no trips with documents, on-site questions solved
  paymentConcierge: 6, // preparing and checking bank transfers
  cfoReport: 8, // own spreadsheets and management analysis
};

const VISIT_OPTIONS = [0, 1, 2] as const;

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-navy">
          {label}
        </label>
        <span className="font-display text-lg font-bold tabular-nums text-navy">
          {value} <span className="text-sm font-semibold text-muted">{unit}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <div className="mt-1.5 flex justify-between text-xs text-muted">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
      <div>
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold text-navy">
          {label}
        </label>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 ${
          checked ? "bg-accent" : "bg-line"
        }`}
      >
        <span className="sr-only">{checked ? "Да" : "Нет"}</span>
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function Calculator() {
  const { setPackageSummary } = useLead();
  const [docs, setDocs] = useState(120);
  const [people, setPeople] = useState(8);
  const [visits, setVisits] = useState<(typeof VISIT_OPTIONS)[number]>(1);
  const [payments, setPayments] = useState(true);
  const [cfo, setCfo] = useState(true);
  const [sent, setSent] = useState(false);

  const result = useMemo(() => {
    const lines = [
      { label: "Базовый VIP-ретейнер (SLA, Fast Close, US/ZUS, юрист 3 ч)", value: PRICING.base },
      {
        label: `Документы сверх ${PRICING.includedDocs}`,
        value: Math.max(0, docs - PRICING.includedDocs) * PRICING.perExtraDoc,
      },
      { label: "Команда / контрагенты B2B", value: people * PRICING.perPerson },
      { label: "Выезды бухгалтера в офис", value: visits * PRICING.perVisit },
      { label: "Платежный консьерж в банке", value: payments ? PRICING.paymentConcierge : 0 },
      { label: "Ежемесячный отчет CFO", value: cfo ? PRICING.cfoReport : 0 },
    ];
    const total = lines.reduce((s, l) => s + l.value, 0);
    const hours =
      HOURS.base +
      docs * HOURS.perDoc +
      people * HOURS.perPerson +
      visits * HOURS.perVisit +
      (payments ? HOURS.paymentConcierge : 0) +
      (cfo ? HOURS.cfoReport : 0);
    return { lines, total: Math.round(total / 50) * 50, hours: Math.round(hours) };
  }, [docs, people, visits, payments, cfo]);

  const markChanged = () => setSent(false);

  const passToForm = () => {
    const summary = [
      `Документов в месяц: ${docs}`,
      `Команда / B2B: ${people}`,
      `Выезды в офис: ${visits} раз/мес.`,
      `Платежный консьерж: ${payments ? "да" : "нет"}`,
      `Отчет CFO: ${cfo ? "да" : "нет"}`,
      `Оценка: ~${formatNumber(result.total)} PLN netto/мес., экономия ~${result.hours} ч/мес.`,
    ].join("; ");
    setPackageSummary(summary);
    setSent(true);
    document.getElementById("audit")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="calculator" className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Калькулятор VIP-пакета</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Сколько стоит VIP и сколько времени он вам вернет
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Настройте параметры вашей компании — расчет обновляется мгновенно. Точную стоимость фиксируем
            после экспресс-аудита.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Controls */}
          <div className="space-y-7 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8">
            <Slider
              id="calc-docs"
              label="Количество документов в месяц"
              value={docs}
              min={30}
              max={500}
              step={10}
              unit="шт."
              onChange={(v) => {
                setDocs(v);
                markChanged();
              }}
            />
            <Slider
              id="calc-people"
              label="Команда / контрагенты B2B"
              value={people}
              min={1}
              max={50}
              step={1}
              unit="чел."
              onChange={(v) => {
                setPeople(v);
                markChanged();
              }}
            />

            <fieldset>
              <legend className="text-sm font-semibold text-navy">Выезды бухгалтера в офис</legend>
              <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-canvas p-1">
                {VISIT_OPTIONS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={visits === v}
                    onClick={() => {
                      setVisits(v);
                      markChanged();
                    }}
                    className={`rounded-lg px-2 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      visits === v ? "bg-white text-navy shadow-sm ring-1 ring-line" : "text-muted hover:text-navy"
                    }`}
                  >
                    {v === 0 ? "Без выездов" : `${v} раз${v === 2 ? "а" : ""} в мес.`}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-2">
              <Toggle
                id="calc-payments"
                label="Платежный консьерж в банке"
                description="Готовим пакеты платежей с проверкой Biała Lista VAT и Split Payment — вам остается подтвердить."
                checked={payments}
                onChange={(v) => {
                  setPayments(v);
                  markChanged();
                }}
              />
              <Toggle
                id="calc-cfo"
                label="Ежемесячный отчет CFO"
                description="Управленческий P&L, Cash Flow и комментарии финансового директора."
                checked={cfo}
                onChange={(v) => {
                  setCfo(v);
                  markChanged();
                }}
              />
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col rounded-2xl bg-navy p-5 text-white shadow-lift sm:p-8 lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Ориентировочный ретейнер</p>
            <p className="mt-2 font-display text-4xl font-extrabold tabular-nums sm:text-5xl" aria-live="polite">
              {formatNumber(result.total)}
              <span className="ml-2 text-base font-semibold text-white/70">PLN netto / мес.</span>
            </p>

            <div className="mt-5 flex items-center gap-4 rounded-xl bg-white/[0.07] p-4 ring-1 ring-white/10">
              <div className="font-display text-3xl font-extrabold tabular-nums text-white">
                {result.hours}
                <span className="ml-1 text-base font-semibold text-white/70">ч</span>
              </div>
              <p className="text-sm leading-snug text-white/75">
                времени собственника экономится каждый месяц — это примерно{" "}
                <b className="text-white">{Math.max(1, Math.round(result.hours / 8))} рабочих дн.</b>
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-sm">
              {result.lines
                .filter((l) => l.value > 0)
                .map((l) => (
                  <li key={l.label} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <span className="text-white/70">{l.label}</span>
                    <span className="shrink-0 font-display font-semibold tabular-nums">{formatNumber(l.value)}</span>
                  </li>
                ))}
            </ul>

            <button
              type="button"
              onClick={passToForm}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md"
            >
              {sent ? (
                <>
                  <IconCheck className="h-4 w-4" /> Конфигурация в заявке
                </>
              ) : (
                <>
                  Передать конфигурацию в заявку <IconArrow className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              Расчет ориентировочный и не является публичной офертой. Итоговая стоимость фиксируется в договоре
              после экспресс-аудита.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
