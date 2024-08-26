import LandingScreen from '../screens/auth/Landing';
import SignInScreen from '../screens/auth/SignUp';
import VerificationScreen from '../screens/auth/Verification';
import PasswordScreen from '../screens/auth/Password';
import CarScreen from '../screens/auth/CarChoice';
import TermsScreen from '../screens/auth/Terms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Landing"
				component={LandingScreen}
			/>
			<Stack.Screen
				name="Signin"
				component={SignInScreen}
			/>
			<Stack.Screen
				name="Verification"
				component={VerificationScreen}
			/>
			<Stack.Screen
				name="Password"
				component={PasswordScreen}
			/>
			<Stack.Screen
				name="Car"
				component={CarScreen}
			/>
			<Stack.Screen
				name="Terms"
				component={TermsScreen}
			/>
		</Stack.Navigator>
	);
};
