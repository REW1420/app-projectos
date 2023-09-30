import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBOyaE0dtNQ1KtxR2iWLZ663vwWYMuSbaY",
  authDomain: "pasantias-storage.firebaseapp.com",
  projectId: "pasantias-storage",
  storageBucket: "pasantias-storage.appspot.com",
  messagingSenderId: "652838358",
  appId: "1:652838358:web:5d92adca4f1edce9fb1077",
};

initializeApp(firebaseConfig);
export const storage = getStorage();
