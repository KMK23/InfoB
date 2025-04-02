import React from "react";
import "../../styles/pages/_performanceCase.scss";

function PerformanceCase() {
  return (
    <div className="performance-case">
      <div className="page-title">
        <h2>구축 사례</h2>
        <p>
          다양한 분야의 프로젝트 수행 경험을 통해 축적된 기술력으로 최상의
          서비스를 제공합니다.
        </p>
      </div>

      <div className="cases-container">
        <div className="year-section">
          <h3>2021년</h3>
          <ul>
            <li>
              <span className="client">국세청</span>
              <span className="project">
                국세청 "빅데이터를 활용한 분석모델 개발 사업" - 옥타곤(시간화툴)
                기술지원
              </span>
            </li>
            <li>
              <span className="client">조달청</span>
              <span className="project">차세대 RFID물품관리시스템 구축</span>
            </li>
            <li>
              <span className="client">엔텔스</span>
              <span className="project">
                다중무선센서기반고로노체 CO가스, 고온모니터링을 통한 사전 작업자
                안전 계약변경 합의서
              </span>
            </li>
            <li>
              <span className="client">한국산업기술평가관리원</span>
              <span className="project">KEIT 스마트 RCMS 고도화 사업</span>
            </li>
            <li>
              <span className="client">KISTI</span>
              <span className="project">
                2021년 국가과학기술지식정보서비스 및 NTIS 데이터
                연계/정제/품질관리 체계 구축
              </span>
            </li>
            <li>
              <span className="client">관세청</span>
              <span className="project">
                관세청 2021년 빅데이터 플랫폼 기반 분선모델 개발 사업
              </span>
            </li>
            <li>
              <span className="client">조달청</span>
              <span className="project">
                선제적 AI 기반 조달요청 발주지원 시스템 구축(포털개발)
              </span>
            </li>
          </ul>
        </div>

        <div className="year-section">
          <h3>2020년</h3>
          <ul>
            <li>
              <span className="client">조달청</span>
              <span className="project">
                차세대 RFID물품관리시스템 구축 사업(응용 개발 부문)
              </span>
            </li>
            <li>
              <span className="client">국가정보자원관리원</span>
              <span className="project">
                2020년 제1차 범정부 정보자원 통합구축 HW1 사업
              </span>
            </li>
            <li>
              <span className="client">국가철도공단</span>
              <span className="project">KR 재산관리통합시스템 구축 용역</span>
            </li>
            <li>
              <span className="client">조달청</span>
              <span className="project">
                혁신상품 공공조달 플랫폼 2단계 시스템 구축
              </span>
            </li>
            <li>
              <span className="client">㈜원언더스텐드</span>
              <span className="project">
                차세대 포토카드 출력 플랫폼 개발(추가 개발분 포함)
              </span>
            </li>
          </ul>
        </div>

        <div className="year-section">
          <h3>2019년</h3>
          <ul>
            <li>
              <span className="client">국민권익위원회</span>
              <span className="project">
                한국정보화진흥원_지능정보 기반 차세대 신문고 구축/분석 및 설계
              </span>
            </li>
            <li>
              <span className="client">소방청</span>
              <span className="project">
                소방공무원 보건안전 관리시스템 구축사업
              </span>
            </li>
            <li>
              <span className="client">화인시스템</span>
              <span className="project">
                태양광 연계 및 ESS용 EMS소프트웨어 개발
              </span>
            </li>
            <li>
              <span className="client">국토부</span>
              <span className="project">GIS 기반 통합상황관리 시스템 구축</span>
            </li>
            <li>
              <span className="client">조달청</span>
              <span className="project">
                국유재산조사관리시스템 3차 고도화 사업
              </span>
            </li>
          </ul>
        </div>

        <div className="year-section">
          <h3>2018년</h3>
          <ul>
            <li>
              <span className="client">인사혁신처</span>
              <span className="project">
                2018년 국가인재데이터베이스 유지보수 용역
              </span>
            </li>
            <li>
              <span className="client">엔텔스</span>
              <span className="project">전력소프트 공통 플랫폼 개발</span>
            </li>
            <li>
              <span className="client">특허청</span>
              <span className="project">특허청 전산자원 도입사업</span>
            </li>
            <li>
              <span className="client">전자통신연구소</span>
              <span className="project">
                복합재난 예측시나리오 재난 설정 및 연계모듈 개발
              </span>
            </li>
          </ul>
        </div>

        <div className="year-section">
          <h3>2017년</h3>
          <ul>
            <li>
              <span className="client">Joy 디자인</span>
              <span className="project">
                WCD용 제어 및 모니터링 어플(앱) 계약
              </span>
            </li>
            <li>
              <span className="client">특허청</span>
              <span className="project">
                2017년 제2차 범정부 정보자원 통합구축 HW1사업/통신장비설치
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCase;
