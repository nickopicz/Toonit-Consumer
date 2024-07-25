import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeStack } from './HomeStack';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Constants';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

export function MyTabs() {
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
		</Tab.Navigator>
	);
}
