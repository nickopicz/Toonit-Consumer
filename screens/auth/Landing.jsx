import React from "react";
import { View, StyleSheet, SafeAreaView, Image } from "react-native";
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import CustomText from "../../components/common/Text";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slices/loadingSlice";

const LandingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.loading)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../assets/icon.png')} />
            </View>
            <View style={styles.buttonContainer}>
                <RoundedButton large onPress={() => {
                    // if (!isLoading) {
                    //     dispatch(showLoading())
                    // } else {
                    //     dispatch(hideLoading())
                    //     console.log("=================")
                    // }
                    navigation.navigate("Terms")
                }}>Get Started</RoundedButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 350,
        height: 350
    },
    imageContainer: {
        padding: 20
    },
    buttonContainer: {
        padding: 20
    }
})

export default LandingScreen;