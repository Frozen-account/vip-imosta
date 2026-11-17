import { IconBolt, IconBriefcase, IconChart, IconCheck, IconShield } from "./Icons";

const PILLARS = [
  {
    n: "01",
    Icon: IconChart,
    title: "Финансовый директор на аутсорсе",
    tag: "Fractional CFO",
    points: [
      "Ежемесячный управленческий P&L и Cash Flow на понятном языке (RU / UA / EN / PL)",
      "Налоговое моделирование в Q4 — до закрытия года, пока еще можно повлиять на результат",
      <>
        Ежеквартальный стресс-тест договоров и <i>ceny transferowe</i>
      </>,
    ],
  },
  {
    n: "02",
    Icon: IconBriefcase,
    title: "Операционный консьерж и выезд в офис",
    tag: "On-site",
    points: [
      "Плановые выезды бухгалтера в ваш офис в Варшаве — 1–2 раза в месяц",
      <>
        Подготовка платежей в интернет-банке с проверкой <i>Biała Lista VAT</i> и <i>Split Payment</i>
      </>,
      "Интеграция CRM / ERP / KSeF — документы попадают в учет без ручной пересылки",
    ],
  },
  {
    n: "03",
    Icon: IconBolt,
    title: "Приоритетный SLA и Fast Close",
    tag: "SLA < 60 мин",
    points: [
      "Выделенный старший бухгалтер и прямой чат в Telegram / WhatsApp — ответ до 60 минут",
      "Расчет налогов до 10–12 числа каждого месяца",
      <>
        Справки для банков и лизинга в приоритетном порядке (<i>bilans próbny</i>, <i>F01</i>)
      </>,
    ],
  },
  {
    n: "04",
    Icon: IconShield,
    title: "Полная защита и юрист в пакете",
    tag: "US / ZUS",
    points: [
      <>
        Представительство в <i>Urząd Skarbowy</i> и ZUS при проверках (<i>czynności sprawdzające</i>)
      </>,
      "Собственнику не нужно ходить по ведомствам — все визиты и переписку ведем мы",
      "3 часа консультаций корпоративного юриста ежемесячно включено",
    ],
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">4 опоры VIP-обслуживания</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Бухгалтерия, которая работает как ваш финансовый отдел
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Вы получаете не «сдачу деклараций», а управляемые финансы: прогноз налогов, контроль денег,
            готовые платежи и защиту при любой проверке.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {PILLARS.map(({ n, Icon, title, tag, points }) => (
            <article
              key={n}
              className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-200 group-hover:bg-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-display text-sm font-bold text-line">{n}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy">{title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{tag}</p>
              <ul className="mt-5 space-y-3">
                {points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
