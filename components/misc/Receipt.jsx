import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CustomText from '../common/Text';
import { Colors } from '../../Constants';

/**
 * ServiceBreakdown Component
 * @param {Array} services - Array of service items, each with 'name' and 'price'.
 * 
 * Example of `services` array:
 * [
 *   { name: 'Oil Change', price: 50 },
 *   { name: 'Tire Rotation', price: 30 },
 *   { name: 'Brake Inspection', price: 20 },
 * ]
 */

const Receipt = ({ services }) => {

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.nameContainer}>
                <CustomText p1>{item.name}</CustomText>
            </View>
            <CustomText p2 style={styles.price}>{`$${item.price.toFixed(2)}`}</CustomText>
        </View>
    );

    const calculateTotal = () => {
        return services.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <CustomText h3 white style={styles.header}>Service Breakdown</CustomText>

            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} // Use index as key
            />

            <View style={styles.totalRow}>
                <CustomText h2 white>Total</CustomText>
                <CustomText h2 white>{`$${calculateTotal()}`}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.Background,
        elevation: 5,
        flex: 0.8,
        marginTop: 50,
    },
    header: {
        marginBottom: 16,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'flex-start', // Ensures items align at the top
        paddingRight: 15,
    },
    nameContainer: {
        flex: 1, // Takes up available space
        marginRight: 16, // Adds space between the name and price
    },
    price: {
        flexShrink: 0, // Prevents the price from shrinking or wrapping
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.White,
        paddingTop: 8,
    }
});

export default Receipt;
