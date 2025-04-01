import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/pages/_company.scss";

function Company() {
  return (
    <div className="main_content">
      <div className="sec1">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="first-swiper"
        >
          <SwiperSlide className="main_img1">
            <p>
              Total Iaas 서비스 제공
              <span>
                클라우드 구축, 백업, 재해복구 등 <br />
                고객의 환경에 맞는 다양한 클라우드 서비스 제공
              </span>
            </p>
          </SwiperSlide>
          <SwiperSlide className="main_img1">
            <p>
              Total Iaas 서비스 제공
              <span>
                클라우드 구축, 백업, 재해복구 등 <br />
                고객의 환경에 맞는 다양한 클라우드 서비스 제공
              </span>
            </p>
          </SwiperSlide>
          <SwiperSlide className="main_img1">
            <p>
              Total Iaas 서비스 제공
              <span>
                클라우드 구축, 백업, 재해복구 등 <br />
                고객의 환경에 맞는 다양한 클라우드 서비스 제공
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
                간단한 설명 간단한 설명 간단한 설명 간단한 설명 간단한 설명
                간단한 설명 간단한 설명 간단한 설명
              </li>
            </ul>
          </li>
          <li>
            <p className="box2"></p>
            <ul>
              <li className="tit">IoT 시스템구축 및 솔루션</li>
              <li className="con">
                간단한 설명 간단한 설명 간단한 설명 간단한 설명 간단한 설명
                간단한 설명 간단한 설명 간단한 설명
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
                <b>타이틀1</b>내용1
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pro_box2">
            <div>
              <p>
                <b>타이틀2</b>내용2
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pro_box3">
            <div>
              <p>
                <b>타이틀3</b>내용3
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Company;
