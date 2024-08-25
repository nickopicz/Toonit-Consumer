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

import React, { useState, useRef } from 'react';
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
import { Feather } from '@expo/vector-icons';

const SignInScreen = ({ navigation }) => {
    const phoneRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [phoneNum, setPhoneNum] = useState('');

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
            var emailRegExp = new RegExp(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            );

            let isPhoneValid = phoneRegExp.test(phoneNum);
            let isEmailValid = emailRegExp.test(email);

            if (!isPhoneValid && !isEmailValid) {
                fadeIn();
                setTimeout(() => {
                    fadeOut();
                }, 5000);
                return;
            } else {
                let phoneNumber = countryCode + phoneNum;
                let temp = {
                    phone: phoneNumber,
                    email: email
                };
                console.log('temp: ', temp);
                // dispatch(setCredentials({ credentials: temp }));
                // navigation.navigate('confirmation');
            }
        } catch (e) {
            console.warn(e);
        }
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
                            onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
                        />
                    </View>
                    <Animated.View
                        style={[
                            styles.error,
                            {
                                // Bind opacity to animated value
                                opacity: fadeAnim,
                            },
                        ]}
                    >
                        <CustomText
                            p3
                            red
                        >
                            That was an invalid phone number, please check if you typed
                            correctly
                        </CustomText>
                    </Animated.View>
                    <CustomInput
                        large
                        autoCorrect={false}
                        placeholder="first name"
                        iconName="user"
                        ref={firstNameRef}
                        value={firstName}
                        onChangeText={(name) => setFirstName(name)} />
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
                style={styles.confirm}
                textStyle={{ color: Colors.Black }}
                // disabled={!phoneNum || !email}
                onPress={() => {
                    // handlePress();
                    navigation.navigate("Verification")
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
    confirm: {
        postition: 'absolute',
        alignSelf: "center"
    }
});

export default SignInScreen;