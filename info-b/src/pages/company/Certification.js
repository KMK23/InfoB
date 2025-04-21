import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCertifications } from "../../store/slices/certificationsSlice";
import "../../styles/pages/_certification.scss";
import icon_search from "../../resources/images/main/icon_search.png";

// 인증서 이미지 import
import certification001 from "../../resources/images/certificate/certification-001.png";
import certification002 from "../../resources/images/certificate/certification-002.png";
import certification004 from "../../resources/images/certificate/certification-004.png";
import certification005 from "../../resources/images/certificate/certification-005.png";
import certification006 from "../../resources/images/certificate/certification-006.png";

// 특허 이미지 import
import patent001 from "../../resources/images/patent/patent-001.png";
import patent002 from "../../resources/images/patent/patent-002.png";
import patent003 from "../../resources/images/patent/patent-003.png";
import patent004 from "../../resources/images/patent/patent-004.png";
import patent005 from "../../resources/images/patent/patent-005.jpg";

const certificationImages = {
  "certification-001.png": certification001, // 기업부설연구소
  "certification-002.png": certification002, // 벤처기업확인서
  "certification-004.png": certification004, // 소프트웨어사업자 신고확인서
  "certification-005.png": certification005, // 중소기업확인서
  "certification-006.png": certification006, // 직접생산확인증명서
};

const patentImages = {
  "patent-001.png": patent001,
  "patent-002.png": patent002,
  "patent-003.png": patent003,
  "patent-004.png": patent004,
  "patent-005.jpg": patent005,
};

const Certification = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("certification"); // "certification" or "patent"

  const dispatch = useDispatch();
  const { certifications: certData, status } = useSelector(
    (state) => state.certifications
  );

  useEffect(() => {
    dispatch(
      fetchCertifications({
        collectionName: "certifications",
        queryOptions: {},
      })
    );
  }, [dispatch]);

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

  if (status === "loading") {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (!certData || !Array.isArray(certData) || certData.length === 0) {
    return <div>인증서 및 특허 정보를 찾을 수 없습니다.</div>;
  }

  const certificationData = certData[0];
  if (!certificationData?.company?.certifications?.items) {
    return <div>데이터 구조가 올바르지 않습니다.</div>;
  }

  const items = certificationData.company.certifications.items;
  const certifications = items.filter((item) => item.type === "certification");
  const patents = items.filter((item) => item.type === "patent");

  return (
    <div className="certification">
      <div className="certification__container">
        <div className="certification__header">
          <h1 className="title">
            {certificationData.company.certifications.title || "인증 및 특허"}
          </h1>
          <p className="subtitle">
            {certificationData.company.certifications.subtitle ||
              "INFOB의 기술력과 신뢰성을 인정받은 다양한 인증서와 특허입니다"}
          </p>
          <div className="intro">
            {certificationData.company.certifications.intro.map(
              (item, index) => (
                <p key={index}>{item}</p>
              )
            )}
          </div>
        </div>

        <div className="certification__tabs">
          <button
            className={`certification__tab ${
              activeTab === "certification" ? "active" : ""
            }`}
            onClick={() => setActiveTab("certification")}
          >
            인증서
          </button>
          <button
            className={`certification__tab ${
              activeTab === "patent" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patent")}
          >
            특허
          </button>
        </div>

        {activeTab === "certification" && (
          <section className="certification__section">
            <div className="certification__grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification__card">
                  <div
                    className="certification__image"
                    onClick={() => openModal(certificationImages[cert.image])}
                  >
                    <img
                      src={certificationImages[cert.image]}
                      alt={cert.title}
                    />
                    <div className="certification__overlay">
                      <div className="certification__zoom">
                        <img
                          src={icon_search}
                          alt="확대보기"
                          className="certification__zoom-icon"
                        />
                      </div>
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

        {activeTab === "patent" && (
          <section className="certification__section">
            <div className="certification__grid">
              {patents.map((patent) => (
                <div key={patent.id} className="certification__card">
                  <div
                    className="certification__image"
                    onClick={() => openModal(patentImages[patent.image])}
                  >
                    <img src={patentImages[patent.image]} alt={patent.title} />
                    <div className="certification__overlay">
                      <div className="certification__zoom">
                        <img
                          src={icon_search}
                          alt="확대보기"
                          className="certification__zoom-icon"
                        />
                      </div>
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
