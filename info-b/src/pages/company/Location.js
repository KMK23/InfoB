import React from "react";
import "../../styles/pages/_location.scss";
import KakaoMap from "../../components/KaKaoMap";

function Location() {
  return (
    <div className="location-page">
      <div className="page-header">
        <h1>오시는 길</h1>
        <p>INFOB을 방문해주셔서 감사합니다</p>
      </div>

      <div className="map-container">
        <KakaoMap />
      </div>

      <div className="location-info">
        <div className="address">
          <h3>주소</h3>
          <p>대전광역시 서구 문예로 69, 702호(둔산동, 오성빌딩)</p>
        </div>
        <div className="contact">
          <h3>연락처</h3>
          <p>Tel : 042-483-6572 | Fax : 042-484-6572</p>
        </div>
        <div className="copyright">
          <p>© 2022 INFOB. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Location;
