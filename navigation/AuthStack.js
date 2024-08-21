import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/auth/Landing';
import SignInScreen from '../screens/auth/SignUp';

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
		</Stack.Navigator>
	);
};