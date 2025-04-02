import React from "react";

function RnDBusiness() {
  return (
    <div className="rn-business">
      <h1>제품</h1>

      <section className="product-section">
        <h2>누출탐지센서</h2>
        <div className="product-item">
          <h3>초저전력 초음파 누출 탐지센서 (2024년 하반기 출시예정)</h3>
          <div className="features">
            <h4>제품 특징</h4>
            <ul>
              <li>초음파 수신거리 ~10m까지 수신가능</li>
              <li>C형배터리 2개(9,000mAh)로 12개월 이상 상시 누출탐지 가능</li>
              <li>C형배터리의 안정적인 전원공급을 위한 파워모듈 탑재</li>
              <li>배터리 잔량 체크모듈 탑재로 효율적인 관리 가능</li>
            </ul>
          </div>
        </div>

        <div className="product-item">
          <h3>LoRa 무선통신 중계기</h3>
          <div className="features">
            <h4>제품 특징</h4>
            <ul>
              <li>LoRa중계기 1대당 400대의 센서데이터 수신가능</li>
              <li>최대통신거리 2.5km 반경 이내의 데이터 수신가능</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="product-section">
        <h2>보드제품</h2>
        <div className="product-item">
          <h3>장비관리장치(INFO-EMU) (2024년 하반기 출시예정)</h3>
          <div className="features">
            <h4>기능</h4>
            <p>
              EMU는 문 열림 정보 수집, 함체 온도 모니터링, 전원 제어장치와 통신,
              이더넷 통신, 호환성 테스트를 위한 인터페이스 장치입니다.
            </p>
            <h4>규격</h4>
            <ul>
              <li>
                통신포트: 8개 이상의 Ethernet Port와 2개 시리얼 통신 Port 이상
              </li>
              <li>WDT(Watch Dog Timer)회로 내장: On/Off 기능 내장</li>
              <li>사용전압: +5V DC, +12V DC, -12V DC</li>
              <li>동작온도: -34 ℃ ~ +74 ℃</li>
              <li>상대습도: +4.4 ℃ ~ +44 ℃에서 10~90%</li>
            </ul>
          </div>
        </div>

        <div className="product-item">
          <h3>전원제어장치(INFO-PCU) (2024년 하반기 출시예정)</h3>
          <div className="features">
            <h4>기능 및 성능</h4>
            <p>
              전원제어장치는 EMU와 통신을 통해 주요 장치들의 전원을 제어하는
              기능을 수행하는 장치로, 전면에는 카메라부 저원을 조작하기 위한
              스위치를 부착하여야 하고, 후반부는 각 장치의 저원 공급 및 EMU화의
              통신 등을 위한 커텍터가 부착됩니다.
            </p>
            <p>
              전원을 제어하기 위하여 릴레이를 사용하여야 하며, 전원제어장치
              이상발생 시에도 전원이 공급될 수 있도록 하기위해 NC(Normal
              Close)판에 연괼됩니다.
            </p>
            <p>전원제어장치의 전원은 메인전원에서 직접 연결합니다.</p>
          </div>
        </div>

        <div className="product-item">
          <h3>누액감지단말장치(INFO-MDU) (2024년 하반기 출시예정)</h3>
          <div className="features">
            <h4>기능</h4>
            <p>
              누액 감시 단말 장치는 현장에서 누액을 감지하여 게이트웨이로
              송신합니다.
            </p>
            <p>
              센서는 유선으로 접속하며 최대 5개 까지 수용 가능하며 종류를
              구분하지 않고 모든 액체를 감지합니다.
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
                    <td>
                      <ul>
                        <li>전압: 88 ~264VAC</li>
                        <li>주파수 범위: 47 ~ 63Hz</li>
                        <li>누설 전류: 2mA이하</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>전압: DC24V</li>
                        <li>Ripple & Noise: 80mVp-p</li>
                        <li>Line Regulation: ±0.5%</li>
                        <li>Load Regulation: ±0.5%</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>전압: DC24V</li>
                        <li>Ripple & Noise: 120mVp-p</li>
                        <li>Line Regulation: ±1%</li>
                        <li>Load Regulation: ±2%</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h5>무선</h5>
              <table>
                <thead>
                  <tr>
                    <th>주파수</th>
                    <th>안테나</th>
                    <th>출력</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        <li>송신: 920.9MHz ~ 922.9MHz</li>
                        <li>주파수 범위: 47 ~ 63Hz</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>무지향성, Dipole Antenna</li>
                        <li>공중선의 편파특성: 수직, 수평 편파</li>
                        <li>안테나 이득: 3.83 dBI(925MHz)</li>
                        <li>크기: 10.2 x 108.1 mm</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>10mW 이하</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h5>사용온도</h5>
              <p>-20℃ ~ +50℃</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RnDBusiness;
