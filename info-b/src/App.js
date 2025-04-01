import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Company from "./pages/Company";
import Business from "./pages/Business";
import Research from "./pages/Research";
import Recruitment from "./pages/Recruitment";
import CeoMessage from "./pages/company/CeoMessage";
import History from "./pages/company/History";
import Certification from "./pages/company/Certification";

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
            <Route path="research" element={<Research />} />
            <Route path="recruitment" element={<Recruitment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
