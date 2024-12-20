import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptListScreen from '../screens/History/RecepitsList';
import ProfileScreen from '../screens/home/ProfileScreen';
import CarScreen from '../screens/auth/CarChoice';

const Stack = createNativeStackNavigator();

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
