import { business, partner, privat } from "./bsns";
import { useEffect, useState } from "react";
import { fetchImage } from "../API/firebase";
import { getStorage, ref, listAll } from "firebase/storage";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadImages() {
      try {
        const allImages = [
          ...business.map((item) => item.img),
          ...partner.map((item) => item.img),
          ...privat.map((item) => item.img),
        ].filter(Boolean);
        const uniqueImages = Array.from(new Set(allImages));
        const storageFiles = await getAllClientImageFiles();

        const imgToStoragePath = {};
        uniqueImages.forEach((img) => {
          const base = img.replace(/\.[^/.]+$/, "");
          const found = storageFiles.find((file) => file.name.includes(base));
          if (found) imgToStoragePath[img] = found.path;
        });

        const entries = await Promise.all(
          uniqueImages.map(async (img) => {
            const path = imgToStoragePath[img];
            if (!path) return [img, ""];
            try {
              const url = await fetchImage(path);
              return [img, url];
            } catch (e) {
              return [img, ""];
            }
          })
        );
        setImageUrls(Object.fromEntries(entries));

        const mainIcon = storageFiles.find((file) =>
          file.name.includes("partner")
        );
        const userIcon = storageFiles.find((file) =>
          file.name.includes("users")
        );
        if (mainIcon) fetchImage(mainIcon.path).then(setMainImg);
        if (userIcon) fetchImage(userIcon.path).then(setUserImg);

        setIsLoading(false); // ✅ 이미지 로딩 끝
      } catch (error) {
        console.error("이미지 로딩 실패:", error);
        setIsLoading(false); // 실패해도 로딩 종료
      }
    }
    loadImages();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader size={50} color="#000" loading={true} />
      </div>
    );
  }
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
