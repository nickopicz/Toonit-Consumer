import React, { useState } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../../Constants';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../../components/common/Text';
import { RoundedButton } from '../../components/common/Button';

const SearchScreen = ({ visible, onClose, onConfirm, summaryText }) => {
    const [profileImage, setProfileImage] = useState("../../assets/icon.png")
    const mechName = "Joey"
    const experience = [
        { com: "Autozone", id: 0, title: "Mechanic", years: 1 },
        { com: "Mavis discount", id: 1, title: "Associate Mechanic", years: 2 }
    ]

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require("../../assets/icon.png")} style={styles.profileImage} />
                <CustomText h3 white>
                    {mechName}
                </CustomText>
            </View>
            <ScrollView style={styles.textScroll}>
                <CustomText p3 black>
                    {summaryText}
                </CustomText>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <RoundedButton small onPress={onClose} style={styles.button}>
                    <AntDesign name='close' size={30} color={Colors.Black} />
                </RoundedButton>
                <RoundedButton small onPress={onConfirm} style={styles.button}>
                    <AntDesign name='check' size={30} color={Colors.Black} />
                </RoundedButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Background,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    textScroll: {
        marginBottom: 20,
        textAlign: 'center',
        height: "35%",
        width: "95%",
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%",
        paddingBottom: 20
    },
    button: {

        justifyContent: "center",
        alignItems: "center",

    },
});

export default SearchScreen;
