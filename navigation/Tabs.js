import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeStack } from './HomeStack';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Constants';
import ProfileScreen from '../screens/ProfileScreen';
import ReceiptListScreen from '../screens/History/RecepitsList';
import { HistoryStack } from './HistoryStack';

const Tab = createMaterialBottomTabNavigator();

export function MainTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor={Colors.Trim}
			inactiveColor={Colors.Black}
			barStyle={{ backgroundColor: Colors.White }}
			shifting={false}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size, focused }) => (
						<FontAwesome
							name="home"
							size={24}
							color={Colors.Black}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size, focused }) => (
						<FontAwesome
							name="user"
							size={24}
							color={Colors.Black}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="History"
				component={HistoryStack}
				options={{
					tabBarLabel: 'History',
					tabBarIcon: ({ color, size, focused }) => (
						<FontAwesome
							name="history"
							size={24}
							color={Colors.Black}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
