import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDWL7F6tACS3HkLKSXBqee1mwEqi9f43aU',
	authDomain: 'todolist-36bbc.firebaseapp.com',
	projectId: 'todolist-36bbc',
	storageBucket: 'todolist-36bbc.appspot.com',
	messagingSenderId: '716847417509',
	appId: '1:716847417509:web:051f323a4795f037d6654c',
	databaseURL: 'https://todolist-36bbc-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
