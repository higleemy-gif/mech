import { LeadFormProvider } from "./context/LeadFormContext";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Approach } from "./sections/Approach";
import { Industries } from "./sections/Industries";
import { Values } from "./sections/Values";
import { MissionVision } from "./sections/MissionVision";
import { CtaBand } from "./sections/CtaBand";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <LeadFormProvider>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Approach />
        <Industries />
        <Values />
        <MissionVision />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </LeadFormProvider>
  );
}
