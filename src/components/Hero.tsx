import { IconArrow } from "./Icons";

const COMMITMENTS = [
  { value: "до 60 мин", label: "ответ старшего бухгалтера в Telegram / WhatsApp" },
  { value: "10–12 число", label: "налоги рассчитаны, месяц закрыт (Fast Close)" },
  { value: "1–2 выезда", label: "бухгалтера в ваш офис в Варшаве ежемесячно" },
  { value: "3 часа", label: "корпоративного юриста в месяц включено" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            VIP Accounting & CFO Advisory
          </p>
          <h1 className="mt-7 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            VIP-бухгалтерия и финансовый директор для{" "}
            <span className="whitespace-nowrap">Sp. z o.o.</span>{" "}
            <span className="text-accent">в Польше</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl">
            Персональный финансовый директор (Fractional CFO), плановые выезды бухгалтера в ваш офис,
            закрытие месяца до 10-го числа и полное представительство перед Urząd Skarbowy и ZUS.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md"
            >
              Экспресс-аудит за 1 200 PLN netto
              <IconArrow className="h-4 w-4" />
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
            >
              Рассчитать VIP-пакет
            </a>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-white/15 lg:mt-20 lg:grid-cols-4">
          {COMMITMENTS.map((c, i) => (
            <div
              key={c.value}
              className={`border-white/15 py-6 pr-4 sm:py-8 ${i % 2 === 1 ? "border-l pl-4 sm:pl-6" : ""} ${
                i >= 2 ? "border-t lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <span className="block text-2xl font-extrabold tracking-tight sm:text-3xl">{c.value}</span>
                <span className="mt-2 block text-sm leading-snug text-white/65">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
