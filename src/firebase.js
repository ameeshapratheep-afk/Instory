import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ9TbxzAlRrlqdCdUzKo4haDNAwRWe_wo",
  authDomain: "instory-app-78ca9.firebaseapp.com",
  projectId: "instory-app-78ca9",
  storageBucket: "instory-app-78ca9.firebasestorage.app",
  messagingSenderId: "889330601899",
  appId: "1:889330601899:web:1307cd33c5130ce4a58cee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();