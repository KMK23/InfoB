import React, { useEffect } from "react";
import { checkAuth } from "./../../../store/slices/authSlice";
import { MdCheckBox } from "react-icons/md";
import History from "./../../company/History";
import { useNavigate } from "react-router-dom";

function Accession(props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 📌 주소 팝업 열기
  const sample6_execDaumPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 스크립트가 아직 로드되지 않았습니다.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          document.getElementById("sample6_extraAddress").value = extraAddr;
        } else {
          document.getElementById("sample6_extraAddress").value = "";
        }

        document.getElementById("sample6_postcode").value = data.zonecode;
        document.getElementById("sample6_address").value = addr;
        document.getElementById("sample6_detailAddress").focus();
      },
    }).open();
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="mx-52">
      <div>
        <h1 className="text-3xl font-bold text-start">회원가입</h1>
      </div>
      <div className="flex  justify-center flex-col gap-2 mt-10 py-4 mx-40 border-t border-gray-300 ">
        <div className="flex gap-2 ">
          <div className="font-bold w-1/5">아이디</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">비밀번호</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">비밀번호 확인</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">이름</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">생년월일</div>
          <div className="w-4/5 pr-2">
            <input
              type="date"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
            <p className="text-start">
              생년월일 8자리를 입력해 주세요. ex)19670716
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">성별</div>
          <div className="w-4/5 flex gap-2">
            <input type="checkbox" name="gender" value="male" />
            남자
            <input type="checkbox" name="gender" value="female" />
            여자
            <input type="checkbox" name="gender" value="no" />
            선택안함
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">전화번호</div>
          <div className="w-4/5 pr-2">
            <input
              type="tell"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">이메일</div>
          <div className="flex flex-col gap-2">
            <div className=" pr-2 flex gap-2">
              <input
                type="email"
                className="border border-gray-300 py-2 px-2 rounded-md "
              />
              <button
                className="bg-blue-500
            text-white rounded-md  px-2"
              >
                중복검사
              </button>
            </div>
            <div className=" pr-2 flex gap-2">
              <input
                type="email"
                className="border border-gray-300 py-2 px-2 rounded-md "
              />
              <button
                className="bg-red-500
            text-white rounded-md  px-2"
              >
                인증번호 확인
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5 ">부서</div>
          <div className="w-4/5 pr-2">
            <select className="border border-gray-300 w-full py-2 pl-2">
              <option value="" disabled selected hidden>
                부서를 선택해주세요
              </option>
              <option value="">기업부설연구소</option>
              <option value="">사업관리부</option>
              <option value="">경영지원팀</option>
              <option value="">ICT사업부</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">직급</div>
          <div className="w-4/5 pr-2">
            <select className="border border-gray-300 w-full py-2 pl-2">
              <option value="" disabled selected hidden>
                직급을 선택해주세요
              </option>
              <option value="">사장</option>
              <option value="">이사</option>
              <option value="">부장</option>
              <option value="">차장</option>
              <option value="">과장</option>
              <option value="">대리</option>
              <option value="">주임</option>
              <option value="">사원</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">프로젝트</div>
          <div className="w-4/5 pr-2">
            <select className="border border-gray-300 w-full py-2 pl-2">
              <option value="" disabled selected hidden>
                프로젝트를 선택해주세요
              </option>
              <option value="">본사</option>
              <option value="">프로젝트_1</option>
              <option value="">프로젝트_2</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">자택주소</div>
          <div className="w-4/5 flex flex-col gap-1">
            <div className="flex gap-1">
              <input
                type="text"
                id="sample6_postcode" // ✅ 우편번호
                className="border border-gray-300 py-2 px-2 rounded-md"
                placeholder="우편주소"
              />
              <button
                type="button"
                onClick={sample6_execDaumPostcode}
                className="border-gray-300 border rounded-md px-2 hover:bg-gray-300"
              >
                우편번호 찾기
              </button>
            </div>
            <div>
              <input
                type="text"
                id="sample6_address" // ✅ 기본주소
                placeholder="주소"
                className="border border-gray-300 py-2 px-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                id="sample6_extraAddress" // ✅ 참고주소 (예: 건물명, 법정동 등)
                placeholder="참고항목"
                className="border border-gray-300 w-full py-2 px-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="sample6_detailAddress" // ✅ 상세주소
                placeholder="상세주소"
                className="border border-gray-300 w-full py-2 px-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-gray-300 ">
          <button
            className="bg-red-700 text-white py-2 px-4 rounded-md my-5"
            onClick={handleBack}
          >
            취소
          </button>
          <button className="bg-[#404040] text-white py-2 px-4 rounded-md my-5">
            가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accession;
