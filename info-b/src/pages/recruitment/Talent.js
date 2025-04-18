import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../store/slices/talentSlice";
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
  const dispatch = useDispatch();
  const { talent, status, error } = useSelector((state) => state.talent);

  useEffect(() => {
    dispatch(fetchTalent({ collectionName: "talent", queryOptions: {} }));
  }, [dispatch]);

  console.log("Talent data:", talent);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!talent || !talent[0]?.company?.talent) {
    return <div>No talent data available</div>;
  }

  const talentData = talent[0].company.talent;
  const benefitsData = talentData.benefits.items || [];
  const description = talentData.description || [];
  const benefitsTitle = talentData.benefits?.title || "복리후생";

  const iconMap = {
    "time.png": icon1,
    "growth.png": icon2,
    "smile.png": icon3,
    "sub_icon1.png": icon4,
    "monitor.png": icon5,
    "car.png": icon6,
  };

  return (
    <div className="recruitment-talent">
      <div className="recruitment-main">
        <div className="talent-header">
          <h1 className="">{talentData.title}</h1>
          <p>{talentData.subtitle}</p>
        </div>
        <div className="talent-content">
          <div>
            <div className="talent-title">
              {description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="talent-button">
              <button onClick={() => window.open(talentData.recruitmentUrl)}>
                채용공고 보기
              </button>
            </div>
          </div>
          <div className="talent-img">
            <img src={mainPro2} />
          </div>
        </div>
      </div>
      <div className="recruitment-benefits">
        <div className="">
          <h1 className="text-4xl mb-20">{benefitsTitle}</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 text-white place-items-center">
          {benefitsData.map((item, i) => (
            <div
              className="flex w-96 gap-6 h-28 justify-center items-center"
              key={i}
            >
              <div key={i}>
                <img
                  src={iconMap[item.icon] || icon1}
                  width={85}
                  className="brightness-150 invert"
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
