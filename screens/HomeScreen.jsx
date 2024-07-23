import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import watchLocation from '../functions/watchLocation';
import { setCoordinates } from '../redux/slices/coordinateSlice';
import * as Location from 'expo-location'
import { useDispatch } from 'react-redux';
import HorizontalSliderModal from '../components/misc/SlideModal';
import SearchBar from '../components/misc/SearchBar';
import RecenterButton from '../components/Touchables/MapAdjust';
//must get API key

const mockData = [
	{ id: '1', title: 'Item 1' },
	{ id: '2', title: 'Item 2' },
	{ id: '3', title: 'Item 3' },
	{ id: '4', title: 'Item 4' },
	{ id: '5', title: 'Item 5' },
];

const MapScreen = () => {

	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector(state => state.coordinates);
	const [slideModalVis, setSlideModalVis] = useState(true)
	const [searchValue, setSearchValue] = useState("")
	const mapRef = useRef(null);
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

	const handleRecenter = () => {
		if (latitude && longitude && mapRef.current) {
			mapRef.current.animateToRegion(
				{
					latitude,
					longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				},
				1000
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<MapView
					ref={mapRef}
					provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
					style={styles.map}

					initialRegion={{
						latitude: latitude || 37.78825,
						longitude: longitude || -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				<HorizontalSliderModal data={mockData} />
				<RecenterButton onPress={handleRecenter} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MapScreen;
