import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCWAWRZcbdRuXO_q5xiBxWGSi-TGleZZ8",
  authDomain: "gourmetgatherings-e47b3.firebaseapp.com",
  projectId: "gourmetgatherings-e47b3",
  storageBucket: "gourmetgatherings-e47b3.appspot.com",
  databaseURL:
    "https://gourmetgatherings-e47b3-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "712680618459",
  appId: "1:712680618459:web:c82b9a014e7419771c4ffe",
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);

export default app;
