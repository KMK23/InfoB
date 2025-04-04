import React, { useEffect, useRef } from "react";
import "../../styles/pages/_history.scss";
import logo from "../../resources/images/main/logo_t.png";

function History() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, options);

    const timelineItems =
      timelineRef.current.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const timeline = [
    {
      year: "2022",
      events: [],
    },
    {
      year: "2021",
      events: [
        "AI2K 주파수 변환을 이용한 플랜트 설비의 기술성사업화 확정",
        "차세대 국가융합연구단지조성사업(나라장터) 구축 사업 참여",
        "정보통신공사업 지역 등록",
        "구성품산업바제조 공장 설립 등록",
      ],
    },
    {
      year: "2020",
      events: [
        "화학물질 관리 정책 및 이를 활용한 관리 시스템 특허 출원",
        "담수화 기법의 태양광 발전 EMS 개발",
      ],
    },
    {
      year: "2019",
      events: [
        "벤처기업 인증",
        "기업부설연구소 설립",
        "가로등 고장 감지 장치 특허 출원",
      ],
    },
    {
      year: "2018",
      events: [
        "휴대용 충전장치 및 그의 충전장치 특허 등록",
        "휴대용 충전장치 및 그의 충전장치 특허 등록",
      ],
    },
    {
      year: "2017",
      events: [
        "대표이사 유종욱 취임",
        "조달청 전자조달 등록",
        "한국소프트웨어산업협회 등록",
        "(주)인포비정보기술 법인 설립",
      ],
    },
  ];

  return (
    <div>
      <div className="history-content">
        <div className="history-content__container">
          <div className="company-logo">
            <img src={logo} alt="INFOB" />
          </div>
          <div className="page-header">
            <div className="page-header__container">
              <h1>연혁</h1>
              <p>INFOB의 발자취를 소개합니다</p>
            </div>
          </div>
          <div className="timeline" ref={timelineRef}>
            {timeline.map((period, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">
                  <span>{period.year}</span>
                </div>
                <div className="timeline-content">
                  {period.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="timeline-event">
                      {event}
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
}

export default History;
