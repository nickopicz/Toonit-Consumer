import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import store from './redux/store'; // Import the Redux store
import App from './App'; // Import the App component

// Wrap the App with the Redux Provider and register it with Expo
const RootComponent = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

// Register the component with Expo
export default registerRootComponent(RootComponent);
