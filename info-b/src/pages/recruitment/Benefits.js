import React from "react";
import "../../styles/pages/_benefits.scss";
import mainPro3 from "../../resources/images/main/main_pro3.png";

const Benefits = () => {
  return (
    <div className="recruitment-benefits">
      <div className="benefits-header">
        <h1>복리후생</h1>
        <p>직원들의 행복한 삶을 위해 최선을 다합니다</p>
      </div>

      <div className="benefits-content">
        <div className="benefits-image">
          <img src={mainPro3} alt="복리후생" />
        </div>
        <div className="benefits-description">
          <div className="benefits-list">
            <div className="benefits-item">
              <h2>건강보험</h2>
              <ul>
                <li>4대 보험 적용</li>
                <li>정기 건강검진</li>
                <li>건강관리 프로그램</li>
              </ul>
            </div>
            <div className="benefits-item">
              <h2>근무환경</h2>
              <ul>
                <li>자율 출퇴근제</li>
                <li>재택근무 가능</li>
                <li>최신식 사무실</li>
              </ul>
            </div>
            <div className="benefits-item">
              <h2>교육지원</h2>
              <ul>
                <li>자기개발비 지원</li>
                <li>외국어 교육</li>
                <li>전문가 초청 세미나</li>
              </ul>
            </div>
            <div className="benefits-item">
              <h2>여가활동</h2>
              <ul>
                <li>휴가 및 휴일</li>
                <li>사내 동호회</li>
                <li>단체 여행</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
