import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import LeadSection from "@/components/LeadSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Comparison />
        <Pricing />
        <LeadSection />
      </main>
      <Footer />
    </>
  );
}
