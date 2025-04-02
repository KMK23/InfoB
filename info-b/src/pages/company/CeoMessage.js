import React from "react";
import "../../styles/pages/_ceoMessage.scss";
import ceoImage from "../../resources/images/main/CEO.webp";

const CeoMessage = () => {
  return (
    <div className="ceo-message">
      <div className="ceo-message__container">
        <div className="ceo-message__content">
          <h1 className="title">CEO 인사말</h1>
          <div className="message">
            <p>
              <span className="emphasis">
                열정있는 젊은이들과 함께 성장하며 새 시대를 열어갈 준비가 된
              </span>{" "}
              저희 기업을 찾아주셔서 감사합니다.
            </p>
            <p>
              저희는{" "}
              <span className="highlight">
                기술과 사람이 함께 성장하는 기업
              </span>
              을 지향하며, 고객의 니즈를 정확히 파악하고 최적의 솔루션을
              제공하기 위해 끊임없이 노력하고 있습니다.
            </p>
            <p>
              4차 산업혁명 시대를 맞이하여, 우리는 더욱 혁신적이고 창의적인
              솔루션으로 고객의 가치를 높이는데 기여하고자 합니다. 이를 위해
              우리는 지속적인 연구개발과 인재육성에 투자하고 있습니다.
            </p>
            <p>
              <span className="emphasis">함께 성장하고 발전하는 미래</span>를
              위해 최선을 다하겠습니다.
            </p>
          </div>
          <div className="signature">
            <div className="position">대표이사</div>
            <div className="name"> 유 종 욱</div>
          </div>
        </div>
        <div className="ceo-message__image">
          <img src={ceoImage} alt="CEO" />
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
