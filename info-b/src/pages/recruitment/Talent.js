import React from "react";
import "../../styles/pages/_talent.scss";
import mainPro2 from "../../resources/images/main/main_pro2.png";

const Talent = () => {
  return (
    <div className="recruitment-talent">
      <div className="talent-header">
        <h1>인재상</h1>
        <p>우리는 이런 인재를 찾습니다</p>
      </div>

      <div className="talent-content">
        <div className="talent-image">
          <img src={mainPro2} alt="인재상" />
        </div>
        <div className="talent-description">
          <div className="talent-item">
            <h2>도전정신</h2>
            <p>새로운 것에 대한 도전과 열정을 가진 인재</p>
          </div>
          <div className="talent-item">
            <h2>협업능력</h2>
            <p>팀원들과의 원활한 소통과 협업이 가능한 인재</p>
          </div>
          <div className="talent-item">
            <h2>전문성</h2>
            <p>자신의 분야에 대한 전문적인 지식과 기술을 갖춘 인재</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent;
