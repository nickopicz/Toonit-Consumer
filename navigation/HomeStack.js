import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();

export const HomeStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Map"
					component={MapScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
