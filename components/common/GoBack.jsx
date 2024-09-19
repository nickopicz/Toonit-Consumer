import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../Constants";
import { StyleSheet, TouchableOpacity } from "react-native";

const BackButton = ({ navigation, color, style }) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.main, style]}

        >
            <AntDesign name="back" color={color} size={40} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        position: "absolute"
    }
})
export default BackButton;