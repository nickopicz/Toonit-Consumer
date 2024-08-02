import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServicePage';
const Stack = createStackNavigator();

export const HomeStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Map"
				component={MapScreen}
			/>
			<Stack.Screen
				name="Service"
				component={ServiceScreen}
			/>
		</Stack.Navigator>
	);
};
