import { createStackNavigator } from '@react-navigation/stack';
import ReceiptListScreen from '../screens/History/RecepitsList';
import ProfileScreen from '../screens/ProfileScreen';
import CarScreen from '../screens/auth/CarChoice';

const Stack = createStackNavigator();

export const ProfileStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Profile"
		>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
			/>
			<Stack.Screen
				name="Car"
				component={CarScreen}
			/>
		</Stack.Navigator>
	);
};
