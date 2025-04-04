import React from "react";
import "../../styles/pages/_talent.scss";
import mainPro2 from "../../resources/images/main/ai_icon.png";

const Talent = () => {
  return (
    <div className="recruitment-talent">
      <div className="talent-header">
        <h1>인재상</h1>
        <p>우리는 이런 인재를 찾습니다.</p>
      </div>
      <div className="talent-content">
        <div>
          <div className="talent-title">
            <p>수평적 조직으로 능동적이고 연구 중심적인 문화를 중요시합니다.</p>
            <p>전문적인 지식으로 업무에 자부심이 넘치며</p>
            <p>구성원들과 함께 높은 수준의 프로젝트를 수행합니다.</p>
            <p>또한 고객의 눈높이에 맞추며 원활한 소통이 가능합니다.</p>
          </div>
          <div className="talent-button">
            <button>채용공고 보기</button>
          </div>
        </div>
        <div className="talent-img">
          <img src={mainPro2} />
        </div>
      </div>
    </div>
  );
};

export default Talent;
