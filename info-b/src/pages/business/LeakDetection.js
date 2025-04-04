import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/pages/_rndBusiness.scss";

// 이미지 import
import RnD1 from "../../resources/images/rnd/RnD1.jpg";
import RnD2 from "../../resources/images/rnd/RnD2.png";
import LoRa1 from "../../resources/images/rnd/LoRa1.jpg";
import LoRa2 from "../../resources/images/rnd/LoRa2.jpg";
import LoRa3 from "../../resources/images/rnd/LoRa3.jpg";

function LeakDetection() {
  const location = useLocation();

  return (
    <div className="rn-business">
      <div className="page-header">
        <h1>제품 소개</h1>
        <p>최신 기술과 혁신적인 솔루션으로 미래를 선도합니다</p>
      </div>

      <div className="product-navigation">
        <Link
          to="/business/leak-detection"
          className={`nav-item ${
            location.pathname === "/business/leak-detection" ? "active" : ""
          }`}
        >
          누출탐지센서
        </Link>
        <Link
          to="/business/board-products"
          className={`nav-item ${
            location.pathname === "/business/board-products" ? "active" : ""
          }`}
        >
          보드제품
        </Link>
      </div>

      <section className="product-section">
        <div className="section-header">
          <h2>초저전력 초음파 누출 탐지센서</h2>
          <p>정밀한 누출 감지 기술로 안전한 환경을 제공합니다</p>
        </div>

        <div className="product-grid">
          <div className="product-item">
            <div className="product-badge">2024년 하반기 출시예정</div>
            <h3>초저전력 초음파 누출 탐지센서</h3>
            <div className="product-images single-product">
              <img src={RnD1} alt="초저전력 초음파 누출 탐지센서 이미지 1" />
              <img src={RnD2} alt="초저전력 초음파 누출 탐지센서 이미지 2" />
            </div>
            <div className="features">
              <h4>제품 특징</h4>
              <ul>
                <li>
                  <span className="feature-icon">📡</span>
                  <span className="feature-text">
                    초음파 수신거리 ~10m까지 수신가능
                  </span>
                </li>
                <li>
                  <span className="feature-icon">🔋</span>
                  <span className="feature-text">
                    C형배터리 2개(9,000mAh)로 12개월 이상 상시 누출탐지 가능
                  </span>
                </li>
                <li>
                  <span className="feature-icon">⚡</span>
                  <span className="feature-text">
                    C형배터리의 안정적인 전원공급을 위한 파워모듈 탑재
                  </span>
                </li>
                <li>
                  <span className="feature-icon">📊</span>
                  <span className="feature-text">
                    배터리 잔량 체크모듈 탑재로 효율적인 관리 가능
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="section-header">
          <h2>LoRa 무선통신 중계기</h2>
          <p>안정적이고 효율적인 데이터 통신을 제공합니다</p>
        </div>

        <div className="product-grid">
          <div className="product-item">
            <h3>LoRa 무선통신 중계기</h3>
            <div className="product-images">
              <img src={LoRa1} alt="LoRa 무선통신 중계기 이미지 1" />
              <img src={LoRa2} alt="LoRa 무선통신 중계기 이미지 2" />
              <img src={LoRa3} alt="LoRa 무선통신 중계기 이미지 3" />
            </div>
            <div className="features">
              <h4>제품 특징</h4>
              <ul>
                <li>
                  <span className="feature-icon">🔄</span>
                  <span className="feature-text">
                    LoRa중계기 1대당 400대의 센서데이터 수신가능
                  </span>
                </li>
                <li>
                  <span className="feature-icon">🌐</span>
                  <span className="feature-text">
                    최대통신거리 2.5km 반경 이내의 데이터 수신가능
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LeakDetection;
