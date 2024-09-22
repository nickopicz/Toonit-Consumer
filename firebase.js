import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyDxHfoimofYBhTAelJ5w2k2g3ZvmcrwGq0',

	authDomain: 'toonit-bb731.firebaseapp.com',

	projectId: 'toonit-bb731',

	storageBucket: 'toonit-bb731.appspot.com',

	messagingSenderId: '493923382893',

	appId: '1:493923382893:web:ba90ad4f21f759f843b164',

	measurementId: 'G-0TNQ23SXWX',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
