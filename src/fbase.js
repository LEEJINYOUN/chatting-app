import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const database = getDatabase(app);
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const dbGetDocs = getDocs;
export const dbQuery = query;
export const dbOnSnapshot = onSnapshot;
export const dbOrderBy = orderBy;
export const dbDoc = doc;
export const dbDeleteDoc = deleteDoc;
export const dbGetStorage = getStorage;
export const dbRef = ref;
export const dbUploadString = uploadString;
export const dbGetDownloadURL = getDownloadURL;
export const dbDeleteObject = deleteObject;
export const dbWhere = where;
