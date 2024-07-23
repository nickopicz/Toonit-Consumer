import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeStack } from './HomeStack';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Constants';

const Tab = createMaterialBottomTabNavigator();

export function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor={Colors.Black}
			inactiveColor={Colors.Trim}
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
			{/* <Tab.Screen
				name="Settings"
				component={SettingsScreen}
			/> */}
		</Tab.Navigator>
	);
}
