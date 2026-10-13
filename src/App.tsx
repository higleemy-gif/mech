import { Routes, Route } from "react-router-dom";
import { LeadFormProvider } from "./context/LeadFormContext";
import { SiteLayout } from "./components/SiteLayout";
import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";

export default function App() {
  return (
    <LeadFormProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </LeadFormProvider>
  );
}
