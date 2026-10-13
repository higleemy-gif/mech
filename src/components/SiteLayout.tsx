import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";

export function SiteLayout() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
