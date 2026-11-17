export const SITE = {
  company: "IMOSTA Group Sp. z o.o.",
  krs: "0001023447",
  city: "Warszawa",
  address: "ul. Ostrobramska 101",
  phoneDisplay: "+48 881 867 733",
  phoneHref: "tel:+48881867733",
  whatsappHref: "https://wa.me/48881867733",
  telegramHref: "https://t.me/+48881867733",
} as const;

export const NAV = [
  { href: "#pillars", label: "Услуги" },
  { href: "#compare", label: "Тарифы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#audit", label: "Экспресс-аудит" },
] as const;

const plnFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export const formatNumber = (value: number) => plnFormatter.format(value);
