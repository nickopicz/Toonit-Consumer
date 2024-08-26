import React, { useState, useRef } from "react";
import { CustomInput } from "../../components/common/Input";
import { RoundedButton } from "../../components/common/Button";
import CustomText from "../../components/common/Text";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Colors, Dim } from "../../Constants";
import { Feather } from "@expo/vector-icons";

const PasswordScreen = ({ navigation }) => {
    const [passVisible, setPassVisible] = useState(false);
    const [password, setPassword] = useState("");
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1

    const togglePasswordVisibility = () => {
        setPassVisible(!passVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <CustomText p2 white>Please create a secure password.</CustomText>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            large
                            autoFocus={true}
                            secureTextEntry={!passVisible}
                            autoCorrect={false}
                            textContentType="password"
                            placeholder="Enter your password."
                            iconName="shield"
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <Feather
                                    name={passVisible ? "eye-off" : "eye"}
                                    size={30}
                                    color={Colors.Black}
                                    style={styles.icon} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.criteriaContainer}>
                        <CustomText p2 white>
                            Your password must: {"\n"}

                        </CustomText>
                        <CustomText p3 white>
                            - contain at least 8 characters{"\n"}
                            - contain at least one number, uppercase letter, and special character
                        </CustomText>
                    </View>
                </View>

            </TouchableWithoutFeedback>
            <RoundedButton
                large
                onPress={() => navigation.navigate("Car")}
                style={styles.button}
            >
                Confirm
            </RoundedButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Background,
        flex: 1,
        alignItems: "center"
    },
    innerContainer: {
        height: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "90%"
    },
    icon: {
        marginLeft: 10
    },
    criteriaText: {
        textAlign: "center"
    },
    criteriaContainer: {
        padding: 20,
        width: "90%"
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 150
    }
});

export default PasswordScreen;
