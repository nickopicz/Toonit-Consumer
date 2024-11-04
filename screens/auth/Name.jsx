/**
 *
 *   |\\  ||    ||\\\\
 *   ||\\ ||    ||
 *   || \\||    ||
 *   ||  \||    ||////
 *
 *   ------This file was created, authored, currently owned and all rights belong to the author NC------
 *
 *                                  Author: Nicholas Ciraulo
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Animated,
    TouchableOpacity,
} from 'react-native';
import CustomText from '../../components/common/Text';
import { CustomInput } from '../../components/common/Input';
import { RoundedButton } from '../../components/common/Button';
import { Colors, Dim } from '../../Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstNameRed, setLastNameRed } from '../../redux/slices/loginSlice';

const NameScreen = ({ navigation }) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const { phoneNum } = useSelector((state) => state.login)
    const dispatch = useDispatch();





    return (
        <SafeAreaView style={styles.background}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={styles.container}>
                    <CustomText
                        p1
                        white
                        style={styles.text}
                    >
                        Please enter some basic account details.
                    </CustomText>
                    <CustomInput
                        large
                        autoCorrect={false}
                        placeholder="first name"
                        iconName="user"
                        ref={firstNameRef}
                        value={firstName}
                        onChangeText={(name) => setFirstName(name)}
                        onSubmitEditing={() => lastNameRef.current?.focus()}
                    />
                    <CustomInput
                        large
                        autoCorrect={false}
                        placeholder="last name"
                        iconName="users"
                        ref={lastNameRef}
                        value={lastName}
                        onChangeText={(name) => setLastName(name)} />
                </View>
            </TouchableWithoutFeedback>
            <RoundedButton
                large
                style={styles.button}
                textStyle={{ color: Colors.Black }}
                // disabled={!phoneNum || !email}
                onPress={() => {
                    console.log("phone: ", phoneNum)
                    dispatch(setFirstNameRed(firstName));
                    dispatch(setLastNameRed(lastName));


                    navigation.navigate("Verification", { phoneNum: phoneNum });

                }}
            >
                Continue
            </RoundedButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: '10%',
    },
    inputContainer: {
        width: '90%',
        height: '30%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: -30,
    },
    emailInput: {
        width: "80%"
    },
    background: {
        backgroundColor: Colors.Background,
        height: Dim.height,
    },
    text: {
        width: "90%",
        textAlign: "center",
        padding: 10
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100,
        alignSelf: "center"
    }
});

export default NameScreen;