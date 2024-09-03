import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import watchLocation from '../../functions/watchLocation';
import { setCoordinates } from '../../redux/slices/coordinateSlice';
import * as Location from 'expo-location'
import { useDispatch } from 'react-redux';
import HorizontalSliderModal from '../../components/misc/SlideModal';
import SearchBar from '../../components/misc/SearchBar';
import RecenterButton from '../../components/Touchables/MapAdjust';
import MechModal from '../../components/misc/MechModal';
import SummaryModal from '../../components/misc/SummaryModal';
//must get API key

const mockData = [
	{ id: '1', title: 'Item 1' },
	{ id: '2', title: 'Item 2' },
	{ id: '3', title: 'Item 3' },
	{ id: '4', title: 'Item 4' },
	{ id: '5', title: 'Item 5' },
];
let exampleText = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.Et harum quidem rerum facilis est et expedita distinctio.Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
const MapScreen = ({ navigation }) => {

	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector(state => state.coordinates);
	const [slideModalVis, setSlideModalVis] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [mechModalVis, setMechModalVis] = useState(false);
	const [summaryModalVis, setSummaryModalVis] = useState(false)

	const mapRef = useRef(null);
	useEffect(() => {
		const watchLocationUpdates = async () => {
			await watchLocation(
				(location) => dispatch(setCoordinates(location)),
				(error) => console.error(error) // Handle error appropriately
			);
			// const timer = setTimeout(() => {
			// 	setMessage("Hello, after delay!");
			// }, 3000);

			// return () => clearTimeout(timer);
		};
		// 3 seconds delay
		watchLocationUpdates();

	}, [dispatch]);

	const handleRecenter = () => {
		if (latitude && longitude && mapRef.current) {
			mapRef.current.animateToRegion(
				{
					latitude,
					longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				},
				1000
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<MapView
					ref={mapRef}
					provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
					style={styles.map}

					initialRegion={{
						latitude: latitude || 40.75578416146374,
						longitude: longitude || -74.03744071855651,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				<HorizontalSliderModal data={mockData} serviceTap={() => setMechModalVis(true)} />
				<RecenterButton onPress={handleRecenter} />
				<MechModal
					visible={mechModalVis}
					onClose={() => setMechModalVis(false)}
					profileImage={require("../../assets/favicon.png")}
					summaryText={exampleText}
					onConfirm={() => {
						navigation.navigate("Service");
						setMechModalVis(false)
					}}
				/>
				<SummaryModal
					visible={summaryModalVis}
					onClose={() => setSummaryModalVis(false)}
					profileImage={require("../../assets/favicon.png")}
					mechanicName={"John"}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MapScreen;
