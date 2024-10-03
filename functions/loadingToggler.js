import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set the loading status in AsyncStorage
async function setLoading(loadingStatus) {
	try {
		await AsyncStorage.setItem('loadingStatus', JSON.stringify(loadingStatus));
	} catch (error) {
		console.error('Error setting loading status:', error);
	}
}

// Function to get the loading status from AsyncStorage
async function getLoadingStatus() {
	try {
		const status = await AsyncStorage.getItem('loadingStatus');
		return status ? JSON.parse(status) : null;
	} catch (error) {
		console.error('Error getting loading status:', error);
		return null;
	}
}

export { setLoading, getLoadingStatus };
