import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import "../../styles/pages/_rndBusiness.scss";
import FadeInSection from "../../components/FadeInSection";

// 이미지 import
import InfoEMU from "../../resources/images/rnd/INFO-EMU.png";
import InfoPCU from "../../resources/images/rnd/INFO-PCU.png";
import InfoMDU from "../../resources/images/rnd/INFO-MDU.png";

const productImages = {
  "INFO-EMU.png": InfoEMU,
  "INFO-PCU.png": InfoPCU,
  "INFO-MDU.png": InfoMDU,
};

function BoardProducts() {
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

  if (!productsData?.company?.products?.boardProducts) {
    return <div>보드 제품 정보가 올바르지 않습니다.</div>;
  }

  const boardProducts = productsData.company.products.boardProducts;
  console.log("Board products:", boardProducts);

  if (!Array.isArray(boardProducts)) {
    console.error("boardProducts is not an array:", boardProducts);
    return <div>보드 제품 데이터 형식이 올바르지 않습니다.</div>;
  }

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
          {boardProducts.map((product) => (
            <FadeInSection key={product.id}>
              <div className="product-item">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  {product.releaseDate && (
                    <div className="product-badge">{product.releaseDate}</div>
                  )}
                </div>
                <FadeInSection>
                  <div className="image-grid">
                    <div className="image-container">
                      <img
                        src={productImages[product.image]}
                        alt={product.name}
                      />
                    </div>
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="product-content">
                    <div className="features">
                      {product.features?.description && (
                        <>
                          <h4>기능</h4>
                          <p>{product.features.description}</p>
                        </>
                      )}
                      {Array.isArray(product.features?.description) && (
                        <>
                          <h4>기능</h4>
                          {product.features.description.map((desc, index) => (
                            <p key={index}>{desc}</p>
                          ))}
                        </>
                      )}
                      {product.features?.specifications && (
                        <>
                          <h4>규격</h4>
                          <ul>
                            {Object.entries(
                              product.features.specifications
                            ).map(([key, value], index) => {
                              // value가 객체인 경우 처리
                              if (typeof value === "object" && value !== null) {
                                const displayValue = Object.entries(value)
                                  .map(([k, v]) => `${v}`)
                                  .join(", ");
                                return (
                                  <li key={index}>
                                    <span className="feature-icon">
                                      {getIconForSpec(key)}
                                    </span>
                                    <span className="feature-text">
                                      {displayValue}
                                    </span>
                                  </li>
                                );
                              }
                              // value가 문자열인 경우 처리
                              return (
                                <li key={index}>
                                  <span className="feature-icon">
                                    {getIconForSpec(key)}
                                  </span>
                                  <span className="feature-text">{value}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>
    </div>
  );
}

function getIconForSpec(key) {
  const icons = {
    communication: "🔌",
    ports: "🔌",
    wdt: "⏱️",
    voltage: "⚡",
    temperature: "🌡️",
    humidity: "💧",
  };
  return icons[key] || "📝";
}

export default BoardProducts;
