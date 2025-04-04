import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/pages/_rndBusiness.scss";

// 이미지 import
import RnD1 from "../../resources/images/rnd/RnD1.jpg";
import RnD2 from "../../resources/images/rnd/RnD2.png";
import LoRa1 from "../../resources/images/rnd/LoRa1.jpg";
import LoRa2 from "../../resources/images/rnd/LoRa2.jpg";
import LoRa3 from "../../resources/images/rnd/LoRa3.jpg";

function FadeInSection({ children }) {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    });

    const { current } = domRef;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, []);

  return (
    <div className="fade-in-section" ref={domRef}>
      {children}
    </div>
  );
}

function LeakDetection() {
  const location = useLocation();

  return (
    <div className="rn-business">
      {/* <div className="page-header">
        <h1>제품 소개</h1>
        <p>최신 기술과 혁신적인 솔루션으로 미래를 선도합니다</p>
      </div> */}

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
        {/* <div className="section-header">
          <h2>초저전력 초음파 누출 탐지센서</h2>
          <p>정밀한 누출 감지 기술로 안전한 환경을 제공합니다</p>
        </div> */}

        <FadeInSection>
          <div className="product-list">
            <div className="product-item">
              <div className="product-header">
                <h3>초저전력 초음파 누출 탐지센서</h3>
                <div className="product-badge">2024년 하반기 출시예정</div>
              </div>
              <FadeInSection>
                <div className="image-grid">
                  <div className="image-container">
                    <img
                      src={RnD1}
                      alt="초저전력 초음파 누출 탐지센서 이미지 1"
                    />
                  </div>
                  <div className="image-container">
                    <img
                      src={RnD2}
                      alt="초저전력 초음파 누출 탐지센서 이미지 2"
                    />
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="product-content">
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
                          C형배터리 2개(9,000mAh)로 12개월 이상 상시 누출탐지
                          가능
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

                    <div className="specs">
                      <h5>전원</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>입력</th>
                            <th>출력1</th>
                            <th>출력2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>88~264VAC</td>
                            <td>DC24V</td>
                            <td>DC24V</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>주파수</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>주파수 범위</td>
                            <td>920.9MHz ~ 923.3MHz</td>
                          </tr>
                          <tr>
                            <td>주파수 범위</td>
                            <td>47 ~ 63Hz</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>무선출력</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>2mA이하</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>안테나</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>유효방사, Dipole Antenna</td>
                          </tr>
                          <tr>
                            <td>유효장치 면적복사: 수직, 수평 편파</td>
                          </tr>
                          <tr>
                            <td>안테나 이득: 3.85dBi(920MHz)</td>
                          </tr>
                          <tr>
                            <td>크기: 140 x 108 x 1mm</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>사용온도</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>-20℃ ~ +50℃</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="product-section">
        {/* <div className="section-header">
          <h2>LoRa 무선통신 중계기</h2>
          <p>안정적이고 효율적인 데이터 통신을 제공합니다</p>
        </div> */}

        <FadeInSection>
          <div className="product-list">
            <div className="product-item">
              <div className="product-header">
                <h3>LoRa 무선통신 중계기</h3>
                <div className="product-badge">2024년 하반기 출시예정</div>
              </div>
              <FadeInSection>
                <div className="image-grid lora-grid">
                  <div className="image-container main-image">
                    <img src={LoRa1} alt="LoRa 무선통신 중계기 이미지 1" />
                  </div>
                  <div className="image-container vertical-stack">
                    <div className="stack-item">
                      <img src={LoRa2} alt="LoRa 무선통신 중계기 이미지 2" />
                    </div>
                    <div className="stack-item">
                      <img src={LoRa3} alt="LoRa 무선통신 중계기 이미지 3" />
                    </div>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="product-content">
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
              </FadeInSection>
            </div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}

export default LeakDetection;
