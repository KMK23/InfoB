import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformance } from "../../store/slices/performanceSlice";
import "../../styles/pages/_performanceCase.scss";
import FadeInSection from "../../components/FadeInSection";

function PerformanceCase() {
  const [selectedYear, setSelectedYear] = useState("2021");
  const dispatch = useDispatch();
  const { performance, status } = useSelector((state) => state.performance);

  useEffect(() => {
    dispatch(fetchPerformance());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!performance) {
    return null;
  }

  const { timeline } = performance.company.performanceCases;
  const years = Object.keys(timeline).sort((a, b) => b - a);
  const selectedYearData = timeline[selectedYear];

  return (
    <div className="performance-case">
      <div className="performance-case__header">
        <h2>구축 사례</h2>
        <p>
          다양한 분야의 프로젝트 수행 경험을 통해 축적된 기술력으로 최상의
          서비스를 제공합니다.
        </p>
      </div>

      <div className="performance-case__years">
        {years.map((year) => (
          <button
            key={year}
            className={`performance-case__year-btn ${
              selectedYear === year ? "active" : ""
            }`}
            onClick={() => setSelectedYear(year)}
          >
            {year}년
          </button>
        ))}
      </div>

      <div className="performance-case__content">
        <FadeInSection>
          <div className="performance-case__year">
            <div className="performance-case__list">
              {selectedYearData.projects.map((project, index) => (
                <div key={index} className="performance-case__item">
                  <span className="performance-case__category">
                    {project.category}
                  </span>
                  <h3 className="performance-case__title">{project.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

export default PerformanceCase;
