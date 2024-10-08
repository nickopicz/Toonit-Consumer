import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import bcrypt from 'bcryptjs'; // Optional for password hashing

export const handleAccountCreation = async (
	password,
	phoneNum,
	firstName,
	lastName,
	car
) => {
	try {
		//hashing the password for security purposes
		const hashedPassword = bcrypt.hashSync(password, 10);

		// Storing the hashed password in Firestore under users docID
		await setDoc(doc(db, 'consumers'), {
			password: hashedPassword,
			phoneNum: phoneNum,
			firstName: firstName,
			lastName: lastName,
			cars: car,
		});
	} catch (error) {
		console.error('Error saving password:', error);
	}
};
