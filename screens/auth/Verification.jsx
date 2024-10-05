import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomText from "../../components/common/Text";
import { CustomInput } from "../../components/common/Input";
import { RoundedButton } from "../../components/common/Button";
import { Colors, Dim } from "../../Constants";
import { signInWithPhoneNumber } from "firebase/auth";
import { app, auth } from "../../firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const VerificationScreen = ({ navigation, route }) => {
    const [code, setCode] = useState("")
    const [confirmationResult, setConfirmationResult] = useState(null);
    const type = "email";
    const { phoneNum } = route.params
    const recaptchaRef = useRef(null);

    useEffect(() => {
        console.log("Phone number: ", phoneNum);  // Check if the phoneNumber is valid

        try {
            signInWithPhoneNumber(
                auth, phoneNum, recaptchaRef.current
            ).then((confirmationResult) => {
                console.log("confirmation result: ", confirmationResult);
                setConfirmationResult(confirmationResult)
            }).catch((error) => {
                console.warn("error sending verification code: ", error);
            });

        } catch (e) {
            console.warn(e);
        }
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaRef}
                firebaseConfig={app.options}
            />
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={true}>
                <View style={styles.inputContainer}>
                    <CustomText p1 white style={{ textAlign: "center", }}>
                        Please input the verification code sent to your {type}.
                    </CustomText>
                    <CustomInput
                        large
                        style={styles.input}
                        autoCorrect={false}
                        placeholder="Enter code here..."
                        iconName="log-in"
                        value={code}
                        onChangeText={(code) => setCode(code)}
                    />
                </View>

            </TouchableWithoutFeedback>
            <RoundedButton
                large
                onPress={() => {
                    navigation.navigate("Password")
                }}
                style={styles.button}
            >
                Continue
            </RoundedButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
        alignItems: "center"
    },
    input: {
        width: "100%"
    },
    inputContainer: {
        width: "80%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100
    }
})

export default VerificationScreen;