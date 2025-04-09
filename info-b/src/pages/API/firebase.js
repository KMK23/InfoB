// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGNCl0fP6c53yP_Tq6tEpxo62kGFM08CQ",
  authDomain: "infob-8174a.firebaseapp.com",
  projectId: "infob-8174a",
  storageBucket: "infob-8174a.firebasestorage.app",
  messagingSenderId: "331678925348",
  appId: "1:331678925348:web:223e33cd187868830b4eb1",
  measurementId: "G-MK7K01G839",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function addDatas(collectionName, userObj) {
  try {
    console.log("Adding data to Firestore:", userObj); // 디버깅 로그 추가
    const docRef = await addDoc(collection(db, collectionName), userObj);
    console.log("Document added with ID:", docRef.id); // 문서 ID 출력
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error); // 오류 메시지
    throw new Error(error.message); // 에러 메시지 반환
  }
}

function getCollection(collectionName) {
  return collection(db, collectionName);
}
function getQuery(collectionName, queryOptions) {
  const { conditions = [], orderBys = [], limits } = queryOptions;
  const collect = getCollection(collectionName);
  let q = query(collect);

  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "desc"));
  });

  q = query(q, limit(limits));

  return q;
}

async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData; //게시글 데이터 반환
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log("error Delete", error);
  }
}

// export const uploadFiles = async (file) => {
//   const storageRef = ref(storage, `admin01/profileImgs/${file.name}`);
//   try {
//     // 파일 정보 확인
//     const snapshot = await uploadBytes(storageRef, file);
//     // 스냅샷 정보 확인
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     // 다운로드 URL 확인
//     return downloadURL;
//   } catch (error) {
//     console.error("Upload failed:", error.message); // 오류 메시지 출력
//     throw error;
//   }
// };

async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("문서가 존재하지 않습니다."); // 문서가 없을 경우 오류 던지기
    }

    const resultData = { ...snapshot.data(), docId: snapshot.id };
    return resultData;
  } catch (error) {
    console.log("Error Update", error);
    throw error; // 에러를 던져서 호출하는 쪽에서 처리하게 하기
  }
}

// 로그인 함수
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// 로그아웃 함수
async function signOutUser() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
}

// 현재 로그인된 사용자 가져오기
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

export { getDatas, addDatas, updateDatas, signIn, signOutUser, getCurrentUser };
