import React, { useState } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../../Constants';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../../components/common/Text';
import { RoundedButton } from '../../components/common/Button';
import ExperienceList from '../../components/misc/Resume';
import BackButton from '../../components/common/GoBack';

const SearchScreen = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState("../../assets/icon.png")
    const mechName = "Joey Bag of Donuts"
    const experience = [
        { com: "Autozone", id: 0, title: "Mechanic", years: 1 },
        { com: "Mavis Discount", id: 1, title: "Associate Mechanic", years: 2 },
        { com: "Pep Boys", id: 2, title: "Lead Technician", years: 3 },
        { com: "Jiffy Lube", id: 3, title: "Service Manager", years: 4 }
    ];


    const mechanicBio = 'I am a dedicated and experienced mechanic with over 10 years of experience in the automotive industry.'


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require("../../assets/icon.png")} style={styles.profileImage} />
                <CustomText style={styles.name} h3 white>
                    {mechName}
                </CustomText>
            </View>
            <ScrollView style={styles.textScroll}>
                <CustomText style={styles.bio} p2 white>
                    {mechanicBio}
                </CustomText>
                <ExperienceList
                    data={experience}
                />
            </ScrollView>

            <View style={styles.buttonContainer}>
                <RoundedButton small onPress={() => navigation.goBack()} style={styles.button}>
                    <CustomText u p1 black>
                        Find new
                    </CustomText>
                </RoundedButton>
                <RoundedButton small onPress={() => console.log("selected mechanic")} style={styles.button}>
                    <AntDesign name='check' size={30} color={Colors.Black} />
                </RoundedButton>
            </View>
            <BackButton navigation={navigation} color={Colors.White} style={styles.back} />
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
        width: "100%",
        paddingTop: 10
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
    bio: {
        paddingHorizontal: 10,
    },
    name: {
        padding: 10,
        width: "50%"
    },
    back: {
        top: 40,
        left: 15
    }
});

export default SearchScreen;
