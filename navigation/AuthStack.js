import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/auth/Landing';
import SignInScreen from '../screens/auth/SignUp';
import VerificationScreen from '../screens/auth/Verification';
import PasswordScreen from '../screens/auth/Password';
import FirstCarScreen from '../screens/auth/CarChoice';

const Stack = createStackNavigator();

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
				component={FirstCarScreen}
			/>
		</Stack.Navigator>
	);
};
