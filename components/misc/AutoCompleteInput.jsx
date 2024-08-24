import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from "react-native";
import CustomText from "../common/Text";
import { Colors } from "../../Constants";
import cars from "../../assets/database/unique_make_model_year_converted.json";
import { CustomInput } from "../common/Input";
import { RoundedButton } from "../common/Button";

const AutoCompleteInput = ({ label, searchValue, setSearchValue, onItemSelect, dataKey, dependency }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const filterResults = (searchValue, dependency) => {
        let results = cars;

        // Apply filtering based on dependencies
        if (dependency) {
            if (dataKey === "Model" && dependency) {
                results = results.filter(car => car.Make === dependency);
            } else if (dataKey === "Year" && dependency.brand && dependency.model) {
                results = results.filter(car => car.Make === dependency.brand && car.Model === dependency.model);
            }
        }

        // Map to the desired dataKey, filter out undefined or non-string values, and remove duplicates
        const uniqueResults = new Set(
            results
                .map(car => car[dataKey])
                .filter(value => typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase()))
        );

        return Array.from(uniqueResults);
    };


    useEffect(() => {
        if (searchValue) {
            const results = filterResults(searchValue, dependency);
            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    }, [searchValue, dependency]);

    const handleSelectItem = (item) => {
        setSearchValue(item);
        onItemSelect(item);
        setFilteredData([]);
        setModalVisible(false); // Close the modal when an item is selected
    };

    // If the label is "Year", return only the CustomInput without the modal
    if (label === "Year") {
        return (
            <View style={styles.inputContainer}>
                <CustomText h4 white style={styles.text}>{label}</CustomText>
                <View style={{ width: "90%", marginVertical: 10, borderColor: Colors.Black, borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 5 }} >
                    <CustomText style={{ marginLeft: 20 }} p2 black> {searchValue}</CustomText>
                </View>
                <CustomInput
                    large
                    placeholder="Enter the year of your car."
                    keyboardType="number-pad"
                    value={searchValue}
                    onChangeText={setSearchValue}
                />
            </View>
        );
    }

    return (
        <View style={styles.inputContainer}>
            <CustomText h4 white style={styles.text}>{label}</CustomText>
            <View style={{ width: "90%", marginVertical: 10, borderColor: Colors.Black, borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 5 }} >
                <CustomText style={{ marginLeft: 20 }} p2 black> {searchValue}</CustomText>
            </View>

            <RoundedButton style={styles.button} onPress={() => setModalVisible(true)}>
                <CustomText p2 black>{`Search for your ${label.toLowerCase()}...`}</CustomText>
            </RoundedButton>

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <CustomInput
                            large
                            placeholder={`Search for your ${label.toLowerCase()}...`}
                            value={searchValue}
                            onChangeText={setSearchValue}
                            autoFocus
                        />

                        <FlatList
                            style={styles.dropdown}
                            data={filteredData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => handleSelectItem(item)}>
                                    <CustomText p3 black>{item}</CustomText>
                                </TouchableOpacity>
                            )}
                            removeClippedSubviews={false}
                        />

                        <RoundedButton onPress={() => setModalVisible(false)}>Close</RoundedButton>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        maxHeight: '70%',
    },
    dropdown: {
        backgroundColor: Colors.White,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
        margin: 10,
    },
    item: {
        padding: 10,
    },
    text: {
        marginLeft: 20,
    },
    button: {
        margin: 20,
        backgroundColor: Colors.White
    }
});

export default AutoCompleteInput;
