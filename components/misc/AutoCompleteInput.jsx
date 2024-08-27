import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from "../common/Text";
import { Colors } from "../../Constants";
import cars from "../../assets/database/unique_make_model_year_converted.json";
import { CustomInput } from '../common/Input';

const AutoCompleteInput = ({
    label,
    searchValue,
    setSearchValue,
    onItemSelect,
    dataKey,
    dependency,
    isActive,
    setActiveInput,
    clearActiveInput,
}) => {
    const [filteredData, setFilteredData] = useState([]);

    const filterResults = (text, dependency) => {
        let results = cars;

        if (dataKey === "Model" && dependency) {
            results = results.filter(car => car.Make === dependency);
        }

        const uniqueResults = new Set(
            results
                .map(car => car[dataKey])
                .filter(value => typeof value === 'string' && value.toLowerCase().includes(text.toLowerCase()))
        );

        return Array.from(uniqueResults).map(item => ({ label: item, value: item }));
    };

    useEffect(() => {
        const results = filterResults(searchValue, dependency);
        setFilteredData(results);
    }, [searchValue, dependency]);

    const handleSearch = text => {
        setSearchValue(text);
        const results = filterResults(text, dependency);
        setFilteredData(results);
    };

    const handleChange = item => {
        setSearchValue(item.value); // Update parent's state with selected value
        onItemSelect(item.value);   // Notify parent of selection
        clearActiveInput();         // Clear active input when selection is made
    };

    // Special handling for "Year" input
    if (label === "Year") {
        return (
            <View style={styles.container}>
                <CustomText h4 white style={styles.text}>{label}</CustomText>
                <CustomInput

                    style={styles.input}
                    autoCorrect={false}
                    placeholder="Enter the year."
                    iconName="calendar"
                    value={searchValue}
                    onChangeText={year => setSearchValue(year)}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>

                <CustomText h4 white style={styles.text}>{label}</CustomText>
                <TouchableOpacity onPress={() => setSearchValue("")}>
                    <AntDesign
                        name="delete"
                        size={20}
                        color={Colors.Black} />
                </TouchableOpacity>
            </View>
            <Dropdown
                style={[styles.dropdown, isActive && { borderColor: Colors.Background }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={filteredData}
                search
                searchField="label"  // Specify the field to search on
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isActive ? `Select ${label.toLowerCase()}` : searchValue || `Select ${label.toLowerCase()}`}
                searchPlaceholder={`Search for your ${label.toLowerCase()}...`}
                value={searchValue}  // Sync the selected value with the parent's state
                onFocus={() => {
                    setActiveInput(); // Set active input when focused
                    setFilteredData(filterResults(searchValue, dependency)); // Filter results when focused
                }}
                onBlur={() => clearActiveInput()}
                onChange={handleChange}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isActive ? Colors.Background : Colors.Trim}
                        name={label === "Model" ? "Trophy" : "car"}
                        size={20}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Background,
        padding: 16,
        width: '100%',
    },
    dropdown: {
        height: 50,
        borderColor: Colors.Trim,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 10,
        backgroundColor: Colors.White,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 5,
        borderColor: Colors.Background,
    },
    text: {
        marginLeft: 20,
    },
    input: {
        width: '100%',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default AutoCompleteInput;
