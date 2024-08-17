import React, { useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CustomText from "../../components/common/Text";
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";

const ConfirmScreen = ({ navigation }) => {
    const mechanicName = "John";
    const mapRef = useRef(null);

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <MapView
                    ref={mapRef}
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    style={styles.map}
                    initialRegion={{
                        latitude: 40.75578416146374,
                        longitude: -74.03744071855651,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
            <CustomText p1 black>{mechanicName} is on his way!</CustomText>
            <View style={styles.buttonContainer}>
                <RoundedButton large onPress={() => navigation.navigate("Summary")}>Continue</RoundedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        backgroundColor: Colors.Background,
    },
    buttonContainer: {
        paddingVertical: 50,
    },
    summary: {
        alignItems: "center",

        justifyContent: "center",
        backgroundColor: Colors.White,
        borderRadius: 10,
        borderColor: Colors.Black,
        borderWidth: 2,
    },
    map: {
        width: 300, // Set a specific width
        height: 300, // Set a specific height
        borderRadius: 10, // Optional: Round the edges to make it more widget-like
    },
});

export default ConfirmScreen;
