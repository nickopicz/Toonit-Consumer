// src/watchLocation.ts
import * as Location from 'expo-location';

interface LocationCoordinates {
    latitude: number;
    longitude: number;
}

async function watchLocation(
    onLocationUpdate: (location: LocationCoordinates) => void,
    onError: (errorMsg: string) => void
) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        onError('Permission to access location was denied');
        return;
    }

    await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000, // Update every second
            distanceInterval: 1, // Update every meter
        },
        (location) => {
            // console.log("location in function: ", location)
            onLocationUpdate({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        }
    );
}

export default watchLocation;
