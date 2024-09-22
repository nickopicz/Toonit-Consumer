import React, { useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import CustomText from "../../components/common/Text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import { useStripe } from '@stripe/stripe-react-native';
import Receipt from "../../components/misc/Receipt";


const mockServices = [
    { name: 'Oil Change', price: 29.99 },
    { name: 'Tire Rotation', price: 49.99 },
    { name: 'Brake Inspection', price: 19.99 },
    { name: 'Engine Diagnostics', price: 89.99 },
    { name: 'Battery Replacement', price: 120.00 },
    { name: 'Wheel Alignment', price: 79.99 },
    { name: 'Air Filter Replacement', price: 25.00 },
    { name: 'Transmission Fluid Change', price: 150.00 },
    { name: 'Spark Plug Replacement', price: 99.00 },
];

const PayScreen = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();



    //parameter from mechanics own pricing
    const amount = 20000;

    const [loading, setLoading] = useState(false);
    async function fetchPaymentSheetParams() {
        try {
            const response = await fetch('http://172.20.10.2:3000/payment-sheet', { // Update this URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount, // Amount in cents, adjust as necessary
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
                applePay: Platform.OS === "ios" ? true : false,
                googlePay: Platform.OS === "android" ? true : false,
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
            <View style={styles.breakdown}>
                <Receipt services={mockServices} />

            </View>
            <View style={styles.buttonContainer}>
                {/* Open Payment Sheet to complete payment */}
                <RoundedButton large onPress={async () => {
                    try {
                        setLoading(true);  // Optional, if you want to show a loading state
                        await initializePaymentSheet(); // Wait for initialization to complete
                        await openPaymentSheet(); // Open the payment sheet only after initialization
                    } catch (error) {
                        Alert.alert('Error', 'Failed to open payment sheet. Please try again.');
                    } finally {
                        setLoading(false);  // Reset loading state regardless of success or failure
                    }
                }}
                    disabled={loading} // Disable button if loading
                >Pay</RoundedButton>

            </View>
        </View >
    );
}

// Fetch Payment Sheet parameters from your backend server


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
