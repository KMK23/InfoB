import { Link } from "react-router-dom";
import CeoMessage from "./company/CeoMessage";
import History from "./company/History";
import Certification from "./company/Certification";

function Company() {
  return (
    <div className="company-page">
      <h1>회사소개</h1>
      <p>INFOB는 혁신적인 기술 솔루션을 제공하는 글로벌 기업입니다.</p>
      <p>우리는 고객의 성공을 위해 최선을 다하고 있습니다.</p>

      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/company/ceo">CEO 인사말</Link>
          </li>
          <li>
            <Link to="/company/history">연혁 및 조직도</Link>
          </li>
          <li>
            <Link to="/company/certification">인증 및 특허</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Company.CeoMessage = CeoMessage;
Company.History = History;
Company.Certification = Certification;

export default Company;
