import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { setCoordinates } from './redux/slices/coordinateSlice';
import getLocation from './functions/getLocation';
import LoadingScreen from './screens/LoadingScreen';
import { MainTabs } from './navigation/Tabs';
import { AuthStack } from './navigation/AuthStack';
import { auth } from './firebase';
import { useFonts } from 'expo-font';
import { StripeKey } from './keys'; // Import your Stripe publishable key

export default function App() {
	const [errorMsg, setErrorMsg] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const { isLoading } = useSelector((state) => state.loading);
	const [fontsLoaded, fontError] = useFonts({
		Montserrat: require('./assets/font/Montserrat-Regular.ttf'),
	});

	// Access Redux store
	const { passwordValid } = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('loading in home screen: ', isLoading);
		setLoading(isLoading);
	}, [isLoading]);
	// Check user authentication state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log('password valid? : ', passwordValid);
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	// Get user's location and dispatch it to Redux
	useEffect(() => {
		(async () => {
			const location = await getLocation();
			if (location) {
				dispatch(
					setCoordinates({
						latitude: location.latitude,
						longitude: location.longitude,
					})
				);
			} else {
				setErrorMsg('Permission to access location was denied');
			}
		})();
	}, [dispatch]);

	// if (!fontsLoaded) {
	// 	return <LoadingScreen />;
	// }

	return (
		<StripeProvider publishableKey={StripeKey}>
			<NavigationContainer>
				<StatusBar style="dark" />
				<LoadingScreen loading={loading} />
				{errorMsg ? <Text>{errorMsg}</Text> : null}
				{passwordValid && loggedIn ? <MainTabs /> : <AuthStack />}
			</NavigationContainer>
		</StripeProvider>
	);
}
