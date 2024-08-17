import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CustomText from "../../components/common/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import { useStripe, initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const PayScreen = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        try {
            // Fetch the PaymentSheet parameters from your backend
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

            // Initialize the Payment Sheet with these parameters
            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntent,
                customerEphemeralKeySecret: ephemeralKey,
                customerId: customer,
                merchantDisplayName: 'Your Merchant Name',
            });

            if (!error) {
                setLoading(true);
            } else {
                Alert.alert(`Error initializing payment sheet: ${error.message}`);
            }
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error: ${error.message}`);
        } else {
            Alert.alert('Success', 'Your payment is confirmed!');
            setLoading(false);  // Reset loading state if needed
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {/* Initialize Payment Sheet */}
                <RoundedButton large
                    // onPress={initializePaymentSheet}
                    onPress={() => navigation.navigate("Confirm")}
                    disabled={loading}>Init</RoundedButton>
            </View>
            <View>
                {/* Open Payment Sheet to complete payment */}
                <RoundedButton large onPress={
                    openPaymentSheet
                } disabled={!loading}>Pay</RoundedButton>
            </View>
        </View>
    );
}

// Fetch Payment Sheet parameters from your backend server
async function fetchPaymentSheetParams() {
    try {
        const response = await fetch('http://172.20.10.2:3000/payment-sheet', { // Update this URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1099, // Amount in cents, adjust as necessary
            }),
        });

        // Extract the required parameters from the response
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    } catch (error) {
        console.error("Error fetching payment sheet params:", error);
        throw error;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        backgroundColor: Colors.Background,
    },
    textContainer: {
        width: "70%",
        justifyContent: "flex-end",
        height: "50%"
    },
    line: {
        width: "80%",
        height: 3,
        backgroundColor: Colors.Black
    },
    buttonContainer: {
        paddingVertical: 50,
    },
    subtotal: {
        alignItems: "center",
        width: "70%"
    }
});

export default PayScreen;
