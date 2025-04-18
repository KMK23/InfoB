// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import {
  createUserWithEmailAndPassword,
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
import { useRef } from "react";
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
export const db = getFirestore(app);
export { auth };
const storage = getStorage(app);

async function addDatas(collectionName, userObj) {
  try {
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

  if (limits) {
    q = query(q, limit(limits));
  }

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
  return resultData;
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
// 게시글에 댓글 추가
export const addComment = async (postId, commentData) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const docRef = await addDoc(commentsRef, {
      ...commentData,
      createdAt: new Date(),
    });
    return {
      id: docRef.id,
      ...commentData,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("댓글 추가 실패:", error);
    throw error;
  }
};
// 게시글의 댓글 목록 조회
export const getComments = async (postId) => {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const commentsSnapshot = await getDocs(commentsRef);
    return {
      exists: !commentsSnapshot.empty,
      data: commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    };
  } catch (error) {
    console.error("댓글 조회 실패:", error);
    throw error;
  }
};

export const getAdminAnswer = async (postId) => {
  const q = query(collection(db, "answers"), where("postId", "==", postId));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data[0]; // 하나의 답변만 있다고 가정
};
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
// 사용자 역할 가져오기
export const getUserRole = async (uid) => {
  try {
    const docRef = doc(db, "users", uid); // "users" 컬렉션에서 uid로 문서 참조
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().role || "user"; // 기본값은 "user"
    }
    return "user"; // 문서가 없으면 기본적으로 "user"
  } catch (error) {
    console.error("사용자 역할 불러오기 실패:", error);
    return "user"; // 에러 시 기본값은 "user"
  }
};

// 회원가입

async function signUp(email, password, username) {
  try {
    // 이메일이 이미 사용 중인지 확인
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      // 이메일이 이미 사용 중이면 에러 처리
      throw new Error("이 이메일은 이미 사용 중입니다.");
    }

    // 이메일로 Firebase 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // username이 undefined라면 빈 문자열로 처리
    const userNameToSet = username || ""; // username이 undefined일 경우 빈 문자열로 대체

    // Firebase Auth에 사용자 이름 추가
    await updateProfile(user, {
      displayName: userNameToSet,
    });

    // Firestore에 사용자 이름 저장
    await setDoc(doc(db, "users", user.uid), {
      name: userNameToSet, // 'username' 대신 'name' 필드로 저장
      email: user.email,
    });

    return user;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
}

export const getEmailByUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data().email;
  }
  return null;
};
// 이메일 중복 검사 함수
export const checkEmailExists = async (email) => {
  const auth = getAuth();

  // Auth 확인
  const methods = await fetchSignInMethodsForEmail(auth, email);
  if (methods.length > 0) return true; // ✅ 로그인 가능한 이메일 → 사용 중

  // Firestore에만 있는 이메일도 걸러냄
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return true; // ✅ 이미 유저 데이터에 있음
  }

  return false; // 🔓 진짜 완전히 새로운 이메일
};
// 사용자명+ 이메일로 아이디찾기
// 사용자 검색 함수
export const findUserByNameAndEmail = async (name, email) => {
  const q = query(
    collection(db, "users"),
    where("name", "==", name.trim()), // 공백 제거
    where("email", "==", email.trim()) // 공백 제거
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data(); // 일치하는 사용자 반환
  }
  return null; // 일치하는 사용자가 없으면 null 반환
};

// 임시비밀번호로 업데이트
export const sendResetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("비밀번호 재설정 이메일 전송 실패", error);
    return false;
  }
};

// 게시글의 답변 목록 조회
export const getAnswers = async (postId) => {
  try {
    const answersRef = collection(db, "posts", postId, "answers");
    const answersSnapshot = await getDocs(answersRef);
    return {
      exists: !answersSnapshot.empty,
      data: answersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    };
  } catch (error) {
    console.error("답변 조회 실패:", error);
    throw error;
  }
};

// 답변 추가
export const addAnswer = async (postId, answerData) => {
  try {
    const answersRef = collection(db, "posts", postId, "answers");
    const docRef = await addDoc(answersRef, {
      ...answerData,
      createdAt: new Date(),
    });
    return {
      id: docRef.id,
      ...answerData,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("답변 추가 실패:", error);
    throw error;
  }
};

// 답변 수정
export const updateAnswer = async (postId, answerId, answerData) => {
  try {
    const answerRef = doc(db, "posts", postId, "answers", answerId);
    await updateDoc(answerRef, {
      ...answerData,
      updatedAt: new Date(),
    });
    return {
      id: answerId,
      ...answerData,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("답변 수정 실패:", error);
    throw error;
  }
};

// 게시글과 관련된 모든 답변 삭제
export const deletePostWithAnswers = async (postId) => {
  try {
    // 1. 답변 컬렉션의 모든 문서 가져오기
    const answersRef = collection(db, "posts", postId, "answers");
    const answersSnapshot = await getDocs(answersRef);

    // 2. 모든 답변 문서 삭제
    const deleteAnswersPromises = answersSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deleteAnswersPromises);

    // 3. 게시글 삭제
    await deleteDatas("posts", postId);

    return { success: true };
  } catch (error) {
    console.error("게시글 및 답변 삭제 실패:", error);
    throw error;
  }
};

export {
  getDatas,
  addDatas,
  updateDatas,
  signIn,
  signOutUser,
  getCurrentUser,
  deleteDatas,
  signUp,
};
