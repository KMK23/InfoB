import { business, partner, privat } from "./bsns";
import { useEffect, useState } from "react";
import { fetchImage } from "../API/firebase";
import { getStorage, ref, listAll } from "firebase/storage";

// Storage의 모든 clients 이미지 파일 리스트 가져오기
async function getAllClientImageFiles() {
  const storage = getStorage();
  const folders = ["clients", "clients/static/media"];
  let allFiles = [];
  for (const folder of folders) {
    const listRef = ref(storage, folder);
    const res = await listAll(listRef);
    allFiles = allFiles.concat(
      res.items.map((item) => ({
        path: item.fullPath,
        name: item.name,
      }))
    );
  }
  return allFiles;
}

function Business(props) {
  const [imageUrls, setImageUrls] = useState({});
  const [mainImg, setMainImg] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    async function loadImages() {
      const allImages = [
        ...business.map((item) => item.img),
        ...partner.map((item) => item.img),
        ...privat.map((item) => item.img),
      ].filter(Boolean);
      const uniqueImages = Array.from(new Set(allImages));
      const storageFiles = await getAllClientImageFiles();

      // 매칭: img 값이 포함된 storage 파일명 찾기
      const imgToStoragePath = {};
      uniqueImages.forEach((img) => {
        // 확장자 없는 경우도 대비
        const base = img.replace(/\.[^/.]+$/, "");
        const found = storageFiles.find((file) => file.name.includes(base));
        if (found) imgToStoragePath[img] = found.path;
      });

      // fetchImage로 URL 받아오기
      Promise.all(
        uniqueImages.map(async (img) => {
          const path = imgToStoragePath[img];
          if (!path) {
            // console.log("이미지 매칭 실패:", img);
            return [img, ""];
          }
          try {
            const url = await fetchImage(path);
            // console.log("이미지 URL:", img, url);
            return [img, url];
          } catch (e) {
            // console.error("fetchImage 에러:", img, path, e);
            return [img, ""];
          }
        })
      ).then((entries) => {
        setImageUrls(Object.fromEntries(entries));
      });

      // 상단 아이콘도 동일하게 처리
      const mainIcon = storageFiles.find((file) =>
        file.name.includes("partner")
      );
      const userIcon = storageFiles.find((file) => file.name.includes("users"));
      if (mainIcon) fetchImage(mainIcon.path).then(setMainImg);
      if (userIcon) fetchImage(userIcon.path).then(setUserImg);
    }
    loadImages();
  }, []);

  return (
    <div className="mt-10 mx-52">
      <div className="">
        <h1 className="font-bold text-3xl text-start flex gap-2 items-center">
          {/* <img src={mainImg} className="w-14" alt="고객사" /> */}
          고객사
        </h1>
        <div className="flex flex-col mt-10">
          <h1 className="font-bold text-xl text-start">공공분야 주요고객</h1>
          <div className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {business.map((item, index) => (
                <li key={index}>
                  <a href={item.href} target="_blank" rel="">
                    <img
                      src={imageUrls[item.img] || ""}
                      className="border border-gray-300 w-48 h-16 rounded-md "
                      alt={item.name || "고객사"}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-start text-xl font-bold mt-5">
            민간분야 주요고객
          </h1>
          <div className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {privat.map((item) => (
                <li key={item.id}>
                  <a href={item.href} target="_blank" rel="">
                    <img
                      src={imageUrls[item.img] || ""}
                      className="border border-gray-300 w-48 h-16 rounded-md"
                      alt={item.name || "고객사"}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-40">
        <h1 className="text-3xl font-bold text-start  flex gap-2 items-center">
          {/* <img src={userImg} className="w-14" alt="파트너" /> */}
          파트너
        </h1>
        <div className="mt-2">
          <ul className="flex flex-wrap gap-2">
            {partner.map((item) => (
              <li key={item.id}>
                <a href={item.href} target="_blank" rel="">
                  <img
                    src={imageUrls[item.img] || ""}
                    className="border border-gray-300 w-48 h-16 rounded-md"
                    alt={item.name || "파트너"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Business;
