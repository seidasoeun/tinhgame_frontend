import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEWhzXI-sP3_Z8wk2jQzgPLcyq7Box8MI",
  authDomain: "tinhgame-95938.firebaseapp.com",
  projectId: "tinhgame-95938",
  storageBucket: "tinhgame-95938.appspot.com",
  messagingSenderId: "963192735757",
  appId: "1:963192735757:web:a6bdf3c8f13bc0d4daed44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);