import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CeoMessage from "./pages/company/CeoMessage";
import History from "./pages/company/History";
import Certification from "./pages/company/Certification";
import Company from "./pages/company/Company";
import BusinessInfo from "./pages/business/BusinessInfo";
// import RnDBusiness from "./pages/business/RnDBusiness";
import LeakDetection from "./pages/business/LeakDetection";
import BoardProducts from "./pages/business/BoardProducts";
import PerformanceCase from "./pages/research/PerformanceCase";
import Talent from "./pages/recruitment/Talent";
import Post from "./pages/community/Post";
import Announcement from "./pages/community/Announcement";
import Qna from "./pages/community/Qna";
import Inquiry from "./pages/community/Inquiry";

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
            <Route
              path="business/rn-d"
              element={<Navigate to="/business/leak-detection" replace />}
            />
            <Route path="business/leak-detection" element={<LeakDetection />} />
            <Route path="business/board-products" element={<BoardProducts />} />
            <Route path="performance/cases" element={<PerformanceCase />} />
            <Route path="recruitment/talent" element={<Talent />} />
            {/* <Route path="recruitment/benefits" element={<Benefits />} /> */}
            <Route path="community/announcement" element={<Announcement />} />
            <Route path="community/qna" element={<Qna />} />
            <Route path="community/inquiry" element={<Inquiry />} />
            <Route path="community/post" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
