import MapScreen from '../screens/home/HomeScreen';
import ServiceScreen from '../screens/home/ServicePage';
import FirstReceiptScreen from '../screens/home/FirstReceipt';
import PayScreen from '../screens/home/PaymentScreen';
import ConfirmScreen from '../screens/home/ConfirmScreen';
import SummaryScreen from '../screens/home/Summary';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

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
