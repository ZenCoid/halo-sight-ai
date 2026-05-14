import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Nav, CommandCenter, TeacherStudent, Industries, TrainingLoop, ChainOfCustody, CTA, Footer } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeSight AI — Sovereign Vision Intelligence" },
      { name: "description", content: "A sovereign, edge-native vision intelligence platform for construction, healthcare, retail, and national-security-grade operations." },
      { property: "og:title", content: "SafeSight AI — Sovereign Vision Intelligence" },
      { property: "og:description", content: "Surveillance, re-imagined. Teacher-Student AI architecture, autonomous overnight training, and forensic chain-of-custody." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <CommandCenter />
      <TeacherStudent />
      <Industries />
      <TrainingLoop />
      <ChainOfCustody />
      <CTA />
      <Footer />
    </main>
  );
}
