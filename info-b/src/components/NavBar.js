import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../resources/images/main/logo_t.png";
import "../styles/components/_navbar.scss";

function NavBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "회사소개",
      path: "/company/ceo",
      submenu: [
        { title: "CEO 인사말", path: "/company/ceo" },
        { title: "연혁 및 조직도", path: "/company/history" },
        { title: "인증 및 특허", path: "/company/certification" },
        { title: "오시는 길", path: "/company/location" },
      ],
    },
    {
      title: "사업소개",
      path: "/business/info",
      submenu: [
        { title: "사업정보", path: "/business/info" },
        { title: "R&D 연구사업", path: "/business/rn-d" },
      ],
    },
    {
      title: "수행실적",
      path: "/performance/cases",
      submenu: [{ title: "구축사례", path: "/performance/cases" }],
    },
    {
      title: "채용",
      path: "/recruitment/talent",
      submenu: [
        { title: "인재상", path: "/recruitment/talent" },
        // { title: "복리후생", path: "/recruitment/benefits" },
      ],
    },
    {
      title: "커뮤니티",
      path: "/community/post",
      submenu: [{ title: "게시판", path: "/community/post" }],
    },
  ];

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
          <Link to="/">
            <img src={logo} alt="INFOB" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`navbar__mobile-toggle ${
            isMobileMenuOpen ? "active" : ""
          }`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`navbar__menu ${isMobileMenuOpen ? "active" : ""}`}>
          {menuItems.map((item, index) => (
            <div
              key={item.title}
              className={`navbar__menu-item ${
                activeMenu === index ? "active" : ""
              }`}
            >
              {/* 채용 메뉴는 바로 Link로 연결 */}
              {item.title === "채용" ? (
                <Link
                  to={item.path}
                  className="navbar__menu-link"
                  onClick={() => setActiveMenu(null)} // 메뉴 닫기
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  href={item.path}
                  className="navbar__menu-link"
                  onClick={(e) => handleMenuClick(index, e)}
                >
                  {item.title}
                </a>
              )}
              {/* Submenu 표시 */}
              {item.submenu && (
                <div
                  className={`navbar__submenu ${
                    activeMenu === index ? "active" : ""
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.path}
                      className="navbar__submenu-link"
                      onClick={() => setActiveMenu(null)} // 메뉴 닫기
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
