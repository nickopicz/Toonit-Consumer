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
import { CountryPicker } from 'react-native-country-codes-picker';
import { useDispatch } from 'react-redux';
import { setPhoneRed } from '../../redux/slices/loginSlice';
import { findAccount } from '../../functions/CreateAuthDoc';
import { setAccountExists } from '../../redux/slices/authStateSlice';
import { hideLoading, showLoading } from '../../redux/slices/loadingSlice';

const SignInScreen = ({ navigation }) => {
    const phoneRef = useRef();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');

    const [phoneNum, setPhone] = useState('');

    const dispatch = useDispatch();



    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    function handlePress() {
        try {
            var phoneRegExp = new RegExp(
                /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            );
            let isPhoneValid = phoneRegExp.test(phoneNum);

            if (!isPhoneValid) {
                fadeIn();
                setTimeout(() => {
                    fadeOut();
                }, 5000);
                return false;
            } else {
                return true;
            }
        } catch (e) {
            console.warn(e);
        }
    }

    async function checkAccount() {
        dispatch(showLoading())
        return await findAccount(phoneNum).then((res) => {
            if (res.success === true) {
                dispatch(setAccountExists(true))
                return true
            } else {
                return false
            }
        }).finally(() => {
            dispatch(hideLoading())
        })



    }



    return (
        <SafeAreaView style={styles.background}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View style={styles.container}>
                    <CustomText
                        p1
                        black
                        style={{ textAlign: "center" }}>
                        Enter your phone number
                    </CustomText>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={styles.countryCode}
                        >
                            <CustomText
                                p3
                                black
                            >
                                {countryCode}
                            </CustomText>
                        </TouchableOpacity>
                        <CustomInput
                            medium
                            autoCorrect={false}
                            autoFocus={true}
                            textContentType="telephoneNumber"
                            placeholder="111-222-3344"
                            iconName="phone"
                            keyboardType="phone-pad"
                            ref={phoneRef}
                            value={phoneNum}
                            onChangeText={(phoneNum) => setPhone(phoneNum)}
                        />
                    </View>
                    <Animated.View
                        style={[
                            styles.error,
                            {
                                // Bind opacity to animated value
                                opacity: fadeAnim,
                                alignSelf: "flex-end"
                            },
                        ]}
                    >
                        <CustomText
                            p3
                            black
                        >
                            That was an invalid phone number, please check if you typed
                            correctly
                        </CustomText>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            <RoundedButton
                large
                style={styles.button}
                textStyle={{ color: Colors.Black }}
                // disabled={!phoneNum || !email}
                onPress={async () => {
                    try {
                        // Wait for handlePress to finish
                        const isValid = handlePress();
                        // If phone/email validation passes
                        if (isValid) {
                            // Wait for checkAccount to finish
                            const accountExists = await checkAccount();
                            const phoneTemp = countryCode + phoneNum;
                            if (!accountExists) {
                                dispatch(setPhoneRed(phoneTemp));
                                navigation.navigate("Name");
                            } else {
                                dispatch(setPhoneRed(phoneNum));
                                navigation.navigate("Verification", { phoneNum: countryCode + phoneNum })
                            }
                            // If both are successful, navigate to the "Name" screen


                        }
                    } catch (error) {
                        console.error("Error during the process:", error);
                    }
                }}
            >
                Continue
            </RoundedButton>

            <CountryPicker
                style={{
                    modal: {
                        height: Dim.height * 0.85,
                        backgroundColor: Colors.Background,
                    },
                    modalInner: {
                        backgroundColor: Colors.Black,
                    },
                    countryButtonStyles: {
                        backgroundColor: Colors.White,
                    },
                    countryName: {
                        color: Colors.Black,
                    },
                }}
                show={show}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                    phoneRef.current?.focus();
                }}
                popularCountries={['US', 'IN', 'GR', 'GB', 'BD']}
            />
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

    error: {
        width: Dim.width * 0.6,
        alignContent: 'center',
    },
    countryCode: {
        width: '22.5%',
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeModalContainer: {
        marginTop: '10%',
    },
    codePicker: {
        marginTop: 100,
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100,
        alignSelf: "center"
    }
});

export default SignInScreen;