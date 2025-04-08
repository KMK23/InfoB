import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CeoMessage from "./pages/company/CeoMessage";
import History from "./pages/company/History";
import Certification from "./pages/company/Certification";
import Company from "./pages/company/Company";
import BusinessInfo from "./pages/business/BusinessInfo";
import LeakDetection from "./pages/business/LeakDetection";
import BoardProducts from "./pages/business/BoardProducts";
import PerformanceCase from "./pages/research/PerformanceCase";
import Talent from "./pages/recruitment/Talent";
import Post from "./pages/community/Post";
import Announcement from "./pages/community/Announcement";
import Inquiry from "./pages/community/Inquiry";
import Location from "./pages/company/Location";
import Faq from "./pages/community/Faq";
// import PostDetail from "./pages/community/PostDetail";
import Board from "./components/Board";

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
            <Route path="company/location" element={<Location />} />
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
            <Route path="community/faq" element={<Faq />} />
            <Route path="community/inquiry" element={<Inquiry />} />
            <Route path="community/post" element={<Post />} />
            <Route path="community/post/:id" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
