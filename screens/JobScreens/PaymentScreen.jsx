import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../components/common/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";

const PayScreen = ({ navigation }) => {
    const subtotal = 10
    return (
        <View style={styles.container}>

            <View style={styles.buttonContainer}>
                <RoundedButton large onPress={() => navigation.navigate("Confirm")}>Pay</RoundedButton>
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
    textContainer: {
        width: "70%",
        justifyContent: "flex-end",
        height: "50%"
    },
    line: {
        width: "80%",
        height: 3,
        backgroundColor: Colors.Black
    },
    buttonContainer: {
        paddingVertical: 50,

    },
    subtotal: {
        alignItems: "center",
        width: "70%"
    }
});

export default PayScreen;
