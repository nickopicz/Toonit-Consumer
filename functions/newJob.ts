import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this points to the correct path

// Define the car object interface
interface Car {
    make: string;
    model: string;
    year: number;
}

// Function to create a document in Firebase Firestore
async function createJob(
    userID: string,
    notes: string,
    region: string,
    name: string,
    type: string,
    date: Date,
    car: Car,
    accepted: boolean = false,
    profileUrl: string = ""
) {
    try {
        // Define the document data in the required structure
        const documentData = {
            accepted: accepted,
            address: "216 Hudson St, Hoboken, NJ, 07087", // Static address, you can adjust this if needed
            car: {
                make: car.make,
                model: car.model,
                year: car.year
            },
            complete: false,
            costs: [
                {
                    oil: 25.99
                }
            ],
            date: Timestamp.fromDate(date), // Converts Date object to Firestore timestamp
            mechNotes: "",
            mechanicID: "",
            name: name,
            notes: notes,
            photos: [""],
            profileUrl: profileUrl,
            region: region,
            type: type,
            userID: userID
        };

        // Get a reference to the collection (e.g., 'jobs')
        const jobsCollectionRef = collection(db, 'jobs'); // Adjust 'jobs' to your actual collection name

        // Save the document to Firestore
        const docRef = await addDoc(jobsCollectionRef, documentData);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export default createJob;
