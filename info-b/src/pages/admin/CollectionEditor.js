import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollection,
  updateCollection,
  clearError,
} from "../../store/slices/collectionSlice";
import {
  fetchCollectionData,
  updateCollectionData,
} from "../../store/slices/adminSlice";
import { fetchProducts } from "../../store/slices/productsSlice";
import "../../styles/pages/admin/_collectionEditor.scss";
import KakaoMap from "../../components/KaKaoMap";
import CeoForm from "../../components/admin/forms/CeoForm";
import HistoryForm from "../../components/admin/forms/HistoryForm";
import CertificationForm from "../../components/admin/forms/CertificationForm";
import LocationForm from "../../components/admin/forms/LocationForm";
import SolutionForm from "../../components/admin/forms/SolutionForm";
import ServiceForm from "../../components/admin/forms/ServiceForm";
import CasesForm from "../../components/admin/forms/CasesForm";
import RecruitmentForm from "../../components/admin/forms/RecruitmentForm";
import BenefitsForm from "../../components/admin/forms/BenefitsForm";
import RnDForm from "../../components/admin/forms/RnDForm";

const COLLECTIONS = {
  company: {
    label: "회사 소개",
    sections: [
      {
        id: "ceo",
        label: "CEO 인사말",
        collection: "basicInfo",
      },
      {
        id: "history",
        label: "연혁",
        collection: "hisory",
      },
      {
        id: "certification",
        label: "인증 및 특허",
        collection: "certifications",
      },
      {
        id: "location",
        label: "오시는 길",
        collection: "basicInfo",
      },
    ],
  },
  business: {
    label: "사업 소개",
    sections: [
      {
        id: "solution",
        label: "솔루션",
        collection: "business",
      },
      {
        id: "RnD",
        label: "RnD 연구사업",
        collection: "productDetail",
      },
    ],
  },
  performance: {
    label: "수행실적",
    sections: [
      {
        id: "cases",
        label: "수행사례",
        collection: "performance",
      },
    ],
  },
  talent: {
    label: "채용",
    sections: [
      {
        id: "recruitment",
        label: "채용정보",
        collection: "talent",
      },
      {
        id: "benefits",
        label: "복리후생",
        collection: "talent",
      },
    ],
  },
};

const CollectionEditor = () => {
  const dispatch = useDispatch();
  const [selectedCollection, setSelectedCollection] = useState("company");
  const [selectedSection, setSelectedSection] = useState("ceo");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [activeRnDTab, setActiveRnDTab] = useState("sensor");

  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    const currentSection = COLLECTIONS[selectedCollection].sections.find(
      (section) => section.id === selectedSection
    );
    if (currentSection) {
      dispatch(
        fetchProducts({
          collectionName: currentSection.collection,
          queryOptions: {},
        })
      );
    }
  }, [dispatch, selectedCollection, selectedSection]);

  const handleEdit = (productType, productIndex) => {
    if (!products || !products[0]) return;

    const data = products[0];
    let editContent = {};

    switch (selectedSection) {
      case "ceo":
        editContent = {
          title: data.company?.ceo?.message?.title,
          content: [...(data.company?.ceo?.message?.content || [])],
          name: data.company?.ceo?.name,
          position: data.company?.ceo?.position,
        };
        break;
      case "history":
        editContent = {
          timeline: data.company?.history?.timeline
            ? JSON.parse(JSON.stringify(data.company.history.timeline))
            : {},
        };
        break;
      case "certification":
        editContent = {
          title: data.company?.certifications?.title,
          subtitle: data.company?.certifications?.subtitle,
          items: data.company?.certifications?.items
            ? JSON.parse(JSON.stringify(data.company.certifications.items))
            : [],
        };
        break;
      case "location":
        editContent = {
          address: data.company?.location?.address || {
            main: "",
            old: "",
          },
          contact: data.company?.location?.contact || {
            tel: "",
            fax: "",
          },
        };
        break;
      case "solution":
        editContent = {
          company: {
            business: {
              si: {
                areas: data.company?.business?.si?.areas
                  ? JSON.parse(JSON.stringify(data.company.business.si.areas))
                  : [],
              },
              consulting: {
                areas: data.company?.business?.consulting?.areas
                  ? JSON.parse(
                      JSON.stringify(data.company.business.consulting.areas)
                    )
                  : [],
              },
            },
          },
        };
        break;
      case "service":
        editContent = {
          services: [...(data.services || [])],
        };
        break;
      case "cases":
        editContent = {
          performanceCases: [...(data.cases || [])],
        };
        break;
      case "recruitment":
        editContent = {
          recruitmentInfo: [...(data.recruitment || [])],
        };
        break;
      case "benefits":
        editContent = {
          benefits: [...(data.benefits || [])],
        };
        break;
      case "RnD":
        if (productType === "leakDetection") {
          editContent = {
            productType: "leakDetection",
            productIndex: productIndex,
            product: data.leakDetection[productIndex]
              ? JSON.parse(JSON.stringify(data.leakDetection[productIndex]))
              : null,
          };
        } else if (productType === "boardProducts") {
          editContent = {
            productType: "boardProducts",
            productIndex: productIndex,
            product: data.boardProducts[productIndex]
              ? JSON.parse(JSON.stringify(data.boardProducts[productIndex]))
              : null,
          };
        }
        break;
      default:
        break;
    }

    setEditData(editContent);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!products || !products[0]) return;

      const updatedData = JSON.parse(JSON.stringify(products[0]));
      const currentSection = COLLECTIONS[selectedCollection].sections.find(
        (section) => section.id === selectedSection
      );

      switch (selectedSection) {
        case "ceo":
          if (!updatedData.company) updatedData.company = {};
          if (!updatedData.company.ceo) updatedData.company.ceo = {};
          updatedData.company.ceo = {
            ...updatedData.company.ceo,
            name: editData.name,
            position: editData.position,
            message: {
              title: editData.title,
              content: editData.content,
            },
          };
          break;
        case "history":
          if (!updatedData.company) updatedData.company = {};
          updatedData.company = {
            ...updatedData.company,
            history: {
              title: "회사연혁",
              subtitle: "현재 디지털화의 혁신을 완벽하게 실현합니다.",
              timeline: editData.timeline,
            },
          };
          break;
        case "certification":
          if (!updatedData.company) updatedData.company = {};
          updatedData.company.certifications = {
            title: editData.title,
            subtitle: editData.subtitle,
            items: editData.items,
          };
          break;
        case "location":
          if (!updatedData.company) updatedData.company = {};
          updatedData.company.location = {
            address: editData.address,
            contact: editData.contact,
          };
          break;
        case "solution":
          if (!updatedData.company) updatedData.company = {};
          if (!updatedData.company.business) updatedData.company.business = {};
          updatedData.company.business = {
            si: {
              areas: editData.company.business.si.areas,
            },
            consulting: {
              areas: editData.company.business.consulting.areas,
            },
          };
          break;
        case "service":
          updatedData.services = editData.services;
          break;
        case "cases":
          updatedData.cases = editData.performanceCases;
          break;
        case "recruitment":
          updatedData.recruitment = editData.recruitmentInfo;
          break;
        case "benefits":
          updatedData.benefits = editData.benefits;
          break;
        case "RnD":
          if (editData.productType === "leakDetection") {
            if (!updatedData.leakDetection) updatedData.leakDetection = [];
            updatedData.leakDetection[editData.productIndex] = editData.product;
          } else if (editData.productType === "boardProducts") {
            if (!updatedData.boardProducts) updatedData.boardProducts = [];
            updatedData.boardProducts[editData.productIndex] = editData.product;
          }
          break;
        default:
          break;
      }

      console.log("저장할 데이터:", updatedData);

      await dispatch(
        updateCollection({
          collectionName: currentSection.collection,
          docId: products[0].docId,
          data: updatedData,
        })
      ).unwrap();

      setIsEditing(false);
      dispatch(
        fetchProducts({
          collectionName: currentSection.collection,
          queryOptions: {},
        })
      );

      alert("성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("저장 중 오류:", error);
      alert("저장 중 오류가 발생했습니다: " + error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const renderContent = () => {
    if (!products || !products[0]) {
      return <div className="loading">데이터를 불러오는 중...</div>;
    }

    const data = products[0];
    console.log("현재 데이터:", data);

    switch (selectedSection) {
      case "ceo":
        return (
          <div className="view-mode">
            <h3>{data.company?.ceo?.message?.title}</h3>
            <div className="content">
              {data.company?.ceo?.message?.content?.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
            <div className="ceo-info">
              <p className="position">{data.company?.ceo?.position}</p>
              <p className="name">{data.company?.ceo?.name}</p>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="view-mode">
            <h3>{data.company?.history?.title}</h3>
            <p>{data.company?.history?.subtitle}</p>
            <div className="timeline">
              {Object.entries(data.company?.history?.timeline || {})
                .sort(([yearA], [yearB]) => yearB - yearA)
                .map(([year, yearData]) => (
                  <div key={year} className="year-section">
                    <h4>{year}년</h4>
                    <ul>
                      {yearData.events &&
                        yearData.events.map((event, index) => (
                          <li key={index}>{event.content}</li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        );
      case "certification":
        return (
          <div className="view-mode">
            <h3>{data.company?.certifications?.title}</h3>
            <p>{data.company?.certifications?.subtitle}</p>
            <div className="certifications-list">
              {data.company?.certifications?.items?.map((cert) => (
                <div key={cert.id} className="certification-item">
                  <h4>{cert.title}</h4>
                  {cert.image && (
                    <div className="cert-image">
                      <img src={cert.image} alt={cert.title} />
                    </div>
                  )}
                  <div className="description">
                    {cert.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "location":
        return (
          <div className="view-mode">
            <h3>오시는 길</h3>
            <div className="location-info">
              <p>
                <strong>주소:</strong> {data.company?.address?.main}
                <br />
                {data.company?.address?.old}
              </p>
              <div className="contact-info">
                <p>
                  <strong>연락처:</strong>
                  <br />
                  전화: {data.company?.contact?.tel}
                  <br />
                  팩스: {data.company?.contact?.fax}
                </p>
              </div>
              <div className="map-container">
                <KakaoMap
                  address={data.company?.address?.main}
                  name={data.company?.name || "인포비"}
                />
              </div>
            </div>
          </div>
        );
      case "solution":
        return (
          <div className="view-mode">
            <div className="solutions">
              {data?.company?.business?.si?.areas?.map((area, index) => (
                <div key={index} className="solution-item">
                  <h4>{area.title}</h4>
                  <ul>
                    {area.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {data?.company?.business?.consulting?.areas?.map(
                (area, index) => (
                  <div key={index} className="solution-item">
                    <h4>{area.title}</h4>
                    <ul>
                      {area.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        );
      case "service":
        return (
          <div className="view-mode">
            <div className="editor-header">
              <h3>서비스</h3>
              <button
                className="edit-button"
                onClick={() => handleEdit("leakDetection", null)}
              >
                수정하기
              </button>
            </div>
            <div className="services">
              {data?.company?.about?.services?.map((service, index) => (
                <div key={index} className="service-item">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="image-info">
                    <span>이미지 클래스: {service.imageClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "cases":
        return (
          <div className="view-mode">
            <h3>수행사례</h3>
            <div className="cases">
              {data?.cases?.map((case_, index) => (
                <div key={index} className="case-item">
                  <h4>{case_.title}</h4>
                  <p>{case_.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "recruitment":
        return (
          <div className="view-mode">
            <h3>채용정보</h3>
            <div className="recruitment-info">
              {data?.recruitment?.map((info, index) => (
                <div key={index} className="recruitment-item">
                  <h4>{info.title}</h4>
                  <p>{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "benefits":
        return (
          <div className="view-mode">
            <h3>복리후생</h3>
            <div className="benefits">
              {data?.benefits?.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "RnD":
        return (
          <div className="view-mode">
            <div className="rnd-sections">
              {/* 누출탐지센서 섹션 */}
              <div className="section">
                <div className="section-header">
                  <h3>누출탐지센서</h3>
                  <button
                    className="add-button"
                    onClick={() => handleEdit("leakDetection", null)}
                  >
                    새 누출탐지센서 추가
                  </button>
                </div>
                <div className="items-list">
                  {data?.leakDetection?.map((item, index) => (
                    <div key={index} className="item">
                      <div className="item-header">
                        <h4>{item.name}</h4>
                        <div className="button-group">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit("leakDetection", index)}
                          >
                            수정
                          </button>
                          <button className="delete-button">삭제</button>
                        </div>
                      </div>
                      <div className="item-content">
                        <p>
                          <strong>ID:</strong> {item.id}
                        </p>
                        <p>
                          <strong>출시예정:</strong> {item.releaseDate}
                        </p>
                        <div className="description">
                          {item.features?.description?.map((desc, i) => (
                            <p key={i}>{desc}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 보드제품 섹션 */}
              <div className="section">
                <div className="section-header">
                  <h3>보드제품</h3>
                  <button
                    className="add-button"
                    onClick={() => handleEdit("boardProducts", null)}
                  >
                    새 보드제품 추가
                  </button>
                </div>
                <div className="items-list">
                  {data?.boardProducts?.map((item, index) => (
                    <div key={index} className="item">
                      <div className="item-header">
                        <h4>{item.name}</h4>
                        <div className="button-group">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit("boardProducts", index)}
                          >
                            수정
                          </button>
                          <button className="delete-button">삭제</button>
                        </div>
                      </div>
                      <div className="item-content">
                        <p>
                          <strong>ID:</strong> {item.id}
                        </p>
                        <p>
                          <strong>출시예정:</strong> {item.releaseDate}
                        </p>
                        <div className="description">
                          <p>{item.features?.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>선택된 섹션의 데이터를 표시할 수 없습니다.</div>;
    }
  };

  const renderForm = () => {
    if (!editData) return null;

    switch (selectedSection) {
      case "ceo":
        return <CeoForm editData={editData} setEditData={setEditData} />;
      case "history":
        return <HistoryForm editData={editData} setEditData={setEditData} />;
      case "certification":
        return (
          <CertificationForm editData={editData} setEditData={setEditData} />
        );
      case "location":
        return <LocationForm editData={editData} setEditData={setEditData} />;
      case "solution":
        return <SolutionForm editData={editData} setEditData={setEditData} />;
      case "service":
        return <ServiceForm editData={editData} setEditData={setEditData} />;
      case "cases":
        return <CasesForm editData={editData} setEditData={setEditData} />;
      case "recruitment":
        return (
          <RecruitmentForm editData={editData} setEditData={setEditData} />
        );
      case "benefits":
        return <BenefitsForm editData={editData} setEditData={setEditData} />;
      case "RnD":
        return <RnDForm editData={editData} setEditData={setEditData} />;
      default:
        return <div>해당 섹션의 수정 폼을 표시할 수 없습니다.</div>;
    }
  };

  return (
    <div className="collection-editor">
      <div className="editor-header">
        <h2>컬렉션 데이터 관리</h2>
        <div className="selector-group">
          <select
            value={selectedCollection}
            onChange={(e) => {
              setSelectedCollection(e.target.value);
              setSelectedSection(COLLECTIONS[e.target.value].sections[0].id);
              setIsEditing(false);
            }}
            disabled={isEditing}
          >
            {Object.entries(COLLECTIONS).map(([key, collection]) => (
              <option key={key} value={key}>
                {collection.label}
              </option>
            ))}
          </select>

          <select
            value={selectedSection}
            onChange={(e) => {
              setSelectedSection(e.target.value);
              setIsEditing(false);
            }}
            disabled={isEditing}
          >
            <option value="">섹션 선택</option>
            {selectedCollection &&
              COLLECTIONS[selectedCollection].sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {selectedSection && !isEditing && (
        <div className="action-buttons">
          <button
            className="edit-button"
            onClick={() => handleEdit("leakDetection", null)}
          >
            수정하기
          </button>
        </div>
      )}

      <div className="editor-content">
        {status === "loading" ? (
          <div className="loading">로딩 중...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {!isEditing && renderContent()}
            {isEditing && (
              <>
                <div className="action-buttons">
                  <button className="save-button" onClick={handleSave}>
                    저장하기
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>
                    취소하기
                  </button>
                </div>
                {renderForm()}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionEditor;
