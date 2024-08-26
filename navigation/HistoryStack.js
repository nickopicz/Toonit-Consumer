import { NavigationContainer } from '@react-navigation/native';
import ReceiptListScreen from '../screens/History/RecepitsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
