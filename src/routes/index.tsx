import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Nav, CommandCenter, TeacherStudent, Industries, TrainingLoop, ChainOfCustody, CTA, Footer } from "@/components/Sections";
import { CommandConsole } from "@/components/console/CommandConsole";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeSight AI — Sovereign Vision Console" },
      { name: "description", content: "A sovereign, edge-native vision intelligence console for construction, healthcare, retail, and national-security-grade operations." },
      { property: "og:title", content: "SafeSight AI — Sovereign Vision Console" },
      { property: "og:description", content: "Surveillance, re-imagined. Bento command console with reflective intelligence modules and forensic chain-of-custody." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <CommandConsole />
      <div id="dossier">
        <Hero />
        <CommandCenter />
        <TeacherStudent />
        <Industries />
        <TrainingLoop />
        <ChainOfCustody />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
