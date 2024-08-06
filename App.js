import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HomeStack } from './navigation/HomeStack';
import { useEffect, useState } from 'react';
import { setCoordinates } from './redux/slices/coordinateSlice';
import * as Location from 'expo-location';
import getLocation from './functions/getLocation';
import store from './redux/store';
import { useFonts } from 'expo-font';
import { MyTabs } from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	const [errorMsg, setErrorMsg] = useState('');

	const [fontsLoaded, fontError] = useFonts({
		Montserrat: require('./assets/font/Montserrat-Regular.ttf'),
	});
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
			<NavigationContainer>
				<StatusBar style="dark" />
				{/* <SafeAreaView style={{ flex: 1 }}> */}
				<MyTabs />
				{/* </SafeAreaView> */}
			</NavigationContainer>
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
