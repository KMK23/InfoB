import React from "react";
import "../styles/pages/_research.scss";

const ResearchList = () => {
  return (
    <div className="research-page">
      <div className="research-content">
        <h1>수행실적</h1>
        <div className="research-section">
          <h2>주요 프로젝트</h2>
          <div className="research-grid">
            <div className="research-item">
              <h3>프로젝트 1</h3>
              <p>시스템 구축 및 통합 프로젝트</p>
            </div>
            <div className="research-item">
              <h3>프로젝트 2</h3>
              <p>기술 컨설팅 프로젝트</p>
            </div>
            <div className="research-item">
              <h3>프로젝트 3</h3>
              <p>솔루션 개발 프로젝트</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchList;
