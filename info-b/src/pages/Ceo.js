import React from "react";
import "../styles/pages/_ceo.scss";

function Ceo() {
  return (
    <div className="ceo-page">
      <div className="page-header">
        <div className="page-header__container">
          <h1>CEO 인사말</h1>
          <p>최고의 IT 서비스를 제공하는 INFOB입니다</p>
        </div>
      </div>

      <div className="ceo-content">
        <div className="ceo-content__container">
          <div className="ceo-content__text">
            <h2>
              혁신적인 기술로
              <br />더 나은 미래를 만들어갑니다
            </h2>
            <p>
              안녕하십니까,
              <br />
              INFOB 대표이사 입니다.
            </p>
            <p>
              INFOB는 2000년 설립 이래 20여년간 축적된 IT 기술력과 경험을
              바탕으로 고객의 비즈니스 혁신을 위한 최적의 솔루션을 제공하고
              있습니다.
            </p>
            <p>
              4차 산업혁명 시대를 맞이하여 빠르게 변화하는 IT 환경 속에서 우리는
              끊임없는 연구개발과 혁신을 통해 고객의 가치를 창출하고, 더 나은
              미래를 만들어가는데 앞장서고 있습니다.
            </p>
            <p>
              앞으로도 INFOB는 고객의 신뢰를 바탕으로 지속적인 성장과 혁신을
              추구하며, 대한민국 IT 산업의 발전에 기여하겠습니다.
            </p>
            <p>감사합니다.</p>
            <div className="ceo-content__signature">
              <p>INFOB 대표이사</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ceo;
