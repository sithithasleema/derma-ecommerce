// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL03a8PiZ3TPAOsHQtYXqg1zsuzwy8eEc",
  authDomain: "elite-canvas-australia-c3c44.firebaseapp.com",
  projectId: "elite-canvas-australia-c3c44",
  storageBucket: "elite-canvas-australia-c3c44.firebasestorage.app",
  messagingSenderId: "852495210164",
  appId: "1:852495210164:web:f8dcfaeb3db692b856a9e1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
