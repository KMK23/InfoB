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
    dispatch(
      fetchProducts({ collectionName: "productDetail", queryOptions: {} })
    );
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

  if (!productsData?.boardProducts) {
    return <div>보드 제품 정보가 올바르지 않습니다.</div>;
  }

  const boardProducts = productsData.boardProducts;
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
          <div className="product-list">
            {boardProducts.map((product) => (
              <div key={product.id} className="product-item">
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
                        alt={`${product.name} 이미지`}
                      />
                    </div>
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="product-content">
                    <div className="features">
                      <h4 className="content-title">제품 특징</h4>
                      {Array.isArray(product.features.description) ? (
                        <ul className="feature-list">
                          {product.features.description.map((desc, index) => (
                            <li key={index} className="feature-item">
                              <span className="feature-icon">
                                {getFeatureIcon(index)}
                              </span>
                              <span className="feature-text">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="feature-description">
                          {product.features.description}
                        </p>
                      )}
                    </div>
                    {product.features.specifications && (
                      <div className="specifications">
                        <h4 className="content-title">제품 사양</h4>
                        <table className="spec-table">
                          <tbody>
                            {Object.entries(
                              product.features.specifications
                            ).map(([key, value]) => {
                              if (typeof value === "object" && value !== null) {
                                return Object.entries(value).map(
                                  ([subKey, subValue], subIndex) => (
                                    <tr key={`${key}-${subKey}`}>
                                      {subIndex === 0 && (
                                        <th rowSpan={Object.keys(value).length}>
                                          {getSpecTitle(key)}
                                        </th>
                                      )}
                                      <td>{getSpecTitle(subKey)}</td>
                                      <td>
                                        {typeof subValue === "object"
                                          ? Object.entries(subValue).map(
                                              ([k, v]) => (
                                                <div key={k}>
                                                  {getSpecTitle(k)}: {v}
                                                </div>
                                              )
                                            )
                                          : subValue}
                                      </td>
                                    </tr>
                                  )
                                );
                              }
                              return (
                                <tr key={key}>
                                  <th>{getSpecTitle(key)}</th>
                                  <td colSpan="2">{value}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </FadeInSection>
              </div>
            ))}
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
    무선: "무선",
    frequency: "주파수",
    wirelessOutput: "무선출력",
    antenna: "안테나",
    temperature: "사용온도",
    humidity: "습도",
    voltage: "전압",
    wdt: "WDT",
    communication: "통신",
    전원: "전원",
    사용온도: "사용온도",
  };
  return titles[key] || key;
}

function renderSpecifications(spec) {
  if (typeof spec === "string") {
    return <p className="spec-value">{spec}</p>;
  }

  if (typeof spec === "object" && spec !== null) {
    return (
      <div className="spec-details">
        {Object.entries(spec).map(([key, value]) => (
          <div key={key} className="spec-item">
            <h6 className="spec-subtitle">{getSpecTitle(key)}</h6>
            {renderSpecifications(value)}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default BoardProducts;
