"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { IconClose, IconMenu, IconPhone } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "border-line shadow-card" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="IMOSTA Group — на главную">
          <Image
            src="/images/imosta-logo.png"
            alt="IMOSTA"
            width={2172}
            height={724}
            priority
            sizes="126px"
            className="h-[38px] w-auto lg:h-[42px]"
          />
          <span className="hidden border-l border-line pl-3 text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-navy-700 sm:block">
            VIP Бухгалтерия
            <br />& CFO
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-accent md:flex"
          >
            <IconPhone className="h-4 w-4" />
            <span className="font-display tabular-nums">{SITE.phoneDisplay}</span>
          </a>
          <a
            href="#audit"
            className="hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md sm:inline-flex"
          >
            Заказать аудит
          </a>
          <a
            href={SITE.phoneHref}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-navy md:hidden"
            aria-label={`Позвонить ${SITE.phoneDisplay}`}
          >
            <IconPhone className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Мобильная навигация" className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-navy hover:bg-canvas"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-base font-semibold text-white sm:hidden"
            >
              Заказать аудит
            </a>
            <a
              href={SITE.phoneHref}
              className="mt-2 rounded-lg border border-line px-4 py-3 text-center text-base font-semibold text-navy"
            >
              {SITE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
