import {
	setDoc,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import * as Crypto from 'expo-crypto'; // Import expo-crypto

// Function to create an account and store hashed password with salt
export const handleAccountCreation = async (
	password,
	phoneNum,
	firstName,
	lastName,
	car
) => {
	try {
		// Generate a random salt
		const salt = Crypto.getRandomBytes(16);
		const saltHex = Buffer.from(salt).toString('hex');

		// Hash the password using pbkdf2
		const hashedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			password + saltHex
		);

		// Store the hashed password and the salt in Firestore under users docID
		await setDoc(doc(db, 'consumers'), {
			password: hashedPassword,
			salt: saltHex, // Storing the salt for future password verification
			phoneNum: phoneNum,
			firstName: firstName,
			lastName: lastName,
			cars: car,
		});
	} catch (error) {
		console.error('Error saving password:', error);
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
			return true;
		} else {
			console.log('No account found with the provided phone number.');
			return false;
		}
	} catch (error) {
		console.error('Error retrieving account:', error);
		return { success: false, message: 'Error retrieving account' };
	}
};
