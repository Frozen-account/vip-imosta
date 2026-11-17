"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { IconCheck, IconClose } from "./Icons";
import { useLead } from "./LeadContext";

const AUDIT_INCLUDES = [
  "Разбор учета и налоговых рисков за последние 12 месяцев",
  "Проверка лимита CIT 9% и возможности перехода на Estoński CIT",
  "Оценка рисков правления (art. 299 KSH) и договоров с контрагентами",
  "План действий и фиксированное предложение по VIP-ретейнеру",
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type Status = "idle" | "sending" | "success" | "error";

export default function LeadSection() {
  const { packageSummary, setPackageSummary } = useLead();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) ?? ""]));

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      contact: String(fd.get("contact") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      package: packageSummary,
      website: String(fd.get("website") ?? ""), // honeypot
      page: window.location.href,
      ...utm,
    };

    if (payload.name.length < 2 || payload.contact.length < 5) {
      setError("Укажите имя и телефон или ник в Telegram / WhatsApp.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setName(payload.name);
      setStatus("success");
      form.reset();
    } catch {
      setError(`Не удалось отправить заявку. Позвоните или напишите нам: ${SITE.phoneDisplay}.`);
      setStatus("error");
    }
  }

  const inputCls =
    "mt-1.5 block w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-navy placeholder:text-muted/60 shadow-sm transition-all duration-200 focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10";

  return (
    <section id="audit" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Offer */}
        <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-lift sm:p-10">
          <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Входное предложение
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Экспресс-аудит от финансового директора
            </h2>
            <p className="mt-5 font-display text-5xl font-extrabold tabular-nums">
              1 200 <span className="text-xl font-bold text-white/70">PLN netto</span>
            </p>
            <p className="mt-4 rounded-xl bg-white/[0.07] p-4 text-sm leading-relaxed text-white/85 ring-1 ring-white/10">
              <b className="text-white">100% стоимости засчитывается</b> в первый месяц VIP-обслуживания при
              заключении годового договора.
            </p>
            <ul className="mt-6 space-y-3">
              {AUDIT_INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center" role="status">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-good-bg text-good">
                <IconCheck className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-navy">Спасибо, {name}!</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
                Заявка принята. Финансовый директор IMOSTA свяжется с вами в течение 60 минут в рабочее время
                (пн–пт, 9:00–18:00), чтобы согласовать дату аудита.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setPackageSummary("");
                }}
                className="mt-6 text-sm font-semibold text-accent hover:text-accent-dark"
              >
                Отправить еще одну заявку
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-navy">Записаться на консультацию</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Оставьте контакты — согласуем удобное время аудита и ответим на вопросы по VIP-обслуживанию.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label htmlFor="lead-name" className="text-sm font-semibold text-navy">
                    Имя
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Как к вам обращаться"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="lead-contact" className="text-sm font-semibold text-navy">
                    Телефон / Telegram / WhatsApp
                  </label>
                  <input
                    id="lead-contact"
                    name="contact"
                    autoComplete="tel"
                    required
                    placeholder="+48 … или @username"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="lead-company" className="text-sm font-semibold text-navy">
                    NIP компании или оборот в месяц
                  </label>
                  <input
                    id="lead-company"
                    name="company"
                    placeholder="Например, 5252XXXXXX или ~300 000 PLN"
                    className={inputCls}
                  />
                </div>

                {/* Honeypot */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="lead-website">Website</label>
                  <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {packageSummary && (
                  <div className="flex items-start justify-between gap-3 rounded-xl border border-accent/25 bg-accent/[0.04] p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        Конфигурация из калькулятора
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-navy">{packageSummary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPackageSummary("")}
                      aria-label="Убрать конфигурацию из заявки"
                      className="shrink-0 rounded-md p-1 text-muted hover:bg-white hover:text-navy"
                    >
                      <IconClose className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {status === "error" && error && (
                  <p role="alert" className="rounded-lg bg-accent/[0.06] px-4 py-3 text-sm font-medium text-accent-dark">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Отправляем…" : "Записаться на экспресс-аудит"}
                </button>
                <p className="text-xs leading-relaxed text-muted">
                  Отправляя форму, вы соглашаетесь на обработку персональных данных {SITE.company} в целях
                  связи по вашему запросу (RODO).
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
