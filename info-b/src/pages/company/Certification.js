import React, { useState } from "react";
import "../../styles/pages/_certification.scss";

// 인증서 이미지 import
import certification001 from "../../resources/images/certificate/certification-001.png";
import certification002 from "../../resources/images/certificate/certification-002.png";
import certification003 from "../../resources/images/certificate/certification-004.png";
import certification004 from "../../resources/images/certificate/certification-005.png";
import certification005 from "../../resources/images/certificate/certification-006.png";

// 특허 이미지 import
import patent001 from "../../resources/images/patent/patent-001.png";
import patent002 from "../../resources/images/patent/patent-002.png";
import patent003 from "../../resources/images/patent/patent-003.png";
import patent004 from "../../resources/images/patent/patent-004.png";
import patent005 from "../../resources/images/patent/patent-005.jpg";

const Certification = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("certifications"); // "certifications" or "patents"

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const certifications = [
    {
      id: 1,
      image: certification001,
      title: "기업부설연구소 인정서",
      description: [
        "- 과학기술정보통신부 장관 명의로 발급",
        "- 기업의 연구개발능력 인정",
        "- 글로벌 경쟁력 확보를 위한 연구소 운영",
      ],
    },
    {
      id: 2,
      image: certification002,
      title: "벤처기업 확인서",
      description: [
        "- 중소벤처기업부 발급",
        "- 기술성과와 사업성 우수 기업 인정",
        "- 혁신적 기술개발과 성장잠재력 보유",
      ],
    },
    {
      id: 3,
      image: certification003,
      title: "ISO 27001 인증서",
      description: [
        "- 정보보안관리체계 국제표준 인증",
        "- 고객 정보보호 최우선 기업",
        "- 체계적인 보안 관리 시스템 구축",
      ],
    },
    {
      id: 4,
      image: certification004,
      title: "소프트웨어사업자 신고확인서",
      description: [
        "- 소프트웨어 산업 진흥법 의거 등록",
        "- 전문적 소프트웨어 개발 능력 인정",
        "- 소프트웨어 공급 자격 보유",
      ],
    },
    {
      id: 5,
      image: certification005,
      title: "중소기업 확인서",
      description: [
        "- 중소기업기본법 제2조 의거 확인",
        "- 중소기업 경쟁력 강화 기업",
        "- 혁신성장 선도 기업",
      ],
    },
  ];

  const patents = [
    {
      id: 1,
      image: patent001,
      title: "가로등 고장 감지 장치",
      description: [
        "- 특허번호: 제 10-2073589호",
        "- 등록일: 2020년 1월 30일",
        "- 실시간 고장 감지 및 모니터링 시스템",
      ],
    },
    {
      id: 2,
      image: patent002,
      title: "무선충전 기능을 구비한 다이어리 설치용 다용도 충전장치",
      description: [
        "- 특허번호: 제 10-1520935호",
        "- 등록일: 2015년 5월 11일",
        "- 다이어리 결합형 무선충전 시스템",
      ],
    },
    {
      id: 3,
      image: patent003,
      title: "휴대용 충전 장치 및 그의 충방전 방법",
      description: [
        "- 특허번호: 제 10-1453929호",
        "- 등록일: 2014년 10월 16일",
        "- 효율적 충방전 방식 적용",
      ],
    },
    {
      id: 4,
      image: patent004,
      title: "휴대용 충전 장치",
      description: [
        "- 특허번호: 제 10-1456582호",
        "- 등록일: 2014년 10월 24일",
        "- 혁신적 디자인과 기능 결합",
      ],
    },
    {
      id: 5,
      image: patent005,
      title: "시간-주파수 변환을 이용한 플랜트 설비의 누출음 탐지 장치 및 방법",
      description: [
        "- 특허번호: 제 10-1958628호",
        "- 등록일: 2019년 3월 11일",
        "- 플랜트 설비 누출 감지 기술",
      ],
    },
  ];

  return (
    <div className="certification">
      <div className="certification__container">
        <div className="certification__header">
          <h1 className="title">인증 및 특허</h1>
          <p className="subtitle">
            INFOB의 기술력과 신뢰성을 인정받은 다양한 인증서와 특허입니다
          </p>
        </div>

        <div className="certification__tabs">
          <button
            className={`certification__tab ${
              activeTab === "certifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("certifications")}
          >
            인증서
          </button>
          <button
            className={`certification__tab ${
              activeTab === "patents" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patents")}
          >
            특허
          </button>
        </div>

        {activeTab === "certifications" && (
          <section className="certification__section">
            <div className="certification__grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification__card">
                  <div
                    className="certification__image"
                    onClick={() => openModal(cert.image)}
                  >
                    <img src={cert.image} alt={cert.title} />
                    <div className="certification__overlay">
                      <span className="certification__zoom">확대보기</span>
                    </div>
                  </div>
                  <div className="certification__content">
                    <h3 className="certification__title">{cert.title}</h3>
                    <ul className="certification__description">
                      {cert.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "patents" && (
          <section className="certification__section">
            <div className="certification__grid">
              {patents.map((patent) => (
                <div key={patent.id} className="certification__card">
                  <div
                    className="certification__image"
                    onClick={() => openModal(patent.image)}
                  >
                    <img src={patent.image} alt={patent.title} />
                    <div className="certification__overlay">
                      <span className="certification__zoom">확대보기</span>
                    </div>
                  </div>
                  <div className="certification__content">
                    <h3 className="certification__title">{patent.title}</h3>
                    <ul className="certification__description">
                      {patent.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {modalOpen && (
        <div className="certification__modal" onClick={closeModal}>
          <div className="certification__modal-content">
            <img src={selectedImage} alt="확대된 이미지" />
            <button className="certification__modal-close" onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certification;
