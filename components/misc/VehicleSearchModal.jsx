import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import { Colors } from '../../Constants';
import cars from '../../assets/database/unique_make_model_year_converted.json';
import { CustomInput } from '../common/Input';
import { RoundedButton } from '../common/Button';

const AutoCompleteModal = ({ searchValue, setSearchValue, onItemSelect, visible, onClose }) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (searchValue) {
            const results = cars.filter(car =>
                `${car.Make} ${car.Model} ${car.Year}`.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    }, [searchValue]);

    const handleSelectItem = (item) => {
        onItemSelect(item);
        setSearchValue('');
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <CustomInput
                        medium
                        borderwidth={1}
                        // style={styles.input}
                        placeholder="Search for your car..."
                        value={searchValue}
                        onChangeText={setSearchValue}
                    />
                    <FlatList
                        style={styles.dropdown}
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item} onPress={() => handleSelectItem(item)}>
                                <Text style={styles.itemText}>{`${item.Make} ${item.Model} ${item.Year}`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <RoundedButton onPress={onClose} style={styles.closeButton}>
                        Close
                    </RoundedButton>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "50%",
    },
    input: {
        height: 40,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
        marginBottom: 15,
    },
    dropdown: {
        backgroundColor: Colors.White,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 200,
    },
    item: {
        padding: 10,
    },
    itemText: {
        color: Colors.Black,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: Colors.Trim,
        alignItems: 'center',
    },
    closeButtonText: {
        color: Colors.White,
    },
});

export default AutoCompleteModal;
