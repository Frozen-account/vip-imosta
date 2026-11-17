import { IconCheck, IconMinus } from "./Icons";

type Cell = string | null;

const TIERS = [
  { name: "Standard", note: "Базовый учет" },
  { name: "Business", note: "Для активных Sp. z o.o." },
  { name: "VIP / CFO Concierge", note: "Финансовый отдел под ключ", featured: true },
] as const;

const ROWS: { label: string; hint?: string; cells: [Cell, Cell, Cell] }[] = [
  {
    label: "Скорость ответа (SLA)",
    cells: ["До 24 ч в рабочие дни, e-mail", "До 4 ч, e-mail и телефон", "До 60 минут, прямой чат Telegram / WhatsApp"],
  },
  {
    label: "Срок закрытия налогов",
    hint: "Fast Close",
    cells: ["До 20-го числа", "До 15-го числа", "До 10–12-го числа"],
  },
  {
    label: "Управленческая отчетность и CFO",
    cells: [null, "Квартальный P&L", "Ежемесячный P&L и Cash Flow, налоговое моделирование Q4, стресс-тест ceny transferowe"],
  },
  {
    label: "Выезд бухгалтера в офис и платежи в банке",
    cells: [null, null, "1–2 выезда в месяц, пакеты платежей с проверкой Biała Lista VAT и Split Payment"],
  },
  {
    label: "Юрист и сопровождение проверок US / ZUS",
    cells: [
      "Ответы на письма US / ZUS",
      "Сопровождение проверок — по отдельному тарифу",
      "Полное представительство без визитов собственника + 3 ч юриста ежемесячно",
    ],
  },
];

function CellContent({ value, featured }: { value: Cell; featured?: boolean }) {
  if (value === null) {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted/70">
        <IconMinus className="h-4 w-4" />
        <span className="sr-only">Не входит</span>
      </span>
    );
  }
  return (
    <span className={`flex gap-2 ${featured ? "font-semibold text-navy" : "text-muted"}`}>
      {featured && <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />}
      <span>{value}</span>
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Сравнение тарифов</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Чем VIP отличается от обычной бухгалтерии
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Три уровня обслуживания IMOSTA. VIP — для собственников, которым важны скорость, прогноз и
            личный финансовый директор.
          </p>
        </div>

        {/* Desktop / tablet table */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line shadow-card md:block">
          <table className="w-full table-fixed border-collapse text-left text-[15px]">
            <caption className="sr-only">Сравнение тарифов Standard, Business и VIP / CFO Concierge</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[26%] bg-canvas p-5 align-bottom text-sm font-semibold text-muted">
                  Параметр
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.name}
                    scope="col"
                    className={`p-5 align-bottom ${"featured" in t ? "bg-navy text-white" : "bg-canvas text-navy"}`}
                  >
                    {"featured" in t && (
                      <span className="mb-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                        Рекомендуем
                      </span>
                    )}
                    <span className="block font-display text-lg font-bold">{t.name}</span>
                    <span className={`block text-xs font-medium ${"featured" in t ? "text-white/70" : "text-muted"}`}>
                      {t.note}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="p-5 align-top font-semibold text-navy">
                    {row.label}
                    {row.hint && <span className="block text-xs font-medium italic text-muted">{row.hint}</span>}
                  </th>
                  {row.cells.map((c, i) => (
                    <td key={i} className={`p-5 align-top ${i === 2 ? "bg-accent/[0.04]" : ""}`}>
                      <CellContent value={c} featured={i === 2} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {TIERS.map((t, ti) => {
            const featured = "featured" in t;
            return (
              <div
                key={t.name}
                className={`rounded-2xl border p-5 shadow-card ${featured ? "border-navy bg-navy text-white" : "border-line bg-white"}`}
              >
                {featured && (
                  <span className="mb-2 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Рекомендуем
                  </span>
                )}
                <p className={`font-display text-lg font-bold ${featured ? "text-white" : "text-navy"}`}>{t.name}</p>
                <p className={`text-xs ${featured ? "text-white/70" : "text-muted"}`}>{t.note}</p>
                <dl className="mt-4 space-y-3">
                  {ROWS.map((row) => {
                    const value = row.cells[ti];
                    return (
                      <div key={row.label} className={`border-t pt-3 ${featured ? "border-white/15" : "border-line"}`}>
                        <dt className={`text-xs font-semibold ${featured ? "text-white/60" : "text-muted"}`}>{row.label}</dt>
                        <dd className={`mt-1 text-sm ${featured ? "font-semibold text-white" : "text-navy"}`}>
                          {value ?? <span className={featured ? "text-white/50" : "text-muted/70"}>Не входит</span>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-navy-800 hover:shadow-md"
          >
            Рассчитать стоимость VIP-пакета
          </a>
        </div>
      </div>
    </section>
  );
}
