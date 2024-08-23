import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomText from "../../components/common/Text";
import { CustomInput } from "../../components/common/Input";
import { RoundedButton } from "../../components/common/Button";
import { Colors } from "../../Constants";


const VerificationScreen = ({ navigation }) => {
    const [code, setCode] = useState("")
    const type = "email";
    return (
        <SafeAreaView style={styles.container}>
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
            <RoundedButton large onPress={() => {
                navigation.navigate("Password")
            }}>
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
    }
})

export default VerificationScreen;