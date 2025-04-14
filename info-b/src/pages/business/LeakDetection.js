import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import "../../styles/pages/_rndBusiness.scss";
import FadeInSection from "../../components/FadeInSection";

// 이미지 import
import RnD1 from "../../resources/images/rnd/RnD1.jpg";
import RnD2 from "../../resources/images/rnd/RnD2.png";
import LoRa1 from "../../resources/images/rnd/LoRa1.jpg";
import LoRa2 from "../../resources/images/rnd/LoRa2.jpg";
import LoRa3 from "../../resources/images/rnd/LoRa3.jpg";

const productImages = {
  "RnD1.jpg": RnD1,
  "RnD2.png": RnD2,
  "LoRa1.jpg": LoRa1,
  "LoRa2.jpg": LoRa2,
  "LoRa3.jpg": LoRa3,
};

function LeakDetection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ collectionName: "products", queryOptions: {} }));
  }, [dispatch]);

  console.log("Products data:", products);

  if (status === "loading") {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div>제품 정보를 찾을 수 없습니다.</div>;
  }

  const productsData = products[0];
  console.log(
    "Products data structure:",
    JSON.stringify(productsData, null, 2)
  );

  if (!productsData?.company?.products?.leakDetection) {
    return <div>누출탐지 제품 정보가 올바르지 않습니다.</div>;
  }

  const leakDetection = productsData.company.products.leakDetection;
  console.log("Leak detection products:", leakDetection);

  if (!Array.isArray(leakDetection)) {
    console.error("leakDetection is not an array:", leakDetection);
    return <div>누출탐지 제품 데이터 형식이 올바르지 않습니다.</div>;
  }

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
            {leakDetection.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  {product.releaseDate && (
                    <div className="product-badge">{product.releaseDate}</div>
                  )}
                </div>
                <FadeInSection>
                  <div className="image-grid">
                    {product.images && product.images.length === 2 && (
                      <>
                        <div className="image-container">
                          <img
                            src={productImages[product.images[0]]}
                            alt={`${product.name} 이미지 1`}
                          />
                        </div>
                        <div className="image-container">
                          <img
                            src={productImages[product.images[1]]}
                            alt={`${product.name} 이미지 2`}
                          />
                        </div>
                      </>
                    )}
                    {product.images && product.images.length === 3 && (
                      <>
                        <div className="image-container main-image">
                          <img
                            src={productImages[product.images[0]]}
                            alt={`${product.name} 이미지 1`}
                          />
                        </div>
                        <div className="image-container vertical-stack">
                          <div className="stack-item">
                            <img
                              src={productImages[product.images[1]]}
                              alt={`${product.name} 이미지 2`}
                            />
                          </div>
                          <div className="stack-item">
                            <img
                              src={productImages[product.images[2]]}
                              alt={`${product.name} 이미지 3`}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="product-content">
                    <div className="features">
                      {product.features?.description && (
                        <>
                          <h4>제품 특징</h4>
                          {Array.isArray(product.features.description) ? (
                            <ul>
                              {product.features.description.map(
                                (desc, index) => (
                                  <li key={index}>
                                    <span className="feature-icon">
                                      {getFeatureIcon(index)}
                                    </span>
                                    <span className="feature-text">{desc}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p>{product.features.description}</p>
                          )}
                        </>
                      )}

                      {product.features?.specifications && (
                        <div className="specs">
                          {Object.entries(product.features.specifications).map(
                            ([key, value]) => {
                              if (typeof value === "object" && value !== null) {
                                if (value.headers || value.rows) {
                                  return (
                                    <div key={key}>
                                      <h5>{getSpecTitle(key)}</h5>
                                      <table>
                                        {value.headers && (
                                          <thead>
                                            <tr>
                                              {value.headers.map(
                                                (header, index) => (
                                                  <th key={index}>{header}</th>
                                                )
                                              )}
                                            </tr>
                                          </thead>
                                        )}
                                        <tbody>
                                          {value.rows &&
                                            value.rows.map((row, rowIndex) => (
                                              <tr key={rowIndex}>
                                                {Array.isArray(row) ? (
                                                  row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>
                                                      {cell}
                                                    </td>
                                                  ))
                                                ) : (
                                                  <td>{row}</td>
                                                )}
                                              </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                } else {
                                  const displayValue = Object.entries(value)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ");
                                  return (
                                    <div key={key}>
                                      <h5>{getSpecTitle(key)}</h5>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>{displayValue}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                }
                              }
                              return (
                                <div key={key}>
                                  <h5>{getSpecTitle(key)}</h5>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>{value}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInSection>
              </div>
            ))}
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

function getFeatureIcon(index) {
  const icons = ["📡", "🔋", "⚡", "📊", "🔄", "🌐"];
  return icons[index] || "📝";
}

function getSpecTitle(key) {
  const titles = {
    power: "전원",
    frequency: "주파수",
    wirelessOutput: "무선출력",
    antenna: "안테나",
    temperature: "사용온도",
  };
  return titles[key] || key;
}

export default LeakDetection;
