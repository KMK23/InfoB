import React from "react";
import "../../styles/pages/_talent.scss";
import mainPro2 from "../../resources/images/main/ai_icon.png";
import icon4 from "../../resources/images/main/sub_icon1.png";
import icon6 from "../../resources/images/main/car.png";
import icon5 from "../../resources/images/main/monitor.png";
import icon3 from "../../resources/images/main/smile.png";
import icon1 from "../../resources/images/main/time.png";
import icon2 from "../../resources/images/main/growth.png";
import { useNavigate } from "react-router-dom";
const Talent = () => {
  const navigate = useNavigate();
  const items = [
    {
      icon: icon1,
      name: "근무시간",
      details: [
        "근무시간 : 09:00 ~ 18:00",
        "주 5일 근무제",
        "대체휴일제 적용(관공서와 동일)",
      ],
    },
    {
      icon: icon2,
      name: "4대 보험가입",
      details: [
        "산재, 건강, 고용, 국민연금 가입",
        "건강유지 및 질병예방을 위한 정기적 건강검진 실시",
      ],
    },
    {
      icon: icon3,
      name: "경조사",
      details: ["경조사유에 따른 경조금 지급 및 휴가 부여"],
    },
    {
      icon: icon4,
      name: "교육지원",
      details: ["자기계발 도서구입비 지원", "신입사원 및 직무향상 교육 지원"],
    },
    {
      icon: icon5,
      name: "업무환경",
      details: ["듀얼모니터 및 SSD 등 장비 수시 업그레이드 "],
    },
    { icon: icon6, name: "교통지원", details: ["야간근무 교통비 지급"] },
  ];
  return (
    <div className="recruitment-talent">
      <div className="recruitment-main">
        {/* 인재상  */}

        <div className="talent-header">
          <h1 className="">인재상</h1>
          <p>우리는 이런 인재를 찾습니다.</p>
        </div>
        <div className="talent-content">
          <div>
            <div className="talent-title">
              <p>
                수평적 조직으로 능동적이고 연구 중심적인 문화를 중요시합니다.
              </p>
              <p>전문적인 지식으로 업무에 자부심이 넘치며</p>
              <p>구성원들과 함께 높은 수준의 프로젝트를 수행합니다.</p>
              <p>또한 고객의 눈높이에 맞추며 원활한 소통이 가능합니다.</p>
            </div>
            <div className="talent-button">
              <button
                onClick={() =>
                  window.open(
                    "https://www.saramin.co.kr/zf_user/company-info/view-inner-recruit?csn=enBrbW5VMWRRT3VtOHRPN0swNXU5UT09"
                  )
                }
              >
                채용공고 보기
              </button>
            </div>
          </div>
          <div className="talent-img">
            <img src={mainPro2} />
          </div>
        </div>
      </div>
      {/*복리후생 시작 */}
      <div className="recruitment-benefits">
        <div className="">
          <h1 className=" text-4xl  mb-20"> 복리후생</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 text-white place-items-center  ">
          {items.map((item, i) => (
            <div
              className="flex w-96 gap-6 h-28 justify-center items-center"
              key={i}
            >
              <div key={i}>
                <img
                  src={item.icon}
                  width={85}
                  className=" brightness-150 invert "
                />
              </div>
              <div className="">
                <h2 className="text-2xl">{item.name}</h2>
                <ul className="text-start list-disc text-xl">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Talent;
