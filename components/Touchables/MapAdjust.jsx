import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Colors } from '../../Constants';

const RecenterButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name="navigation" size={24} color={Colors.Background} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.Black,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.25, // for iOS
        shadowRadius: 4, // for iOS
        zIndex: 10, // Ensure it's above other elements
    },
});

export default RecenterButton;
