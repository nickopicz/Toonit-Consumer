import React, { useState, useEffect, useRef } from "react";
import { View, Modal, StyleSheet, Animated } from "react-native";
import CustomText from "../common/Text";
import { RoundedButton } from "../common/Button";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../Constants";

const NewJobModal = ({
    visible,
    onClose,
    onConfirm,
    job,  // The selected job passed from the parent
    data,
}) => {
    const [selectedValue, setSelectedValue] = useState(job);  // State to store selected dropdown value
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity value for animation

    // Update selectedValue when the job prop changes
    useEffect(() => {
        if (job) {
            setSelectedValue(job);  // Sync the job prop with the dropdown's selected value
        }
    }, [job]);

    let today = new Date();
    let future = new Date();
    future.setMonth(today.getMonth() + 3);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.picker}>
                        <RNDateTimePicker
                            maximumDate={future}
                            minimumDate={today}
                            value={new Date()}
                            mode="datetime"
                            accentColor={Colors.Trim}
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <CustomText p1 black u style={styles.serviceText}>
                            What service?
                        </CustomText>
                        <Dropdown
                            style={styles.dropdown}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select an option"
                            value={selectedValue}  // Bind the dropdown's value to selectedValue
                            onChange={item => {
                                setSelectedValue(item.value);  // Update the dropdown selection
                            }}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <RoundedButton small onPress={onConfirm} style={styles.button}>
                            Confirm
                        </RoundedButton>
                        <RoundedButton small onPress={onClose} style={styles.button}>
                            Cancel
                        </RoundedButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.White,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: "60%",
        borderWidth: 2,
        borderColor: Colors.Trim,
        marginBottom: "20%",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 20,
    },
    button: {
        width: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    picker: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 10,
    },
    pickerContainer: {
        width: "80%",
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    serviceText: {
        paddingVertical: 10,
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

export default NewJobModal;
