import { IconArrow, IconCheck } from "./Icons";

type Plan = {
  name: string;
  price: string;
  cta: string;
  featured?: boolean;
  features: React.ReactNode[];
};

const PLANS: Plan[] = [
  {
    name: "Для растущих компаний",
    price: "3 900",
    cta: "Записаться на консультацию",
    features: [
      "Выделенный старший бухгалтер и прямой чат (SLA до 60 мин)",
      <>
        Закрытие налогов до 10–12 числа (<i>Fast Close</i>)
      </>,
      "Ежемесячный управленческий P&L и Cash Flow от CFO",
      "1 плановый выезд в офис в месяц",
      "3 часа юриста и полное сопровождение проверок US / ZUS",
    ],
  },
  {
    name: "Для крупных компаний и групп",
    price: "9 900",
    cta: "Обсудить задачи компании",
    featured: true,
    features: [
      <>
        Расширенное сопровождение Fractional CFO: бюджетирование, налоговое моделирование,{" "}
        <i>ceny transferowe</i>
      </>,
      "2 и более выезда бухгалтера в офис в месяц",
      <>
        Полная подготовка платежных реестров в банке (<i>Biała Lista VAT</i> & <i>Split Payment</i>)
      </>,
      "Приоритетный SLA и выделенная линия юриста",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Ориентировочная стоимость</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Дешевле штатного главного бухгалтера — с уровнем финансового директора
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Содержание штатного бухгалтера и финдиректора в Варшаве обходится от{" "}
            <b className="whitespace-nowrap font-semibold text-navy">12 000–18 000 PLN/мес.</b> с учетом налогов и
            отпусков. В IMOSTA вы получаете целую команду по фиксированному ретейнеру.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-2xl p-6 sm:p-10 ${
                plan.featured
                  ? "bg-navy text-white shadow-lift"
                  : "border border-line bg-white text-navy shadow-card"
              }`}
            >
              <h3 className={`text-xl font-bold ${plan.featured ? "text-white" : "text-navy"}`}>{plan.name}</h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className={`text-base font-semibold ${plan.featured ? "text-white/70" : "text-muted"}`}>от</span>
                <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums">{plan.price}</span>
                <span className={`text-base font-semibold ${plan.featured ? "text-white/70" : "text-muted"}`}>
                  PLN netto / мес.
                </span>
              </p>

              <ul
                className={`mt-8 flex-1 space-y-4 border-t pt-8 ${plan.featured ? "border-white/15" : "border-line"}`}
              >
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`flex gap-3 text-[15px] leading-relaxed ${plan.featured ? "text-white/85" : "text-muted"}`}
                  >
                    <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#audit"
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold shadow-sm transition-all duration-200 hover:shadow-md ${
                  plan.featured
                    ? "bg-accent text-white hover:bg-accent-dark"
                    : "bg-navy text-white hover:bg-navy-800"
                }`}
              >
                {plan.cta}
                <IconArrow className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Точная стоимость фиксируется после экспресс-аудита и зависит от объема документооборота, ВЭД и кадровой
          нагрузки.
        </p>
      </div>
    </section>
  );
}
