import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/pages/_company.scss";

function Company() {
  return (
    <div className="main_content">
      <div className="sec1">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="first-swiper"
        >
          <SwiperSlide className="main_img1 slide1">
            <p>
              SI & 컨설팅 서비스
              <span>
                정보화 전략 수립부터 시스템 구축까지 <br />
                고객 맞춤형 통합 솔루션 제공
              </span>
            </p>
          </SwiperSlide>
          <SwiperSlide className="main_img1 slide2">
            <p>
              IoT 시스템 구축
              <span>
                하드웨어 개발 및 맞춤형 IoT 솔루션으로 <br />
                스마트한 디지털 혁신 구현
              </span>
            </p>
          </SwiperSlide>
          <SwiperSlide className="main_img1 slide3">
            <p>
              클라우드 인프라 서비스
              <span>
                클라우드 구축, 백업, 재해복구 등 <br />
                안정적인 IT 인프라 환경 구축
              </span>
            </p>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="sec2">
        <p className="sec_title about">
          <b>About</b>
        </p>
        <span>
          IT 분야에서 기업 고객의 효율적인 IT 환경 구축을 위해 SI, e-Service,{" "}
          <br />
          IT Outsourcing, 기술 지원 서비스를 제공하며 안정적인 성장을 이루어
          왔습니다.
          <br />
          아울러 loT Platform 연구를 통해 지능적인 미래 사회에 도래할 4차
          산업혁명을 <br />
          대비한 플랫폼의 개발 및 상품화를 통해 Global Market의 진출 및 신 사업
          발굴 등 <br />
          미래 시장 경쟁에 앞서고자 끊임 없는 노력과 도전을 하고 있습니다.
        </span>
      </div>

      <div className="sec3">
        <ul>
          <li>
            <p className="box1"></p>
            <ul>
              <li className="tit">IT Service</li>
              <li className="con">
                SI/SM 구축 및 운영, 시스템 통합 유지보수를 통해 공공 및 민간
                분야의 IT 시스템 구축부터 운영까지, 전문적인 기술력으로 고객
                맞춤형 서비스를 제공합니다.
              </li>
            </ul>
          </li>
          <li>
            <p className="box2"></p>
            <ul>
              <li className="tit">IoT 시스템구축 및 솔루션</li>
              <li className="con">
                하드웨어 개발 및 맞춤형 IoT 솔루션 제공을 통해 IoT 기기 개발부터
                시스템 구축까지, 고객의 환경에 맞는 다양한 IoT 솔루션을
                제공합니다.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="sec4">
        <p className="sec_title product">Product</p>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={40}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          className="second-swiper"
        >
          <SwiperSlide className="pro_box1">
            <div>
              <p>
                <b>시스템 통합 구축</b>
                공공/민간 분야 SI 구축 및 컨설팅
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pro_box2">
            <div>
              <p>
                <b>IoT 솔루션</b>
                IoT 하드웨어 개발 및 시스템 구축
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pro_box3">
            <div>
              <p>
                <b>유지보수 서비스</b>
                IT 시스템 통합 유지보수 및 운영
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Company;
