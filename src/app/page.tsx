import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Comparison from "@/components/Comparison";
import Calculator from "@/components/Calculator";
import LeadSection from "@/components/LeadSection";
import Footer from "@/components/Footer";
import { LeadProvider } from "@/components/LeadContext";

export default function Home() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Comparison />
        <Calculator />
        <LeadSection />
      </main>
      <Footer />
    </LeadProvider>
  );
}
