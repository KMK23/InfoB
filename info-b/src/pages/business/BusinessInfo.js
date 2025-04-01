import React from "react";

function BusinessInfo() {
  return (
    <div>
      <div className="business-content">
        <h1>사업소개</h1>
        <div className="business-section">
          <h2>주요 사업 영역</h2>
          <div className="business-grid">
            <div className="business-item">
              <h3>IT 솔루션</h3>
              <p>최적의 IT 시스템을 진단, 설계, 구축, 통합</p>
            </div>
            <div className="business-item">
              <h3>시스템 통합</h3>
              <p>효율적인 시스템 통합 서비스 제공</p>
            </div>
            <div className="business-item">
              <h3>기술 컨설팅</h3>
              <p>전문적인 기술 컨설팅 서비스</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInfo;
