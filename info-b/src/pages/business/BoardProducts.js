import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/pages/_rndBusiness.scss";
import FadeInSection from "../../components/FadeInSection";

// 이미지 import
import InfoEMU from "../../resources/images/rnd/INFO-EMU.png";
import InfoPCU from "../../resources/images/rnd/INFO-PCU.png";
import InfoMDU from "../../resources/images/rnd/INFO-MDU.png";

function BoardProducts() {
  const location = useLocation();

  return (
    <div className="rn-business">
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
        <FadeInSection>
          <div className="section-header">
            <h2>보드제품</h2>
            <p>고성능 하드웨어 솔루션으로 다양한 산업 분야를 지원합니다</p>
          </div>
        </FadeInSection>

        <div className="product-list">
          <FadeInSection>
            <div className="product-item">
              <div className="product-header">
                <h3>장비관리장치(INFO-EMU)</h3>
                <div className="product-badge">2024년 하반기 출시예정</div>
              </div>
              <FadeInSection>
                <div className="image-grid">
                  <div className="image-container">
                    <img src={InfoEMU} alt="장비관리장치(INFO-EMU) 이미지" />
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="product-content">
                  <div className="features">
                    <h4>기능</h4>
                    <p>
                      EMU는 문 열림 정보 수집, 함체 온도 모니터링, 전원
                      제어장치와 통신, 이더넷 통신, 호환성 테스트를 위한
                      인터페이스 장치입니다.
                    </p>
                    <h4>규격</h4>
                    <ul>
                      <li>
                        <span className="feature-icon">🔌</span>
                        <span className="feature-text">
                          통신포트: 8개 이상의 Ethernet Port와 2개 시리얼 통신
                          Port 이상
                        </span>
                      </li>
                      <li>
                        <span className="feature-icon">⏱️</span>
                        <span className="feature-text">
                          WDT(Watch Dog Timer)회로 내장: On/Off 기능 내장
                        </span>
                      </li>
                      <li>
                        <span className="feature-icon">⚡</span>
                        <span className="feature-text">
                          사용전압: +5V DC, +12V DC, -12V DC
                        </span>
                      </li>
                      <li>
                        <span className="feature-icon">🌡️</span>
                        <span className="feature-text">
                          동작온도: -34 ℃ ~ +74 ℃
                        </span>
                      </li>
                      <li>
                        <span className="feature-icon">💧</span>
                        <span className="feature-text">
                          상대습도: +4.4 ℃ ~ +44 ℃에서 10~90%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="product-item">
              <div className="product-header">
                <h3>전원제어장치(INFO-PCU)</h3>
                <div className="product-badge">2024년 하반기 출시예정</div>
              </div>
              <FadeInSection>
                <div className="image-grid">
                  <div className="image-container">
                    <img src={InfoPCU} alt="전원제어장치(INFO-PCU) 이미지" />
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="product-content">
                  <div className="features">
                    <h4>기능 및 성능</h4>
                    <p>
                      전원제어장치는 EMU와 통신을 통해 주요 장치들의 전원을
                      제어하는 기능을 수행하는 장치로, 전면에는 카메라부 전원을
                      조작하기 위한 스위치를 부착하여야 하고, 후면부는 각 장치의
                      전원 공급 및 EMU와의 통신 등을 위한 커넥터가 부착됩니다.
                    </p>
                    <p>
                      전원을 제어하기 위하여 릴레이를 사용하여야 하며,
                      전원제어장치 이상발생 시에도 전원이 공급될 수 있도록
                      하기위해 NC(Normal Close)단에 연결됩니다.
                    </p>
                    <p>전원제어장치의 전원은 메인전원에서 직접 연결합니다.</p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="product-item">
              <div className="product-header">
                <h3>누액감지단말장치(INFO-MDU)</h3>
                <div className="product-badge">2024년 하반기 출시예정</div>
              </div>
              <FadeInSection>
                <div className="image-grid">
                  <div className="image-container">
                    <img
                      src={InfoMDU}
                      alt="누액감지단말장치(INFO-MDU) 이미지"
                    />
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="product-content">
                  <div className="features">
                    <h4>기능</h4>
                    <p>
                      누액 감시 단말 장치는 현장에서 누액을 감지하여
                      게이트웨이로 송신합니다.
                    </p>
                    <p>
                      센서는 유선으로 접속하며 최대 5개 까지 수용 가능하며
                      종류를 구분하지 않고 모든 액체를 감지합니다.
                    </p>
                    <p>게이트웨이와 통신은 LoRa 통신을 합니다.</p>

                    <h4>규격</h4>
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
                            <td>12V DC</td>
                            <td>12V DC</td>
                            <td>5V DC</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>주파수</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>주파수 범위</td>
                            <td>917.0MHz ~ 923.5MHz</td>
                          </tr>
                          <tr>
                            <td>주파수 간격</td>
                            <td>200kHz</td>
                          </tr>
                          <tr>
                            <td>채널 수</td>
                            <td>32개 (1CH: 917.1MHz ~ 32CH: 923.3MHz)</td>
                          </tr>
                          <tr>
                            <td>공중선 전력</td>
                            <td>10mW/MHz</td>
                          </tr>
                        </tbody>
                      </table>

                      <h5>사용온도</h5>
                      <table>
                        <tbody>
                          <tr>
                            <td>-30℃ ~ +50℃</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

export default BoardProducts;
