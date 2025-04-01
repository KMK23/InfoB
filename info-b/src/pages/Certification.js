import React from "react";
import "../styles/pages/_certification.scss";

function Certification() {
  const certifications = [
    {
      title: "기업부설연구소 인정서",
      description:
        "『 기초연구진흥 및 기술개발 지원에 관한 법률 』 제14조에 의거 기업의 연구소(전담부서)를 신고, 인정함으로써 각종 조세, 관세, 자금지원 및 병역 대체복무 등의 혜택을 부여하고, 기업의 기술개발을 적극적으로 촉진, 유도하는 동시에 이들 연구조직을 효율적으로 육성, 지원하는 제도",
    },
    {
      title: "벤처기업 확인서",
      description:
        '『벤처기업육성에 관한 특별조치법』제2조의 2 "벤처기업의 요건"을 충족하는 기업으로 다른 기업에 비해 기술성이나 성장성이 상대적으로 높아, 정부에서 지원할 필요가 있다고 인정하는 벤처기업 확인제도',
    },
    {
      title: "소프트웨어사업자 신고확인서",
      description:
        "소프트웨어 수요자에 신뢰성 있는 정보제공을 통한 소프트웨어의 이용 촉진 등 산업의 건전한 발전을 도모하고, 중소 소프트웨어 사업자의 권익 보호를 목적으로 하고 있습니다.",
    },
    {
      title: "중소기업 확인서",
      description:
        "『중소기업기본법』 제2조에 따른 중소기업 여부를 확인하는 것으로서 『조세특례제한법』이나 『중소기업 판로지원법』등 개별법에서 정한 중소기업",
    },
    {
      title: "직접생산확인 증명서",
      description:
        "『중소기업제품 구매촉진 및 판로지원에 관한 법률』 제9조 내지 제 25조 공공기관이 중소기업자간 경쟁제품에 대하여 중소기업자간 경쟁의 방법 또는 1천만원 이상의 수의계약의 방법으로 제품조달계약을 체결하는 경우 해당 중소기업자의 직접생산 여부를 확인하도록 의무화 하는 제도",
    },
  ];

  const patents = [
    {
      title: "가로등 고장 감지 장치",
      number: "특허 제 10-2073589호",
      date: "2020년 1월 30일",
    },
    {
      title: "무선충전 기능을 구비한 다이어리 설치용 다용도 충전장치",
      number: "특허 제 10-1520935호",
      date: "2015년 5월 11일",
    },
    {
      title: "휴대용 충전 장치 및 그의 충방전 방법",
      number: "특허 제 10-1453929호",
      date: "2014년 10월 16일",
    },
    {
      title: "휴대용 충전 장치",
      number: "특허 제 10-1456582호",
      date: "2014년 10월 24일",
    },
    {
      title: "시간-주파수 변환을 이용한 플랜트 설비의 누출음 탐지 장치 및 방법",
      number: "특허 제 10-1958628호",
      date: "2019년 3월 11일",
    },
  ];

  return (
    <div className="certification-page">
      <div className="page-header">
        <div className="page-header__container">
          <h1>인증 및 특허</h1>
          <p>INFOB의 기술력과 신뢰성을 입증하는 인증서와 특허입니다.</p>
        </div>
      </div>

      <div className="certification-content">
        <div className="certification-content__container">
          <section className="certification-section">
            <h2>인증서</h2>
            <div className="certification-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <div className="certification-item__content">
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                    <button className="view-button">인증서 크게보기</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="patent-section">
            <h2>특허</h2>
            <div className="patent-grid">
              {patents.map((patent, index) => (
                <div key={index} className="patent-item">
                  <div className="patent-item__content">
                    <h3>{patent.title}</h3>
                    <p className="patent-number">{patent.number}</p>
                    <p className="patent-date">등록일: {patent.date}</p>
                    <button className="view-button">특허 크게보기</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Certification;
