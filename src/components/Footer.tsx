import Image from "next/image";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/images/imosta-logo-white.svg"
            alt="IMOSTA"
            width={908}
            height={308}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            VIP-бухгалтерия, Fractional CFO и выездное обслуживание для Sp. z o.o. в Польше.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Разделы</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-white/80 transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Контакты</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-white/80">
            <p className="font-semibold text-white">{SITE.company}</p>
            <p>KRS: {SITE.krs}</p>
            <p>
              {SITE.address}, {SITE.city}
            </p>
            <p>
              <a href={SITE.phoneHref} className="font-semibold text-white transition-colors hover:text-accent">
                {SITE.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-4">
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp
              </a>
              <a href={SITE.telegramHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Telegram
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © 2026 {SITE.company}. Wszelkie prawa zastrzeżone.
          </p>
          <p>
            {SITE.company} · KRS {SITE.krs} · {SITE.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
