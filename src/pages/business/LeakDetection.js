import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import { fetchFolderImages } from "../../store/slices/imagesSlice";
import "../../styles/pages/_rndBusiness.scss";
import FadeInSection from "../../components/FadeInSection";
import ImageModal from "../../components/ImageModal";

function LeakDetection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const { urls: imageUrls, status: imageStatus } = useSelector(
    (state) => state.images
  );
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProducts({ collectionName: "productDetail", queryOptions: {} })
    );
    dispatch(fetchFolderImages("rnd"));
  }, [dispatch]);

  useEffect(() => {
    console.log("Products data:", products);
    console.log("Image URLs:", imageUrls);
  }, [products, imageUrls]);

  if (status === "loading" || imageStatus === "loading") {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div>제품 정보를 찾을 수 없습니다.</div>;
  }

  const productsData = products[0];
  const leakDetection = productsData?.leakDetection || [];

  if (!productsData?.leakDetection) {
    return <div>누출탐지 제품 정보가 올바르지 않습니다.</div>;
  }

  const getImageUrl = (imageName) => {
    if (!imageName) return "";

    // 이미지 이름에 rnd/ 접두사가 없으면 추가
    const fullPath = imageName.startsWith("rnd/")
      ? imageName
      : `rnd/${imageName}`;

    if (imageUrls?.rnd?.[fullPath]) {
      console.log(`Found image URL for ${fullPath}:`, imageUrls.rnd[fullPath]);
      return imageUrls.rnd[fullPath];
    }

    // 접두사 없는 경로도 시도
    if (imageUrls?.rnd?.[imageName]) {
      console.log(
        `Found image URL for ${imageName}:`,
        imageUrls.rnd[imageName]
      );
      return imageUrls.rnd[imageName];
    }

    console.log(`No image URL found for ${imageName}`);
    return "";
  };

  return (
    <div className="rnd-business">
      <div className="rnd-business-container">
        <div className="rnd-business-header">
          <h2>누출탐지센서</h2>
          <p>
            누출탐지센서는 다양한 산업 현장에서 발생할 수 있는 유해물질의 누출을
            실시간으로 감지하고 모니터링하는 첨단 센서 시스템입니다.
          </p>
        </div>

        <div className="rnd-business-content">
          {leakDetection.map((product) => {
            console.log(
              "Processing product:",
              product.name,
              "Images:",
              product.images
            );

            return (
              <FadeInSection key={product.id}>
                <div className="product-item">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="release-date">
                      출시일: {product.releaseDate}
                    </p>
                    <div className="features">
                      <h4>주요 특징</h4>
                      <ul>
                        {product.features.description.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="product-images">
                    {Array.isArray(product.images) &&
                      product.images.length > 0 && (
                        <>
                          <div className="image-container main-image">
                            <img
                              src={getImageUrl(product.images[0])}
                              alt={`${product.name} 대표 이미지`}
                              onClick={() =>
                                setSelectedImage({
                                  src: getImageUrl(product.images[0]),
                                  alt: `${product.name} 대표 이미지`,
                                })
                              }
                              style={{ cursor: "pointer" }}
                              onError={(e) => {
                                console.error(
                                  "Image load error for:",
                                  product.images[0]
                                );
                                e.target.style.display = "none";
                              }}
                            />
                          </div>

                          {product.images.length > 1 && (
                            <div className="image-container vertical-stack">
                              {product.images.slice(1).map((image, index) => (
                                <div key={index} className="stack-item">
                                  <img
                                    src={getImageUrl(image)}
                                    alt={`${product.name} 이미지 ${index + 2}`}
                                    onClick={() =>
                                      setSelectedImage({
                                        src: getImageUrl(image),
                                        alt: `${product.name} 이미지 ${
                                          index + 2
                                        }`,
                                      })
                                    }
                                    style={{ cursor: "pointer" }}
                                    onError={(e) => {
                                      console.error(
                                        "Image load error for:",
                                        image
                                      );
                                      e.target.style.display = "none";
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default LeakDetection;
