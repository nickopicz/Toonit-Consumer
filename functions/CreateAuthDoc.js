import {
	setDoc,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
	addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import * as Crypto from 'expo-crypto'; // Import expo-crypto

// Helper function to convert Uint8Array to hex string
const bytesToHex = (bytes) => {
	return Array.from(bytes)
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
};

export const handleAccountCreation = async (
	password,
	phoneNum,
	firstName,
	lastName,
	car
) => {
	try {
		console.log('phone: ', phoneNum);
		console.log('first: ', firstName);
		// Generate a random salt
		const salt = Crypto.getRandomBytes(16);
		const saltHex = bytesToHex(salt);

		console.log('Password:', password); // Debugging line
		console.log('Salt Hex:', saltHex); // Debugging line

		// Hash the password using SHA512 with the salt
		const hashedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			password + saltHex
		);
		console.log('hash: ', hashedPassword);
		// Store the hashed password and the salt in Firestore
		await addDoc(collection(db, 'consumers'), {
			password: hashedPassword,
			salt: saltHex, // Storing the salt for future password verification
			phoneNum: phoneNum,
			firstName: firstName,
			lastName: lastName,
			cars: car,
		});
	} catch (e) {
		console.warn('error hashing: ', e);
	}
};
// Function to retrieve user data and verify the password
export const retrieveAndVerifyPassword = async (enteredPassword) => {
	try {
		// Retrieve the user document from Firestore
		const docRef = doc(db, 'consumers');
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();

			const storedHash = userData.password;
			const storedSalt = userData.salt;

			// Verify the entered password by hashing it again with the stored salt
			const isValidPassword = await verifyPassword(
				enteredPassword,
				storedHash,
				storedSalt
			);
			return isValidPassword;
		} else {
			console.log('No such document!');
			return false;
		}
	} catch (error) {
		console.error('Error retrieving user data:', error);
		return false;
	}
};

// Helper function to verify the password
const verifyPassword = async (inputPassword, storedHash, storedSalt) => {
	try {
		const hashedInputPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			inputPassword + storedSalt
		);

		// Compare the hashed input password with the stored hash
		return hashedInputPassword === storedHash;
	} catch (error) {
		console.error('Error verifying password:', error);
		return false;
	}
};

export const findAccount = async (phoneNum) => {
	try {
		// Create a query against the "consumers" collection where the phoneNum matches
		const q = query(
			collection(db, 'consumers'),
			where('phoneNum', '==', phoneNum)
		);
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			// Assuming you need to return the found account's data
			return { success: true, message: 'Found account!' };
		} else {
			console.log('No account found with the provided phone number.');
			return { success: false, message: 'No account found.' };
		}
	} catch (error) {
		console.error('Error retrieving account:', error);
		return { success: false, message: 'Error retrieving account' };
	}
};
