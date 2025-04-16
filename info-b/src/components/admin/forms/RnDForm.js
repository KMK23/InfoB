import React from "react";
import "../../../styles/components/admin/forms/_rndForm.scss";

const RnDForm = ({ editData, setEditData }) => {
  const handleUpdateProduct = (field, value) => {
    setEditData({
      ...editData,
      product: {
        ...editData.product,
        [field]: value,
      },
    });
  };

  const handleUpdateFeatures = (value) => {
    setEditData({
      ...editData,
      product: {
        ...editData.product,
        features: {
          ...editData.product.features,
          description:
            editData.productType === "leakDetection"
              ? value.split("\n")
              : value,
        },
      },
    });
  };

  return (
    <div className="rnd-form">
      <div className="form-section">
        <div className="input-group">
          <label htmlFor="productName">제품명</label>
          <input
            id="productName"
            type="text"
            value={editData.product?.name || ""}
            onChange={(e) => handleUpdateProduct("name", e.target.value)}
            placeholder="제품명을 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="productId">제품 ID</label>
          <input
            id="productId"
            type="text"
            value={editData.product?.id || ""}
            onChange={(e) => handleUpdateProduct("id", e.target.value)}
            placeholder="제품 ID를 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="productImage">
            {editData.productType === "leakDetection"
              ? "이미지 파일명 (쉼표로 구분)"
              : "이미지 파일명"}
          </label>
          {editData.productType === "leakDetection" ? (
            <input
              id="productImage"
              type="text"
              value={editData.product?.images?.join(", ") || ""}
              onChange={(e) =>
                handleUpdateProduct(
                  "images",
                  e.target.value.split(",").map((img) => img.trim())
                )
              }
              placeholder="예: image1.jpg, image2.jpg"
            />
          ) : (
            <input
              id="productImage"
              type="text"
              value={editData.product?.image || ""}
              onChange={(e) => handleUpdateProduct("image", e.target.value)}
              placeholder="예: image.jpg"
            />
          )}
        </div>
        <div className="input-group">
          <label htmlFor="productDescription">제품 설명</label>
          <textarea
            id="productDescription"
            value={
              editData.productType === "leakDetection"
                ? editData.product?.features?.description?.join("\n") || ""
                : editData.product?.features?.description || ""
            }
            onChange={(e) => handleUpdateFeatures(e.target.value)}
            placeholder={
              editData.productType === "leakDetection"
                ? "제품 설명을 입력하세요 (줄바꿈으로 구분)"
                : "제품 설명을 입력하세요"
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="releaseDate">출시 예정일</label>
          <input
            id="releaseDate"
            type="text"
            value={editData.product?.releaseDate || ""}
            onChange={(e) => handleUpdateProduct("releaseDate", e.target.value)}
            placeholder="예: 2024년 하반기 출시예정"
          />
        </div>
      </div>
    </div>
  );
};

export default RnDForm;
