import React, { useState, useEffect, useRef } from "react";
import { View, Modal, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomText from "../common/Text";
import { RoundedButton } from "../common/Button";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../Constants";
import { CustomInput } from "../common/Input";
import { useDispatch } from "react-redux";
import { setJob } from "../../redux/slices/jobSlice";

const NewJobModal = ({
    visible,
    onClose,
    job,  // The selected job passed from the parent
    data,
    navigation,
    onConfirm
}) => {
    const [selectedValue, setSelectedValue] = useState(job);
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState(new Date());
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity value for animation
    const inputRef = useRef(null)


    const dispatch = useDispatch();
    // Update selectedValue when the job prop changes
    useEffect(() => {
        if (job) {
            setSelectedValue(job);  // Sync the job prop with the dropdown's selected value
        }
    }, [job]);

    let today = new Date();
    let future = new Date();
    future.setMonth(today.getMonth() + 3);

    const handleConfirm = () => {
        // Dispatch the selected job and notes to Redux
        dispatch(setJob({ notes: notes, type: selectedValue, date: date.toString() }));

        // Navigate to the desired screen (e.g., JobSummaryScreen)
        navigation.navigate("Search");
        onConfirm();
        // You can also close the modal here if necessary
    };

    return (

        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

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
                        <View style={styles.picker}>
                            <RNDateTimePicker
                                maximumDate={future}
                                minimumDate={today}
                                value={date}  // Ensure this is a Date object
                                onChange={(event, selectedDate) => {
                                    // Only update the state if a valid date is selected
                                    if (selectedDate) {
                                        setDate(new Date(selectedDate));  // Ensure selectedDate is passed as a Date object
                                    }
                                }}
                                mode="datetime"
                                accentColor={Colors.Trim}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => inputRef.current?.focus()}
                        >
                            <CustomInput
                                value={notes}
                                onChangeText={setNotes}
                                placeholder="Add some notes for the mechanic..."
                                containerStyle={styles.inputContainerInner}
                                style={styles.input}
                                multiline={true}
                                ref={inputRef}
                            // returnKeyType="default"

                            />
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <RoundedButton small onPress={onClose} style={styles.button}>
                                Cancel
                            </RoundedButton>
                            <RoundedButton small onPress={handleConfirm} style={styles.button}>
                                Confirm
                            </RoundedButton>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >
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
        // alignItems: 'center',
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
    inputContainerInner: {
        height: 200,
        borderWidth: 1,
        borderColor: Colors.Trim
    },
    input: {
        height: '100%',
        fontSize: 18,
        textAlign: "left"
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
        alignSelf: "center"
    },
    pickerContainer: {
        width: "100%",
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    serviceText: {
        paddingVertical: 10,
        alignSelf: "center"
    },
    dropdown: {
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        alignSelf: "center"
    },
});

export default NewJobModal;
