
import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Image } from "react-native";
import CustomText from "../../components/common/Text";
import { RoundedButton } from "../../components/common/Button";
import { Colors } from "../../Constants";

const SummaryScreen = ({ navigation }) => {
    // Example data for the vertical list
    const itemData = [
        { id: '1', name: 'Oil Cost', price: '$10' },
        { id: '2', name: 'Hourly rate', price: '$20' },
        { id: '3', name: 'Gas cost', price: '$15' },
        { id: '4', name: 'Service Fee', price: '$25' },
    ];

    // Example data for the horizontal list (small pictures)
    const imageData = [
        { id: '1', src: 'https://via.placeholder.com/150' },
        { id: '2', src: 'https://via.placeholder.com/150' },
        { id: '3', src: 'https://via.placeholder.com/150' },
        { id: '4', src: 'https://via.placeholder.com/150' },
    ];

    // Render item for the vertical FlatList
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <CustomText p1 black>{item.name}</CustomText>
            <CustomText p1 black>{item.price}</CustomText>
        </View>
    );

    // Render item for the horizontal FlatList (images)
    const renderImage = ({ item }) => (
        <Image source={{ uri: item.src }} style={styles.image} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomText h2 black>Breakdown:</CustomText>
            <FlatList
                data={itemData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.verticalList}
            />
            <FlatList
                horizontal={true}
                data={imageData}
                renderItem={renderImage}
                keyExtractor={item => item.id}
                style={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.buttonContainer}>
                <RoundedButton large onPress={() => navigation.goBack()}>Go Back</RoundedButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.Background,
        alignItems: "center"
    },
    verticalList: {
        marginVertical: 20,
    },
    horizontalList: {
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 8,
        width: "95%"
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
        borderRadius: 8,
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
});

export default SummaryScreen;
