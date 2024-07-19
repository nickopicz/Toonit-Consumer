import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HomeStack } from './navigation/HomeStack';
import { useEffect, useState } from 'react';
import { setCoordinates } from './redux/slices/coordinateSlice';
import * as Location from 'expo-location';
import getLocation from './functions/getLocation';
import store from './redux/store';

export default function App() {
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		(async () => {
			const location = await getLocation();
			if (location) {
				setCoordinates(location);
			} else {
				setErrorMsg('Permission to access location was denied');
			}
		})();
	});
	return (
		<Provider store={store}>
			<HomeStack />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
