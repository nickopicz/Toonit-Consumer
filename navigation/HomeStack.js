import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/JobScreens/ServicePage';
import FirstReceiptScreen from '../screens/JobScreens/FirstReceipt';
import PayScreen from '../screens/JobScreens/PaymentScreen';
import ConfirmScreen from '../screens/JobScreens/ConfirmScreen';
import SummaryScreen from '../screens/JobScreens/Summary';
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
			<Stack.Screen
				name="FirstReceipt"
				component={FirstReceiptScreen}
			/>
			<Stack.Screen
				name="Payment"
				component={PayScreen}
			/>
			<Stack.Screen
				name="Confirm"
				component={ConfirmScreen}
			/>
			<Stack.Screen
				name="Summary"
				component={SummaryScreen}
			/>
		</Stack.Navigator>
	);
};
