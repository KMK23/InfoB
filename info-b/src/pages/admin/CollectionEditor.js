import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCollection } from "../../store/slices/collectionSlice";
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
import PerformanceForm from "../../components/admin/forms/PerformanceForm";
import Swal from "sweetalert2";
import ChartForm from "../../components/admin/forms/ChartForm";

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
      {
        id: "chart",
        label: "국내실적",
        collection: "chart",
      },
    ],
  },
  talent: {
    label: "채용",
    sections: [
      {
        id: "recruitment",
        label: "인재상",
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
  const [activeTab, setActiveTab] = useState("si");

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

  const handleEdit = (section, item) => {
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
          address: data.company?.address || {
            main: "",
            old: "",
          },
          contact: data.company?.contact || {
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
          performanceCases: item || {
            year: "",
            category: "",
            title: "",
          },
        };
        break;
      case "recruitment":
        editContent = {
          company: {
            talent: data.company?.talent || {
              title: "",
              subtitle: "",
              description: [],
              recruitmentUrl: "",
              benefits: {
                title: "복리후생",
                items: [],
              },
            },
          },
        };
        break;
      case "benefits":
        editContent = {
          benefits: [...(data.benefits || [])],
        };
        break;
      case "RnD":
        editContent = {
          leakDetection: data.leakDetection
            ? JSON.parse(JSON.stringify(data.leakDetection))
            : [],
          boardProducts: data.boardProducts
            ? JSON.parse(JSON.stringify(data.boardProducts))
            : [],
        };
        break;
      case "performance":
        editContent = {
          performanceCases: {
            year: item ? item.year : "",
            category: item ? item.category : "",
            title: item ? item.title : "",
            id: item ? item.id : null,
          },
        };
        break;
      case "chart":
        editContent = {
          chart: item || {
            year: "",
            revenue: 0,
            operatingProfit: 0,
            totalAssets: 0,
            totalEquity: 0,
          },
        };
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
          updatedData.company = {
            ...updatedData.company,
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
          if (!updatedData.company) updatedData.company = {};
          if (!updatedData.company.performanceCases) {
            updatedData.company.performanceCases = {
              title: "구축 사례",
              description:
                "다양한 분야의 프로젝트 수행 경험을 통해 축적된 기술력으로 최상의 서비스를 제공합니다.",
              timeline: [],
            };
          }

          const yearIndex =
            updatedData.company.performanceCases.timeline.findIndex(
              (t) => t.year === editData.performanceCases.year
            );

          if (yearIndex !== -1) {
            // 기존 연도가 있는 경우
            if (editData.performanceCases.id) {
              // 기존 프로젝트 수정
              const projectIndex =
                updatedData.company.performanceCases.timeline[
                  yearIndex
                ].projects.findIndex(
                  (p) => p.id === editData.performanceCases.id
                );
              if (projectIndex !== -1) {
                updatedData.company.performanceCases.timeline[
                  yearIndex
                ].projects[projectIndex] = {
                  id: editData.performanceCases.id,
                  category: editData.performanceCases.category,
                  title: editData.performanceCases.title,
                };
              }
            } else {
              // 새 프로젝트 추가
              updatedData.company.performanceCases.timeline[
                yearIndex
              ].projects.push({
                id: `${editData.performanceCases.year}-${Date.now()}`,
                category: editData.performanceCases.category,
                title: editData.performanceCases.title,
              });
            }
          } else {
            // 새로운 연도 추가
            updatedData.company.performanceCases.timeline.push({
              year: editData.performanceCases.year,
              projects: [
                {
                  id: `${editData.performanceCases.year}-${Date.now()}`,
                  category: editData.performanceCases.category,
                  title: editData.performanceCases.title,
                },
              ],
            });
          }

          // timeline을 연도순으로 정렬
          updatedData.company.performanceCases.timeline.sort(
            (a, b) => b.year - a.year
          );
          break;
        case "recruitment":
          if (!updatedData.company) updatedData.company = {};
          updatedData.company.talent = editData.company.talent;
          break;
        case "benefits":
          updatedData.benefits = editData.benefits;
          break;
        case "RnD":
          updatedData.leakDetection = editData.leakDetection;
          updatedData.boardProducts = editData.boardProducts;
          break;
        case "performance":
          if (!updatedData.company) updatedData.company = {};
          if (!updatedData.company.performanceCases) {
            updatedData.company.performanceCases = {
              title: "구축 사례",
              description:
                "다양한 분야의 프로젝트 수행 경험을 통해 축적된 기술력으로 최상의 서비스를 제공합니다.",
              timeline: [],
            };
          }

          const performanceExistingYear =
            updatedData.company.performanceCases.timeline.find(
              (t) => t.year === editData.performanceCases.year
            );

          if (performanceExistingYear) {
            if (editData.performanceCases.id) {
              // 기존 프로젝트 수정
              const projectIndex = performanceExistingYear.projects.findIndex(
                (p) => p.id === editData.performanceCases.id
              );
              if (projectIndex !== -1) {
                performanceExistingYear.projects[projectIndex] = {
                  id: editData.performanceCases.id,
                  category: editData.performanceCases.category,
                  title: editData.performanceCases.title,
                };
              }
            } else {
              // 새 프로젝트 추가
              performanceExistingYear.projects.push({
                id: `${editData.performanceCases.year}-${Date.now()}`,
                category: editData.performanceCases.category,
                title: editData.performanceCases.title,
              });
            }
          } else {
            // 새로운 연도 추가
            updatedData.company.performanceCases.timeline.push({
              year: editData.performanceCases.year,
              projects: [
                {
                  id: `${editData.performanceCases.year}-${Date.now()}`,
                  category: editData.performanceCases.category,
                  title: editData.performanceCases.title,
                },
              ],
            });
          }
          break;
        case "chart":
          // chart 배열에서 해당 연도(row)만 수정, 없으면 추가
          const found = updatedData.chart.some(
            (row) => row.year === editData.chart.year
          );
          if (found) {
            updatedData.chart = updatedData.chart.map((row) =>
              row.year === editData.chart.year ? { ...editData.chart } : row
            );
          } else {
            updatedData.chart.push({ ...editData.chart });
          }
          break;
        default:
          break;
      }

      // console.log("저장할 데이터:", updatedData);

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

      Swal.fire({
        title: "저장되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("저장 중 오류:", error);
      Swal.fire({
        title: "저장 실패",
        text: "저장 중 오류가 발생했습니다: " + error.message,
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = async (section, item) => {
    try {
      const result = await Swal.fire({
        title: "삭제하시겠습니까?",
        text: "삭제된 데이터는 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (!result.isConfirmed) {
        return;
      }

      if (!products || !products[0]) return;

      const updatedData = JSON.parse(JSON.stringify(products[0]));
      const currentSection = COLLECTIONS[selectedCollection].sections.find(
        (section) => section.id === selectedSection
      );

      switch (section) {
        case "recruitment":
          if (!updatedData.recruitment) return;
          updatedData.recruitment = updatedData.recruitment.filter(
            (_, index) => index !== item
          );
          break;

        case "benefits":
          if (!updatedData.benefits) return;
          updatedData.benefits = updatedData.benefits.filter(
            (_, index) => index !== item
          );
          break;

        case "cases":
        case "performance":
          if (!updatedData.company) return;

          const yearData = updatedData.company.performanceCases.timeline.find(
            (t) => t.year === item.year
          );

          if (yearData) {
            yearData.projects = yearData.projects.filter(
              (p) => p.id !== item.id
            );

            if (yearData.projects.length === 0) {
              updatedData.company.performanceCases.timeline =
                updatedData.company.performanceCases.timeline.filter(
                  (t) => t.year !== item.year
                );
            }
          }
          break;
        case "certification":
          if (!updatedData.company?.certifications?.items) return;
          updatedData.company.certifications.items =
            updatedData.company.certifications.items.filter(
              (cert) => cert.id !== item.id
            );
          break;
        case "chart":
          updatedData.chart = updatedData.chart.filter(
            (row) => row.year !== item.year
          );
          break;
        default:
          break;
      }

      await dispatch(
        updateCollection({
          collectionName: currentSection.collection,
          docId: products[0].docId,
          data: updatedData,
        })
      ).unwrap();

      dispatch(
        fetchProducts({
          collectionName: currentSection.collection,
          queryOptions: {},
        })
      );

      Swal.fire({
        title: "삭제되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("삭제 중 오류:", error);
      Swal.fire({
        title: "삭제 실패",
        text: "삭제 중 오류가 발생했습니다: " + error.message,
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  const handleDeleteAll = async (section) => {
    const result = await Swal.fire({
      title: "전체 삭제하시겠습니까?",
      text: "삭제된 데이터는 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        if (!products || !products[0]) return;

        const updatedData = JSON.parse(JSON.stringify(products[0]));
        const currentSection = COLLECTIONS[selectedCollection].sections.find(
          (section) => section.id === selectedSection
        );

        switch (section) {
          case "certification":
            if (updatedData.company?.certifications?.items) {
              updatedData.company.certifications.items = [];
              setEditData(updatedData.company.certifications);
              handleSave();
            }
            break;
          case "chart":
            if (updatedData.chart) {
              updatedData.chart = [];
              setEditData(updatedData.chart);
              handleSave();
            }
            break;
          default:
            break;
        }

        await dispatch(
          updateCollection({
            collectionName: currentSection.collection,
            docId: products[0].docId,
            data: updatedData,
          })
        ).unwrap();

        dispatch(
          fetchProducts({
            collectionName: currentSection.collection,
            queryOptions: {},
          })
        );

        await Swal.fire(
          "삭제 완료",
          "모든 데이터가 삭제되었습니다.",
          "success"
        );
      } catch (error) {
        console.error("전체 삭제 중 오류:", error);
        await Swal.fire({
          title: "삭제 실패",
          text: "삭제 중 오류가 발생했습니다: " + error.message,
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }
  };

  const renderContent = () => {
    if (!products || !products[0]) {
      return <div className="loading">데이터를 불러오는 중...</div>;
    }

    const data = products[0];

    switch (selectedSection) {
      case "ceo":
        return (
          <div className="view-mode ceo-message-admin ceo-message">
            <div className="ceo-message__container">
              <div className="ceo-message__content">
                <h1 className="title">{data.company?.ceo?.message?.title}</h1>
                <div className="message">
                  {data.company?.ceo?.message?.content?.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
                <div className="signature">
                  <div className="position">{data.company?.ceo?.position}</div>
                  <div className="name">{data.company?.ceo?.name}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="view-mode history-admin history">
            <div className="history__timeline">
              {Object.entries(data.company?.history?.timeline || {})
                .sort(([yearA], [yearB]) => yearB - yearA)
                .map(([year, yearData]) => (
                  <div key={year} className="history__period">
                    <div className="history__period-header">
                      <h2>{year}년</h2>
                    </div>
                    <div className="history__events">
                      {yearData.events &&
                        yearData.events.map((event, index) => (
                          <div key={index} className="history__event">
                            <div className="history__event-content">
                              {event.content}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case "certification":
        return (
          <div className="view-mode certification-admin certification">
            <div className="certification__container">
              <div className="certification__header">
                <h1 className="title">
                  {data.company?.certifications?.title || "인증 및 특허"}
                </h1>
                <p className="subtitle">
                  {data.company?.certifications?.subtitle}
                </p>
              </div>
              <div className="certification__grid">
                {data.company?.certifications?.items?.map((cert) => (
                  <div key={cert.id} className="certification__card">
                    {cert.image && (
                      <div className="certification__image">
                        <img src={cert.image} alt={cert.title} />
                      </div>
                    )}
                    <div className="certification__content">
                      <h3 className="certification__title">{cert.title}</h3>
                      <div className="certification__description">
                        {cert.description.map((desc, index) => (
                          <p key={index}>{desc}</p>
                        ))}
                      </div>
                      <div className="certification__actions">
                        {/* <button
                          className="edit-button"
                          onClick={() => handleEdit("certification", cert)}
                        >
                          수정
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete("certification", cert)}
                        >
                          삭제
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          <div className="view-mode solution-admin business-info">
            <div className="business-info__tabs">
              <button
                className={`tab-button ${activeTab === "si" ? "active" : ""}`}
                onClick={() => setActiveTab("si")}
              >
                SI 컨설팅
              </button>
              <button
                className={`tab-button ${
                  activeTab === "consulting" ? "active" : ""
                }`}
                onClick={() => setActiveTab("consulting")}
              >
                컨설팅 솔루션
              </button>
            </div>
            <div className="business-info__cards">
              {activeTab === "si" && (
                <div className="business-info__card-grid si-grid">
                  {data?.company?.business?.si?.areas?.map((area, index) => (
                    <div key={`si-${index}`} className="business-info__card">
                      <div className="card-icon">
                        <i className="fas fa-cogs"></i>
                      </div>
                      <h3>{area.title}</h3>
                      <ul>
                        {area.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "consulting" && (
                <div className="business-info__card-grid consulting-grid">
                  {data?.company?.business?.consulting?.areas?.map(
                    (area, index) => (
                      <div
                        key={`consulting-${index}`}
                        className="business-info__card"
                      >
                        <div className="card-icon">
                          <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3>{area.title}</h3>
                        <ul>
                          {area.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
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
            <div className="performance-sections">
              <div className="section">
                <div className="section-header">
                  <h3>수행실적</h3>
                  <button
                    className="add-button"
                    onClick={() => handleEdit("cases", null)}
                  >
                    새 프로젝트 추가
                  </button>
                </div>
                <div className="items-list">
                  {[...(data.company?.performanceCases?.timeline || [])]
                    ?.sort((a, b) => b.year - a.year)
                    .map((yearData) => (
                      <div key={yearData.year} className="year-section">
                        <h4>{yearData.year}년</h4>
                        <div className="projects">
                          {yearData.projects.map((project) => (
                            <div key={project.id} className="item">
                              <div className="item-header">
                                <h4>{project.category}</h4>
                                <div className="button-group">
                                  <button
                                    className="edit-button"
                                    onClick={() =>
                                      handleEdit("cases", {
                                        ...project,
                                        year: yearData.year,
                                      })
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    className="delete-button"
                                    onClick={() =>
                                      handleDelete("cases", {
                                        ...project,
                                        year: yearData.year,
                                      })
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                              <div className="item-content">
                                <p>{project.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "recruitment":
        return (
          <div className="view-mode recruitment-admin recruitment-talent">
            <div className="talent-header">
              <h1>{data.company?.talent?.title || "인재상"}</h1>
              <div className="talent-content">
                <div className="talent-title">
                  {data.company?.talent?.description?.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  <div className="talent-button">
                    <button
                      onClick={() =>
                        window.open(
                          data.company?.talent?.recruitmentUrl,
                          "_blank"
                        )
                      }
                    >
                      채용공고 바로가기
                    </button>
                  </div>
                </div>
                <div className="talent-img">
                  {/* <img
                    src="/images/talent/talent-illustration.png"
                    alt="인재상 일러스트레이션"
                  /> */}
                </div>
              </div>
            </div>

            <div className="recruitment-benefits">
              <div className="benefits-header">
                <h1>{data.company?.talent?.benefits?.title || "복리후생"}</h1>
              </div>
              <div className="benefits-icon">
                {data.company?.talent?.benefits?.items?.map((item, index) => (
                  <div key={index} className="icon-main">
                    <img
                      src={`/images/talent/benefit-icon-${index + 1}.png`}
                      alt={item.name}
                    />
                    <h2>{item.name}</h2>
                    <ul>
                      {item.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "benefits":
        return (
          <div className="view-mode">
            <div className="section">
              <div className="section-header">
                <h3>복리후생</h3>
                {!isEditing && (
                  <button
                    className="edit-button"
                    onClick={() => handleEdit("benefits", data?.benefits)}
                  >
                    수정하기
                  </button>
                )}
              </div>
              <div className="benefits-content">
                {data?.benefits?.map((item, index) => (
                  <div key={index} className="benefit-item">
                    <h4>{item.title}</h4>
                    <div className="description">
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "RnD":
        return (
          <div className="view-mode rnd-admin rn-business">
            <div className="product-section">
              <div className="section-header">
                <h2>누출탐지센서</h2>
              </div>
              <div className="product-list">
                {data?.leakDetection?.map((item, index) => (
                  <div key={index} className="product-item">
                    <div className="product-header">
                      <h3>{item.name}</h3>
                      <span className="product-badge">ID: {item.id}</span>
                      <span className="product-badge">
                        출시예정: {item.releaseDate}
                      </span>
                    </div>
                    <div className="product-content">
                      <div className="features">
                        <ul className="feature-list">
                          {item.features?.description?.map((desc, i) => (
                            <li key={i} className="feature-item">
                              <span className="feature-icon">•</span>
                              <span className="feature-text">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-header">
                <h2>보드제품</h2>
              </div>
              <div className="product-list">
                {data?.boardProducts?.map((item, index) => (
                  <div key={index} className="product-item">
                    <div className="product-header">
                      <h3>{item.name}</h3>
                      <span className="product-badge">ID: {item.id}</span>
                      <span className="product-badge">
                        출시예정: {item.releaseDate}
                      </span>
                    </div>
                    <div className="product-content">
                      <div className="features">
                        <div className="feature-list">
                          <div className="feature-item">
                            <span className="feature-icon">•</span>
                            <span className="feature-text">
                              {item.features?.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "performance":
        return (
          <div className="view-mode">
            <div className="performance-sections">
              <div className="section">
                <div className="section-header">
                  <h3>
                    {data.company?.performanceCases?.title || "구축 사례"}
                  </h3>
                  <button
                    className="add-button"
                    onClick={() => handleEdit("performance", null)}
                  >
                    새 프로젝트 추가
                  </button>
                </div>
                <div className="performance-grid">
                  {[...(data.company?.performanceCases?.timeline || [])]
                    ?.sort((a, b) => b.year - a.year)
                    .map((yearData) => (
                      <div key={yearData.year} className="year-group">
                        <h4 className="year-label">{yearData.year}년</h4>
                        <div className="cards-container">
                          {yearData.projects.map((project) => (
                            <div
                              key={
                                project.id ||
                                `${yearData.year}-${project.title}`
                              }
                              className="performance-card"
                            >
                              <div className="card-header">
                                <div className="card-title">
                                  <h5>{project.category}</h5>
                                </div>
                                <div className="button-group">
                                  <button
                                    className="edit-button"
                                    onClick={() =>
                                      handleEdit("performance", {
                                        ...project,
                                        year: yearData.year,
                                      })
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    className="delete-button"
                                    onClick={() =>
                                      handleDelete("performance", {
                                        ...project,
                                        year: yearData.year,
                                      })
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                              <div className="card-content">
                                <p>{project.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "chart":
        return (
          <div className="view-mode chart-admin chart-table">
            <div className="section-header">
              <h3>국내실적</h3>
              <button
                className="chart-add-button"
                onClick={() => handleEdit("chart", null)}
              >
                새 실적 추가
              </button>
            </div>
            {status === "loading" ? (
              <div>로딩 중...</div>
            ) : error ? (
              <div style={{ color: "red" }}>{error}</div>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th>연도</th>
                    <th>매출액</th>
                    <th>영업이익</th>
                    <th>자산총계</th>
                    <th>자본총계</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products[0]?.chart) &&
                  products[0].chart.length > 0 ? (
                    products[0].chart
                      .slice()
                      .sort((a, b) => a.year - b.year)
                      .map((row, idx) => (
                        <tr key={row.year || idx}>
                          <td className="center">{row.year}</td>
                          <td className="right">
                            {row.revenue !== undefined && row.revenue !== null
                              ? Number(row.revenue).toLocaleString()
                              : ""}
                          </td>
                          <td className="right">
                            {row.operatingProfit !== undefined &&
                            row.operatingProfit !== null
                              ? Number(row.operatingProfit).toLocaleString()
                              : ""}
                          </td>
                          <td className="right">
                            {row.totalAssets !== undefined &&
                            row.totalAssets !== null
                              ? Number(row.totalAssets).toLocaleString()
                              : ""}
                          </td>
                          <td className="right">
                            {row.totalEquity !== undefined &&
                            row.totalEquity !== null
                              ? Number(row.totalEquity).toLocaleString()
                              : ""}
                          </td>
                          <td className="center">
                            <button
                              className="chart-edit-button"
                              onClick={() => handleEdit("chart", row)}
                            >
                              수정
                            </button>
                            <button
                              className="chart-delete-button"
                              onClick={() => handleDelete("chart", row)}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="empty">
                        데이터가 없습니다
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
      case "performance":
        return (
          <PerformanceForm editData={editData} setEditData={setEditData} />
        );
      case "chart":
        return <ChartForm editData={editData} setEditData={setEditData} />;
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
            onClick={() => handleEdit(selectedSection, null)}
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
