import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf0qH8XUNFoorusjX2wk_pI4PFg_buoKQ",
  authDomain: "nextjs-imdb.firebaseapp.com",
  projectId: "nextjs-imdb",
  storageBucket: "nextjs-imdb.appspot.com",
  messagingSenderId: "412282033486",
  appId: "1:412282033486:web:21d07865a4ca9f2e84fa1f",
  measurementId: "G-4607KJKH21",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
