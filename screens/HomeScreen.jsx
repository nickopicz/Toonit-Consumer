// MapScreen.js

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import watchLocation from '../functions/watchLocation';
import { setCoordinates } from '../redux/slices/coordinateSlice';
import * as Location from 'expo-location'
import { useDispatch } from 'react-redux';
//must get API key

const MapScreen = () => {

	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector(state => state.coordinates);

	useEffect(() => {
		const watchLocationUpdates = async () => {
			await watchLocation(
				(location) => dispatch(setCoordinates(location)),
				(error) => console.error(error) // Handle error appropriately
			);
		};

		watchLocationUpdates();

		// Optionally, you can return a cleanup function to stop watching the location when the component unmounts
		// return () => {
		// 	Location.hasStartedLocationUpdatesAsync()
		// 		.then((started) => {
		// 			if (started) {
		// 				Location.stopLocationUpdatesAsync();
		// 			}
		// 		})
		// 		.catch((error) => console.error('Error stopping location updates:', error));
		// };
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<MapView
				provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
				style={styles.map}
				region={{
					latitude: latitude ? latitude : 144.0303,
					longitude: longitude ? longitude : -122.4324,
					latitudeDelta: 0.022,
					longitudeDelta: 0.421,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MapScreen;
