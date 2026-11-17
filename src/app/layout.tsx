import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

// Plus Jakarta Sans has no basic Cyrillic, so it is used only for figures and Latin labels.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VIP-бухгалтерия и Fractional CFO для Sp. z o.o. — IMOSTA Group",
  description:
    "Личный финансовый директор, выезды бухгалтера в офис в Варшаве, закрытие месяца до 10-го числа и полная защита перед Urząd Skarbowy и ZUS. Экспресс-аудит от CFO — 1 200 PLN netto.",
  openGraph: {
    title: "VIP-бухгалтерия и финансовый консьерж — IMOSTA Group",
    description:
      "Fractional CFO, Fast Close до 10-го числа, выезды в офис и юрист в пакете для растущих Sp. z o.o. в Польше.",
    locale: "ru_RU",
    type: "website",
    images: ["/images/imosta-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B132B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
