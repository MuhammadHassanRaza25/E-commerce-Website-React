import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBXttarl1TJHfOH5bTMHgznDRBDtn4lpKU",
  authDomain: "e-commerce-website-react-7a779.firebaseapp.com",
  projectId: "e-commerce-website-react-7a779",
  storageBucket: "e-commerce-website-react-7a779.appspot.com",
  messagingSenderId: "904239587885",
  appId: "1:904239587885:web:0147c5a1bb9e8d5f594ea4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{app, auth}