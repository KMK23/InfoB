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

  if (!productsData?.leakDetection) {
    return <div>누출탐지 제품 정보가 올바르지 않습니다.</div>;
  }

  const leakDetection = productsData.leakDetection;
  console.log("Leak detection products:", leakDetection);

  if (!Array.isArray(leakDetection)) {
    console.error("leakDetection is not an array:", leakDetection);
    return <div>누출탐지 제품 데이터 형식이 올바르지 않습니다.</div>;
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
            {leakDetection.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  {product.releaseDate && (
                    <div className="product-badge">{product.releaseDate}</div>
                  )}
                </div>
                <FadeInSection>
                  <div
                    className={`image-grid ${
                      product.id === "lora-repeater" ? "lora-grid" : ""
                    }`}
                  >
                    {product.id === "lora-repeater" ? (
                      <>
                        <div className="image-container main-image">
                          <img
                            src={productImages[product.images[0]]}
                            alt={`${product.name} 이미지 1`}
                          />
                        </div>
                        <div className="image-container vertical-stack">
                          {product.images.slice(1).map((image, index) => (
                            <div key={index} className="stack-item">
                              <img
                                src={productImages[image]}
                                alt={`${product.name} 이미지 ${index + 2}`}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      product.images.map((image, index) => (
                        <div key={index} className="image-container">
                          <img
                            src={productImages[image]}
                            alt={`${product.name} 이미지 ${index + 1}`}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </FadeInSection>
                <FadeInSection>
                  <div className="product-content">
                    <div className="features">
                      <h4>제품 특징</h4>
                      <ul>
                        {product.features.description.map((desc, index) => (
                          <li key={index}>
                            <span className="feature-icon">
                              {getFeatureIcon(index)}
                            </span>
                            <span className="feature-text">{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
    frequency: "주파수",
    wirelessOutput: "무선출력",
    antenna: "안테나",
    temperature: "사용온도",
  };
  return titles[key] || key;
}

export default LeakDetection;
