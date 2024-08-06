import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../components/common/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";

const ConfirmScreen = ({ navigation }) => {
    const subtotal = 10;
    const mechanicName = "John";

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <CustomText p1 black >{mechanicName} is on his way!</CustomText>
            </View>
            <View style={styles.buttonContainer}>
                <RoundedButton large>Continue</RoundedButton>
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
        width: "60%",
        height: "30%",
        justifyContent: "center",
        backgroundColor: Colors.White,
        borderRadius: 10,
        borderColor: Colors.Black,
        borderWidth: 2

    }
});

export default ConfirmScreen;
