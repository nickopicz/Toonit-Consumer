import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomInput } from '../common/Input';
import { Colors } from '../../Constants';
// Adjust the import path as needed

const SearchBar = ({ searchValue, setSearchValue }) => {
    return (
        <View style={styles.container}>
            <CustomInput
                iconName="map"
                placeholder="Where am I?"
                placeholderColor="gray"
                textColor="black"
                value={searchValue}
                onChangeText={setSearchValue}
                // style={styles.input}
                large // Adjust width prop as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        width: '95%',
        backgroundColor: Colors.White,
        // padding: 10,
        zIndex: 20, // Ensure it is above other elements
        // height: "10%",
        justifyContent: "center",
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.25, // for iOS
        shadowRadius: 4,
        borderRadius: 5,
        borderWidth: 2

    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default SearchBar;
