import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Company from "./pages/Company";
import Business from "./pages/Business";
import Research from "./pages/Research";
import Recruitment from "./pages/recruiment/Recruitment";
import CeoMessage from "./pages/company/CeoMessage";
import History from "./pages/company/History";
import Certification from "./pages/company/Certification";
import BusinessInfo from "./pages/business/BusinessInfo";
import RnBusiness from "./pages/business/RnBusiness";
import RecruimentTalent from "./pages/recruiment/RecruimentTalent";
import RecruimentBenefits from "./pages/recruiment/RecruimentBenefits";
import Performance from "./pages/research/Performance";
import PerformanceCase from "./pages/research/PerformanceCase";

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
            <Route path="business" element={<Business />} />
            <Route path="business/info" element={<BusinessInfo />} />
            <Route path="business/research" element={<RnBusiness />} />
            <Route path="performance" element={<Performance />} />
            <Route path="performance/cases" element={<PerformanceCase />} />
            <Route path="recruitment" element={<Recruitment />} />
            <Route path="recruitment/talent" element={<RecruimentTalent />} />
            <Route
              path="recruitment/benefits"
              element={<RecruimentBenefits />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
