import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../lib/smoothScroll";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Services } from "../sections/Services";
import { Approach } from "../sections/Approach";
import { Industries } from "../sections/Industries";
import { Values } from "../sections/Values";
import { MissionVision } from "../sections/MissionVision";
import { CtaBand } from "../sections/CtaBand";
import { Contact } from "../sections/Contact";

export function Home() {
  const location = useLocation();

  // When arriving with a hash (e.g. /#contact from another page), scroll to it
  // once the sections have rendered.
  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    const t = window.setTimeout(() => smoothScrollTo(id), 60);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Approach />
      <Industries />
      <Values />
      <MissionVision />
      <CtaBand />
      <Contact />
    </>
  );
}
