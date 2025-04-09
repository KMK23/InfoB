import React, { useState } from "react";
import "../../styles/pages/_businessInfo.scss";
import {
  FaChartLine,
  FaServer,
  FaUserCog,
  FaHeadset,
  FaChartBar,
  FaShieldAlt,
  FaBriefcase,
  FaLightbulb,
  FaCogs,
  FaMicrochip,
} from "react-icons/fa";

const BusinessInfo = () => {
  const [activeTab, setActiveTab] = useState("SI");

  const siAreas = [
    {
      id: 1,
      title: "SI Consulting",
      icon: <FaChartLine />,
      items: [
        "정보화 전략",
        "솔루션 기반 컨설팅",
        "사용자 요구사항 분석 및 최적안 제시",
      ],
    },
    {
      id: 2,
      title: "SW/HW 판매 관리",
      icon: <FaServer />,
      items: [
        "하드웨어 발주",
        "최적의 하드웨어 선정",
        "고객의 환경에 적합한 시스템 설계",
      ],
    },
    {
      id: 3,
      title: "System 구축",
      icon: <FaUserCog />,
      items: [
        "고객 맞춤형 시스템 구축",
        "각 분야별 업무전산화 구축",
        "통합 솔루션 제공",
      ],
    },
    {
      id: 4,
      title: "기술 지원",
      icon: <FaHeadset />,
      items: [
        "각 영역별 전문 담당자에 의한 상담",
        "정확한 장애진단 및 문제해결",
      ],
    },
  ];

  const consultingAreas = [
    {
      id: 1,
      title: "Solution Consulting",
      icon: <FaLightbulb />,
      items: [
        "고객사 시스템 구성 고려하여 ERP, EP, ISP 공공, 제조 서비스 산업 군별로 최적의 솔루션 제안",
      ],
    },
    {
      id: 2,
      title: "Specialization Consulting",
      icon: <FaShieldAlt />,
      items: [
        "통합 보안 서비스종합환경 서비스",
        "종합 자원 전사적 자원관리 시스템 서비스",
        "EnterPrise Portal 솔루션 구축 서비스",
      ],
    },
    {
      id: 3,
      title: "Business Consulting",
      icon: <FaBriefcase />,
      items: [
        "비즈니스 컨설팅 서비스",
        "e-Biz 서비스경영 정보 관리 시스템 구축 서비스",
        "제품 수명 주기 관리",
        "B2B, B2C, B2G",
      ],
    },
  ];

  // const centerInfo = {
  //   title: "LUCOMS CNS",
  //   description: "SI & Consulting",
  //   subItems: [
  //     {
  //       title: "국내 최고 수준의 SI 및 컨설팅 전문성",
  //       value: "",
  //     },
  //     {
  //       title: "24시간 365일 기술지원",
  //       value: "무중단 서비스",
  //     },
  //     {
  //       title: "맞춤형 솔루션",
  //       value: "고객 중심 서비스",
  //     },
  //   ],
  // };

  return (
    <div className="business-info">
      <div className="business-info__intro">
        <div className="business-info__intro-content">
          <div className="business-info__intro-title">
            <h1>
              {/* <span className="highlight-text">사업분야</span> */}
              <span className="main-text">Consulting, SI</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="business-info__tabs">
        <button
          className={`tab-button ${activeTab === "SI" ? "active" : ""}`}
          onClick={() => setActiveTab("SI")}
        >
          SI
        </button>
        <button
          className={`tab-button ${activeTab === "Consulting" ? "active" : ""}`}
          onClick={() => setActiveTab("Consulting")}
        >
          Consulting
        </button>
      </div>

      <div className="business-info__cards">
        {activeTab === "SI" ? (
          <div className="business-info__card-grid si-grid">
            {siAreas.map((area) => (
              <div key={area.id} className="business-info__card">
                <div className="card-icon">{area.icon}</div>
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="business-info__card-grid consulting-grid">
            {consultingAreas.map((area) => (
              <div key={area.id} className="business-info__card">
                <div className="card-icon">{area.icon}</div>
                <h3>{area.title}</h3>
                <ul>
                  {area.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="business-info__footer">
        <div className="business-info__stats">
          {centerInfo.subItems.map((item, index) => (
            <div key={index} className="business-info__stat-item">
              <h4>{item.title}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default BusinessInfo;
