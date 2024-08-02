import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../components/common/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from "../Constants";

const ServiceScreen = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const data = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
    ];

    let today = new Date();
    let future = new Date();
    future.setMonth(today.getMonth() + 3);

    return (
        <View style={styles.container}>
            <View style={styles.datecontainer}>
                <CustomText p1 black u>When will this occur?</CustomText>
                <RNDateTimePicker
                    maximumDate={future}
                    minimumDate={today}
                    value={new Date()}
                    mode="datetime"
                    accentColor={Colors.Trim}
                    style={styles.picker}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Dropdown
                    style={styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="Select an option"
                    value={selectedValue}
                    onChange={item => {
                        setSelectedValue(item.value);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.Background,
    },
    datecontainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "15%",
        backgroundColor: Colors.White,
        width: "80%",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20, // Added margin to separate the date picker and the dropdown picker
    },
    picker: {
        width: "100%",
        alignSelf: "center",
    },
    pickerContainer: {
        width: "80%",
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 10,
    },
    dropdown: {
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default ServiceScreen;
