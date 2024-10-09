// src/components/LoadingScreen.js

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingScreen = ({ loading }) => {
    // const { isLoading } = useSelector((state) => state.loading); // Access the loading state from Redux
    // useEffect(() => {
    //     console.log("loading: ", isLoading)
    // }, [isLoading])
    return (
        <Modal visible={loading} transparent animationType="fade">
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
});

export default LoadingScreen;
