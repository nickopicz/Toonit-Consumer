import * as Location from 'expo-location';

interface LocationCoordinates {
    latitude: number;
    longitude: number;
}

async function getLocation(): Promise<LocationCoordinates | null> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location: ", location)
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
}

export default getLocation;
