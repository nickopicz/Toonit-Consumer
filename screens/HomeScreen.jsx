// MapScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//must get API key

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MapScreen;
