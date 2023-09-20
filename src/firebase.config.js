import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyClQ4yHwg8vDD8HCqOrHnlJb4LRRZnlEh8',
  authDomain: 'drag-and-drop-30f53.firebaseapp.com',
  projectId: 'drag-and-drop-30f53',
  storageBucket: 'drag-and-drop-30f53.appspot.com',
  messagingSenderId: '778096405147',
  appId: '1:778096405147:web:37399125f63b74ebb3343e',
  measurementId: 'G-2LT7Q4HF0Q',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
