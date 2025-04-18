import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import "../../styles/pages/_performanceCase.scss";
import FadeInSection from "../../components/FadeInSection";
import noImage from "../../resources/images/clients/no_img2.png";

// 카테고리와 이미지 파일명 매핑
const categoryToImage = {
  국세청: "국세청",
  조달청: "조달청",
  포스코: "포스코",
  한국산업기술평가관리원: "한국산업기술기획평가원",
  KISTI: "KISTI",
  관세청: "관세청",
  국토부: "국토교통부",
  "Joy 디자인": "조이디자인",
  국가철도공단연구원: "국가철도공단",
  국가철도공단: "국가철도공단",
  "소방청/국가정보자원관리원": "소방청",
  전자통신연구소: "한국전자통신연구원",
  울트라엔지니어링: "화인시스템",
  보건복지부: "보건복지부",
  국가정보자원관리원: "정부통합전산센터",
  한국산업기술평가관리원: "한국산업기술기획평가원",
  KEIT: "KEIT",
  엔텔스: "엔텔스",
  특허청: "특허청",
  인사혁신처: "인사혁신처",
  국민권익위원회: "국민권익위원회",
  소방청: "소방청",
  화인시스템: "화인시스템",
  정부통합전산센터: "정부통합전산센터",
  한국우편사업진흥원: "한국우편사업진흥원",
  한국전자통신연구원: "한국전자통신연구원",
};

function PerformanceCase() {
  const [selectedYear, setSelectedYear] = useState("2021");
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProducts({ collectionName: "performance", queryOptions: {} })
    );
  }, [dispatch]);

  if (status === "loading") {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div>구축 사례 정보를 찾을 수 없습니다.</div>;
  }

  const performanceData = products[0]?.company?.performanceCases;

  if (!performanceData) {
    return <div>구축 사례 정보가 올바르지 않습니다.</div>;
  }

  // timeline 데이터 정렬
  const timelineData = performanceData.timeline || [];
  const sortedTimeline = [...timelineData].sort((a, b) => b.year - a.year);

  const selectedYearData = sortedTimeline.find(
    (item) => String(item.year) === selectedYear
  );

  if (!selectedYearData) {
    return <div>해당 연도의 데이터를 찾을 수 없습니다.</div>;
  }

  // 이미지 파일명 가져오기
  const getImageFileName = (category) => {
    const mappedName = categoryToImage[category];
    return mappedName || null; // 매핑된 이름이 없으면 null 반환
  };

  const getImageSource = (category) => {
    try {
      const fileName = getImageFileName(category);
      if (!fileName) {
        return noImage; // 매핑된 이름이 없을 때만 no_img2.png 사용
      }
      return require(`../../resources/images/clients/${fileName}.png`);
    } catch (error) {
      return noImage;
    }
  };

  // 기관명의 첫 글자 가져오기
  const getInitial = (name) => {
    return name.charAt(0);
  };

  // 랜덤 배경색 생성
  const getRandomColor = (text) => {
    const colors = [
      "#4CAF50", // 초록
      "#2196F3", // 파랑
      "#9C27B0", // 보라
      "#FF9800", // 주황
      "#607D8B", // 회색
      "#795548", // 갈색
    ];
    // 텍스트를 기반으로 고정된 색상 선택
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="performance-case">
      <div className="performance-case__header">
        <h2>{performanceData.title || "구축 사례"}</h2>
        <p>{performanceData.description}</p>
      </div>

      <div className="performance-case__years">
        {sortedTimeline.map((item) => (
          <button
            key={item.year}
            className={`performance-case__year-btn ${
              selectedYear === String(item.year) ? "active" : ""
            }`}
            onClick={() => setSelectedYear(String(item.year))}
          >
            {item.year}
          </button>
        ))}
      </div>

      <div className="performance-case__content">
        <FadeInSection>
          <div className="performance-case__list">
            {selectedYearData.projects.map((project, index) => (
              <div key={index} className="performance-case__item">
                <div className="performance-case__item-header">
                  <div className="logo">
                    <img
                      src={getImageSource(project.category)}
                      alt={`${project.category} 로고`}
                    />
                  </div>
                </div>
                <div className="performance-case__item-content">
                  <div className="organization">{project.category}</div>
                  <div className="category">{project.title}</div>
                  <div className="details">
                    <span className="year">{selectedYear}</span>
                    <span className="status">완료</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

export default PerformanceCase;
