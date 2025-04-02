import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CeoMessage from "./pages/company/CeoMessage";
import History from "./pages/company/History";
import Certification from "./pages/company/Certification";
import Company from "./pages/company/Company";
import BusinessInfo from "./pages/business/BusinessInfo";
import RnDBusiness from "./pages/business/RnDBusiness";
import PerformanceCase from "./pages/research/PerformanceCase";
import Talent from "./pages/recruitment/Talent";
import Benefits from "./pages/recruitment/Benefits";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Company />} />
            <Route path="company" element={<Company />} />
            <Route path="company/ceo" element={<CeoMessage />} />
            <Route path="company/history" element={<History />} />
            <Route path="company/certification" element={<Certification />} />
            <Route path="business/info" element={<BusinessInfo />} />
            <Route path="business/rn-d" element={<RnDBusiness />} />
            <Route path="performance/cases" element={<PerformanceCase />} />
            <Route path="recruitment/talent" element={<Talent />} />
            <Route path="recruitment/benefits" element={<Benefits />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
