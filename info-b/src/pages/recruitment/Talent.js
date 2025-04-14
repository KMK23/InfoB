import React, { useState, useEffect } from "react";
import "../../styles/pages/_talent.scss";
import mainPro2 from "../../resources/images/main/ai_icon.png";
import icon4 from "../../resources/images/main/sub_icon1.png";
import icon6 from "../../resources/images/main/car.png";
import icon5 from "../../resources/images/main/monitor.png";
import icon3 from "../../resources/images/main/smile.png";
import icon1 from "../../resources/images/main/time.png";
import icon2 from "../../resources/images/main/growth.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalent } from "../../store/slices/talentSlice";

const Talent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { talent, status } = useSelector((state) => state.talent);

  useEffect(() => {
    dispatch(fetchTalent());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!talent) {
    return null;
  }

  const { title, description, items } = talent;

  return (
    <div className="recruitment-talent">
      <div className="recruitment-main">
        <div className="talent-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="talent-content">
          <div>
            <div className="talent-title">
              {items.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
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
            <img src={mainPro2} alt="인재상 이미지" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talent;
