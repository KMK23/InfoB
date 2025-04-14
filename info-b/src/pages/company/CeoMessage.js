import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasicInfo } from "../../store/slices/basicInfoSlice";
import "../../styles/pages/_ceoMessage.scss";
import ceoImage from "../../resources/images/main/CEO.webp";

const CeoMessage = () => {
  const dispatch = useDispatch();
  const { basicInfo, status } = useSelector((state) => state.basicInfo);

  useEffect(() => {
    dispatch(fetchBasicInfo({ collectionName: "basicInfo", queryOptions: {} }));
  }, [dispatch]);

  console.log("BasicInfo data:", basicInfo);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!basicInfo || !Array.isArray(basicInfo) || basicInfo.length === 0) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const basicData = basicInfo[0];
  if (!basicData?.company?.ceo) {
    return <div>CEO 정보를 찾을 수 없습니다.</div>;
  }

  const { message, name, position, title } = basicData.company.ceo;

  return (
    <div className="ceo-message">
      <div className="ceo-message__container">
        <div className="ceo-message__content">
          <h1 className="title">CEO 인사말</h1>
          <div className="message">
            {message?.content?.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
          <div className="signature">
            <div className="position">{position || "대표이사"}</div>
            <div className="name">{name || "유 종 욱"}</div>
          </div>
        </div>
        <div className="ceo-message__image">
          <img src={ceoImage} alt="CEO" />
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
