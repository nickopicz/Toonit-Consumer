import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import CustomText from '../common/Text';
import { Colors } from '../../Constants';

const HorizontalSliderModal = ({ data }) => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <CustomText p1 trim>{item.title}</CustomText>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContainer}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 120, // Adjust this value based on the height of the search bar
        width: '95%',
        backgroundColor: Colors.White,
        paddingVertical: 10,
        elevation: 5, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.25, // for iOS
        shadowRadius: 4, // for iOS
        zIndex: 10, // Ensure it's above other elements
        borderRadius: 5,
        borderWidth: 2,


    },
    item: {
        backgroundColor: Colors.Black,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    flatListContainer: {
        alignItems: 'center',
    },
});

export default HorizontalSliderModal;
