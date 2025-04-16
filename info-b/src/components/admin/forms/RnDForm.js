import React, { useState } from "react";
import "../../../styles/components/admin/forms/_rndForm.scss";

const RnDForm = ({ editData, setEditData }) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    type: "leakDetection",
    name: "",
    id: "",
    releaseDate: "",
    features: {
      description: "",
    },
  });

  const handleUpdateLeakDetection = (index, field, value) => {
    const newLeakDetection = [...editData.leakDetection];
    if (field === "description") {
      newLeakDetection[index] = {
        ...newLeakDetection[index],
        features: {
          ...newLeakDetection[index].features,
          description: value.split("\n"),
        },
      };
    } else {
      newLeakDetection[index] = {
        ...newLeakDetection[index],
        [field]: value,
      };
    }
    setEditData({
      ...editData,
      leakDetection: newLeakDetection,
    });
  };

  const handleUpdateBoardProduct = (index, field, value) => {
    const newBoardProducts = [...editData.boardProducts];
    if (field === "description") {
      newBoardProducts[index] = {
        ...newBoardProducts[index],
        features: {
          ...newBoardProducts[index].features,
          description: value,
        },
      };
    } else {
      newBoardProducts[index] = {
        ...newBoardProducts[index],
        [field]: value,
      };
    }
    setEditData({
      ...editData,
      boardProducts: newBoardProducts,
    });
  };

  const handleAddProduct = () => {
    if (newProduct.type === "leakDetection") {
      setEditData({
        ...editData,
        leakDetection: [
          {
            name: newProduct.name,
            id: newProduct.id,
            releaseDate: newProduct.releaseDate,
            features: {
              description: newProduct.features.description.split("\n"),
            },
          },
          ...editData.leakDetection,
        ],
      });
    } else {
      setEditData({
        ...editData,
        boardProducts: [
          {
            name: newProduct.name,
            id: newProduct.id,
            releaseDate: newProduct.releaseDate,
            features: {
              description: newProduct.features.description,
            },
          },
          ...editData.boardProducts,
        ],
      });
    }
    setShowNewForm(false);
    setNewProduct({
      type: "leakDetection",
      name: "",
      id: "",
      releaseDate: "",
      features: {
        description: "",
      },
    });
  };

  const handleDeleteLeakDetection = (index) => {
    const newLeakDetection = editData.leakDetection.filter(
      (_, i) => i !== index
    );
    setEditData({
      ...editData,
      leakDetection: newLeakDetection,
    });
  };

  const handleDeleteBoardProduct = (index) => {
    const newBoardProducts = editData.boardProducts.filter(
      (_, i) => i !== index
    );
    setEditData({
      ...editData,
      boardProducts: newBoardProducts,
    });
  };

  const handleUpdateNewProduct = (field, value) => {
    if (field === "description") {
      setNewProduct({
        ...newProduct,
        features: {
          ...newProduct.features,
          description: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [field]: value,
      });
    }
  };

  return (
    <div className="rnd-form">
      <button className="add-button" onClick={() => setShowNewForm(true)}>
        새 제품 추가
      </button>

      {showNewForm && (
        <div className="form-section new-product">
          <div className="item-header">
            <h4>새 제품</h4>
            <button
              className="delete-button"
              onClick={() => setShowNewForm(false)}
            >
              취소
            </button>
          </div>
          <div className="input-group">
            <label>제품 종류</label>
            <select
              value={newProduct.type}
              onChange={(e) => handleUpdateNewProduct("type", e.target.value)}
            >
              <option value="leakDetection">누출탐지센서</option>
              <option value="boardProduct">보드제품</option>
            </select>
          </div>
          <div className="input-group">
            <label>제품명</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => handleUpdateNewProduct("name", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>제품 ID</label>
            <input
              type="text"
              value={newProduct.id}
              onChange={(e) => handleUpdateNewProduct("id", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>출시예정</label>
            <input
              type="text"
              value={newProduct.releaseDate}
              onChange={(e) =>
                handleUpdateNewProduct("releaseDate", e.target.value)
              }
            />
          </div>
          <div className="input-group">
            <label>제품 설명</label>
            <textarea
              value={newProduct.features.description}
              onChange={(e) =>
                handleUpdateNewProduct("description", e.target.value)
              }
            />
          </div>
          <button className="submit-button" onClick={handleAddProduct}>
            추가하기
          </button>
        </div>
      )}

      <div className="form-section">
        <h3>누출탐지센서</h3>
        {editData.leakDetection.map((item, index) => (
          <div key={index} className="form-item">
            <div className="item-header">
              <h4>{item.name || "새 제품"}</h4>
              <button
                className="delete-button"
                onClick={() => handleDeleteLeakDetection(index)}
              >
                "{item.name || "이 제품"}" 삭제
              </button>
            </div>
            <div className="input-group">
              <label>제품명</label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) =>
                  handleUpdateLeakDetection(index, "name", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>제품 ID</label>
              <input
                type="text"
                value={item.id || ""}
                onChange={(e) =>
                  handleUpdateLeakDetection(index, "id", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>출시예정</label>
              <input
                type="text"
                value={item.releaseDate || ""}
                onChange={(e) =>
                  handleUpdateLeakDetection(
                    index,
                    "releaseDate",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="input-group">
              <label>제품 설명</label>
              <textarea
                value={item.features?.description?.join("\n") || ""}
                onChange={(e) =>
                  handleUpdateLeakDetection(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h3>보드제품</h3>
        {editData.boardProducts.map((item, index) => (
          <div key={index} className="form-item">
            <div className="item-header">
              <h4>{item.name || "새 제품"}</h4>
              <button
                className="delete-button"
                onClick={() => handleDeleteBoardProduct(index)}
              >
                "{item.name || "이 제품"}" 삭제
              </button>
            </div>
            <div className="input-group">
              <label>제품명</label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) =>
                  handleUpdateBoardProduct(index, "name", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>제품 ID</label>
              <input
                type="text"
                value={item.id || ""}
                onChange={(e) =>
                  handleUpdateBoardProduct(index, "id", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>출시예정</label>
              <input
                type="text"
                value={item.releaseDate || ""}
                onChange={(e) =>
                  handleUpdateBoardProduct(index, "releaseDate", e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label>제품 설명</label>
              <textarea
                value={item.features?.description || ""}
                onChange={(e) =>
                  handleUpdateBoardProduct(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RnDForm;
