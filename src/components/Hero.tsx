import CFODashboard from "./CFODashboard";
import { IconArrow, IconCheck } from "./Icons";

const PROOF = [
  "Ответ в чате до 60 минут",
  "Налоги рассчитаны до 10–12 числа",
  "Юрист 3 ч/мес. в пакете",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            VIP Accounting & CFO Concierge
          </p>
          <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            VIP-бухгалтерия и финансовый консьерж для растущих{" "}
            <span className="whitespace-nowrap text-white">Sp. z o.o.</span>{" "}
            <span className="text-accent">в Польше</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Больше чем учет. Личный финансовый директор (Fractional CFO), плановые выезды
            бухгалтера в ваш офис, закрытие месяца до 10-го числа и полная защита перед
            Urząd Skarbowy и ZUS.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-md"
            >
              Экспресс-аудит за 1 200 PLN
              <IconArrow className="h-4 w-4" />
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/5"
            >
              Рассчитать VIP-пакет
            </a>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3 sm:gap-4">
            {PROOF.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <CFODashboard />
      </div>
    </section>
  );
}
