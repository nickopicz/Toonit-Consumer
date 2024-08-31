import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Colors, Dim } from "../../Constants";
import CustomText from "../../components/common/Text";
import { RoundedButton } from "../../components/common/Button";
import Checkbox from "expo-checkbox";

const TermsScreen = ({ navigation }) => {
    const terms = "laurem ipsilum";
    const [checking, setChecking] = useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <CustomText p3 white>
                {terms}
            </CustomText>
            <View
                style={styles.checkContainer}
            >
                <CustomText
                    p3
                    white
                    style={styles.agreement}
                >
                    I accept the EULA (End User Liscense Agreement) and will abide by the
                    terms listed in this document.
                </CustomText>

                <Checkbox
                    value={checking}
                    onValueChange={setChecking}
                    color={checking ? Colors.Trim : Colors.Gray}
                    style={styles.check}
                />
            </View>
            <RoundedButton
                large
                disabled={!checking}
                onPress={() => navigation.navigate("Signin")}
                style={styles.button}
            >Continue</RoundedButton>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Background,
        flex: 1,
        alignItems: "center",
    },
    checkContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.Black,
        height: 100,
    },
    agreement: { width: '85%' },
    check: { width: 30, height: 30 },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100
    }

})

export default TermsScreen;