import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReceiptListScreen from '../screens/History/RecepitsList';

const Stack = createStackNavigator();

export const HistoryStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Recepits"
				component={ReceiptListScreen}
			/>
		</Stack.Navigator>
	);
};
