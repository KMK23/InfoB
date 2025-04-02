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
      description:
        "기업부설연구소를 설치·운영하여 과학기술 분야 / 제14조제4항 규정 기업의 연구개발능력을 인정받아 설립, 인정번호와 함께 과학기술정보통신부 장관 명의로 발급받았습니다. 기업의 기술 개발과 혁신적인 연구로 글로벌 경쟁력을 확보하기 위한 연구소를 운영하고 있습니다.",
    },
    {
      id: 2,
      image: certification002,
      title: "벤처기업 확인서",
      description:
        "벤처기업육성에 관한 특별조치법에 의거하여 기술성과 사업성이 우수한 기업으로 인정받아 벤처기업임을 확인받았으며, 혁신적인 기술개발과 성장잠재력을 인정받아 중소벤처기업부로부터 발급받았습니다.",
    },
    {
      id: 3,
      image: certification003,
      title: "ISO 27001 인증서",
      description:
        "정보보안관리체계에 대한 국제표준 인증으로, 조직의 정보보안 관리체계가 국제표준에 부합함을 인증받았습니다. 고객의 정보보호와 보안을 최우선으로 하는 기업임을 입증하였습니다.",
    },
    {
      id: 4,
      image: certification004,
      title: "소프트웨어사업자 신고확인서",
      description:
        "소프트웨어 산업 진흥법에 의거하여 소프트웨어사업자로 등록되어 있음을 확인받았습니다. 이를 통해 전문적인 소프트웨어 개발 및 공급 능력을 인정받았습니다.",
    },
    {
      id: 5,
      image: certification005,
      title: "중소기업 확인서",
      description:
        "중소기업기본법 제2조에 의한 중소기업임을 확인받았으며, 대한민국 중소기업의 경쟁력 강화와 혁신성장을 선도하는 기업으로 인정받았습니다.",
    },
  ];

  const patents = [
    {
      id: 1,
      image: patent001,
      title: "가로등 고장 감지 장치",
      description:
        "특허번호: 제 10-2073589호\n등록일: 2020년 1월 30일\n가로등의 고장을 실시간으로 감지하고 모니터링하는 시스템에 관한 특허입니다.",
    },
    {
      id: 2,
      image: patent002,
      title: "무선충전 기능을 구비한 다이어리 설치용 다용도 충전장치",
      description:
        "특허번호: 제 10-1520935호\n등록일: 2015년 5월 11일\n다이어리와 결합된 무선충전 시스템의 혁신적인 설계에 관한 특허입니다.",
    },
    {
      id: 3,
      image: patent003,
      title: "휴대용 충전 장치 및 그의 충방전 방법",
      description:
        "특허번호: 제 10-1453929호\n등록일: 2014년 10월 16일\n효율적인 충방전 방식을 적용한 휴대용 충전 장치에 관한 특허입니다.",
    },
    {
      id: 4,
      image: patent004,
      title: "휴대용 충전 장치",
      description:
        "특허번호: 제 10-1456582호\n등록일: 2014년 10월 24일\n혁신적인 디자인과 기능을 결합한 휴대용 충전 장치에 관한 특허입니다.",
    },
    {
      id: 5,
      image: patent005,
      title: "시간-주파수 변환을 이용한 플랜트 설비의 누출음 탐지 장치 및 방법",
      description:
        "특허번호: 제 10-1958628호\n등록일: 2019년 3월 11일\n플랜트 설비의 누출을 효과적으로 감지하는 첨단 기술에 관한 특허입니다.",
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

        <section className="certification__section">
          <h2 className="section-title">인증서</h2>
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
                  <p className="certification__description">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="certification__section">
          <h2 className="section-title">특허</h2>
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
                  <p className="certification__description">
                    {patent.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
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
