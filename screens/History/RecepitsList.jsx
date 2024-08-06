import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import CustomText from "../../components/common/Text";
import { Colors } from "../../Constants";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const ReceiptListScreen = ({ navigation }) => {

    const mockData = [
        {
            id: '1',
            service: "Oil Change",
            date: new Date(),
        },
        {
            id: '2',
            service: "Filter Replacement",
            date: new Date()
        }
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View>
                <CustomText p1 black>{item.service}</CustomText>
                <CustomText p2 black>{item.date.toDateString()}</CustomText>
            </View>
            <View>
                <MaterialIcons name="arrow-forward-ios" size={30} color={Colors.Black} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={mockData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.flatlist}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.Background,
    },

    itemContainer: {
        // marginVertical: 8,
        // backgroundColor: Colors.White,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: Colors.Black,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    flatlist: {
        // marginTop: 20
    }
});

export default ReceiptListScreen;
