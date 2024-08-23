import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import CustomText from "../common/Text";
import { Colors } from "../../Constants";
import cars from "../../assets/database/unique_make_model_year_converted.json";
import { CustomInput } from "../common/Input";

const AutoCompleteInput = ({ label, searchValue, setSearchValue, onItemSelect, dataKey, dependency, isActive, setActiveInput, clearActiveInput }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, width: 0 });

    useEffect(() => {
        if (searchValue && isActive) {
            let results = cars;

            // Apply filtering based on dependencies
            if (dependency) {
                if (dataKey === "Model" && dependency) {
                    results = results.filter(car => car.Make === dependency);
                } else if (dataKey === "Year" && dependency.brand && dependency.model) {
                    results = results.filter(car => car.Make === dependency.brand && car.Model === dependency.model);
                }
            }

            // Map to the desired dataKey and filter out undefined or non-string values
            results = results
                .map(car => car[dataKey])
                .filter(value => typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase()));

            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    }, [searchValue, dependency, isActive]);

    const handleSelectItem = (item) => {
        setSearchValue(item);
        onItemSelect(item);
        setFilteredData([]);
        clearActiveInput(); // Clear the active input state when an item is selected
    };

    const handleFocus = (event) => {
        setActiveInput();
        event.target.measure((x, y, width, height) => {
            setDropdownPosition({ top: y + height, width: width });
        });
    };

    return (
        <View style={styles.inputContainer}>
            <CustomText p2 white>{label}</CustomText>
            <CustomInput
                large
                placeholder={`Search for your ${label.toLowerCase()}...`}
                value={searchValue}
                onFocus={handleFocus}
                onChangeText={setSearchValue}
            />
            {isActive && filteredData.length > 0 && (
                <View style={[styles.dropdownContainer, { top: dropdownPosition.top, width: dropdownPosition.width }]}>
                    <FlatList
                        style={styles.dropdown}
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item} onPress={() => handleSelectItem(item)}>
                                <CustomText p3 black>{item}</CustomText>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 40,
        zIndex: 1,
        width: '100%',
    },
    dropdownContainer: {
        position: "absolute",
        zIndex: 1000, // Ensure it appears above the input field and other elements
    },
    dropdown: {
        backgroundColor: Colors.White,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 200,
        zIndex: 1000, // Ensure it appears above everything else
        elevation: 5, // For Android
    },
    item: {
        padding: 10,
    },
    itemText: {
        color: Colors.Black,
    },
});

export default AutoCompleteInput;
