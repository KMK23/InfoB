import "./App.css";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/auth/Login";
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
// import PostDetail from "./pages/community/PostDetail";
import Board from "./components/Board";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostManagement from "./pages/admin/PostManagement";
import NoticeManagement from "./pages/admin/NoticeManagement";
import LogIn from "./pages/recruitment/login/LogIn";
import Find from "./pages/recruitment/login/Find";
import Accession from "./pages/recruitment/login/Accession";
import NoticeDetail from "./pages/notices/NoticeDetail";
import CollectionEditor from "./pages/admin/CollectionEditor";
import Business from "./pages/company/Business";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Company />} />
              <Route path="company" element={<Company />} />
              <Route path="company/ceo" element={<CeoMessage />} />
              <Route path="company/history" element={<History />} />
              <Route path="company/certification" element={<Certification />} />
              <Route path="company/business" element={<Business />} />
              <Route path="company/location" element={<Location />} />
              <Route path="business/info" element={<BusinessInfo />} />
              <Route
                path="business/rn-d"
                element={<Navigate to="/business/leak-detection" replace />}
              />
              <Route
                path="business/leak-detection"
                element={<LeakDetection />}
              />
              <Route
                path="business/board-products"
                element={<BoardProducts />}
              />
              <Route path="performance/cases" element={<PerformanceCase />} />
              <Route path="recruitment/talent" element={<Talent />} />
              {/* <Route path="recruitment/benefits" element={<Benefits />} /> */}
              <Route path="community/announcement" element={<Announcement />} />
              {/* <Route path="community/faq" element={<Faq />} /> */}
              <Route path="community/inquiry/" element={<Inquiry />} />
              <Route path="community/post" element={<Post />} />
              <Route path="community/inquiry/:id" element={<Board />} />
              <Route path="login/login" element={<LogIn />} />
              <Route path="login/find" element={<Find />} />
              <Route path="login/accession" element={<Accession />} />
              <Route path="notice/detail/:id" element={<NoticeDetail />} />
            </Route>

            {/* Auth routes */}
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="posts" element={<PostManagement />} />
                      <Route path="notices" element={<NoticeManagement />} />
                      <Route path="collection" element={<CollectionEditor />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
