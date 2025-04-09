import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/_footer.scss";
import logo from "../resources/images/main/logo_t.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src={logo} alt="INFOB" />
        </div>
        <div className="footer__info">
          <p>
            대전광역시 서구 둔산대로 117번길 66, 3층 306호(만년동, 골드밸리)
          </p>
          <p>Tel : 042-483-6572 | Fax : 042-484-6572</p>
          <p>Copyright © 2024 INFOB Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
