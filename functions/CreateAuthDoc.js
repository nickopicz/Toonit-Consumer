import { setDoc, doc, getDoc } from 'firebase/firestore'; // Import getDoc for retrieval
import { db } from '../firebase';
import * as crypto from 'crypto';

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
		const salt = crypto.randomBytes(16).toString('hex');

		// Hash the password using pbkdf2
		const hashedPassword = await new Promise((resolve, reject) => {
			crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
				if (err) reject(err);
				resolve(derivedKey.toString('hex'));
			});
		});

		// Store the hashed password and the salt in Firestore under users docID
		await setDoc(doc(db, 'consumers'), {
			password: hashedPassword,
			salt: salt, // Storing the salt for future password verification
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
		const hashedInputPassword = await new Promise((resolve, reject) => {
			crypto.pbkdf2(
				inputPassword,
				storedSalt,
				10000,
				64,
				'sha512',
				(err, derivedKey) => {
					if (err) reject(err);
					resolve(derivedKey.toString('hex'));
				}
			);
		});

		// Compare the hashed input password with the stored hash
		return hashedInputPassword === storedHash;
	} catch (error) {
		console.error('Error verifying password:', error);
		return false;
	}
};
