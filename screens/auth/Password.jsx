import React, { useState, useRef } from "react";
import { CustomInput } from "../../components/common/Input";
import { RoundedButton } from "../../components/common/Button";
import CustomText from "../../components/common/Text";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Colors, Dim } from "../../Constants";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/slices/loginSlice";

const PasswordScreen = ({ navigation }) => {
    const [passVisible, setPassVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showCriteria, setShowCriteria] = useState(false);

    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1


    const dispatch = useDispatch();
    // Password regex for validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    const togglePasswordVisibility = () => {
        setPassVisible(!passVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPassVisible(!confirmPassVisible);
    };

    const handleConfirmPress = () => {
        // Check if password matches the regex criteria
        if (!passwordRegex.test(password) || password !== confirmPass) {
            setShowCriteria(true);
            // Trigger flashing animation by looping between opacity 0 and 1
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();

            return;
        }
        //dispatch password to redux state
        dispatch(setLogin({ password: password }))
        // If everything is valid, navigate to the next screen
        navigation.navigate("Car");
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
                            <Animated.View>
                                <Feather
                                    name={passVisible ? "eye-off" : "eye"}
                                    size={30}
                                    color={Colors.Black}
                                    style={styles.icon} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    <CustomText p2 white>Confirm your password.</CustomText>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            large
                            autoFocus={true}
                            secureTextEntry={!confirmPassVisible}
                            autoCorrect={false}
                            textContentType="password"
                            placeholder="Re-enter your password."
                            iconName="shield"
                            value={confirmPass}
                            onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                        />
                        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                            <Animated.View>
                                <Feather
                                    name={confirmPassVisible ? "eye-off" : "eye"}
                                    size={30}
                                    color={Colors.Black}
                                    style={styles.icon} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>


                    <Animated.View style={{ ...styles.criteriaContainer, opacity: fadeAnim }}>
                        <CustomText p2 white>
                            Your password must:
                        </CustomText>
                        <CustomText p3 black style={styles.criteriaText}>
                            • Be at least 8 characters long{"\n"}
                            • Contain at least one uppercase letter{"\n"}
                            • Contain at least one number{"\n"}
                            • Contain at least one special character
                        </CustomText>
                    </Animated.View>

                </View>
            </TouchableWithoutFeedback>
            <RoundedButton
                large
                onPress={handleConfirmPress}  // Updated onPress handler
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
        height: "60%",
        justifyContent: "center",
        alignItems: "flex-start"
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
    criteriaContainer: {
        padding: 20,
        width: "90%",
        marginTop: 10,
    },
    criteriaText: {
        textAlign: "left",
        color: Colors.Black,
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100
    }
});

export default PasswordScreen;
