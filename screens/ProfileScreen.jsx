import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { CustomInput } from '../components/common/Input';
import { RoundedButton } from '../components/common/Button';
import { Colors, Dim } from '../Constants';
import { Dropdown } from 'react-native-element-dropdown';
import { Feather, AntDesign } from '@expo/vector-icons';
import cars from '../assets/database/unique_make_model_year_converted.json';
import AutoCompleteModal from '../components/misc/VehicleSearchModal';
import { CardStyleInterpolators } from '@react-navigation/stack';
import CustomText from '../components/common/Text';

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [modalVis, setModalVis] = useState(false);
    const [text, setText] = useState('');
    const [activeVehicle, setActiveVehicle] = useState(null);

    const handleItemSelect = (item) => {
        const vehicle = `${item.Make} ${item.Model} ${item.Year}`;
        setVehicles(prevVehicles => [...prevVehicles, vehicle]);
    };

    const handleRemoveVehicle = (index) => {
        setVehicles(prevVehicles => prevVehicles.filter((_, i) => i !== index));
    };

    const vehicleData = vehicles.map(vehicle => ({ label: vehicle, value: vehicle }));

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.row}>
                    <CustomInput
                        small
                        textColor={Colors.Black}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        borderwidth={1}
                    />
                    <CustomInput
                        small
                        textColor={Colors.Black}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        borderwidth={1}
                    />
                </View>
                <CustomInput
                    large
                    placeholder="Phone Number"
                    textColor={Colors.Black}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    borderwidth={1}
                />
                <CustomInput
                    large
                    placeholder="Email Address"
                    textColor={Colors.Black}
                    value={email}
                    onChangeText={setEmail}
                    borderwidth={1}
                />
                <CustomInput
                    large
                    placeholder="Confirm Email Address"
                    textColor={Colors.Black}
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                    borderwidth={1}
                />
                <View style={styles.divider}>
                    <View style={styles.line} />
                    <CustomText p2 black> VEHICLES </CustomText>
                    <View style={styles.line} />
                </View>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={vehicleData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Active Vehicle"
                    value={activeVehicle}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setActiveVehicle(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="car"
                            size={20}
                        />
                    )}
                />
                {/* <FlatList
                    data={vehicles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.vehicleItem}>
                            <Text style={styles.vehicleText}>{item}</Text>
                            <TouchableOpacity onPress={() => handleRemoveVehicle(index)} style={styles.removeButton}>
                                <Feather name='x' size={20} color={Colors.Black} />
                            </TouchableOpacity>
                        </View>
                    )}
                /> */}
                <View style={styles.addButtonContainer}>
                    <RoundedButton medium style={styles.addButton} onPress={() => setModalVis(true)}>
                        Add new car
                    </RoundedButton>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <RoundedButton medium style={{ backgroundColor: Colors.Trim }}>
                    Done
                </RoundedButton>
            </View>
            <AutoCompleteModal
                searchValue={text}
                setSearchValue={setText}
                onItemSelect={handleItemSelect}
                onClose={() => setModalVis(false)}
                visible={modalVis}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        // backgroundColor: Colors.Background
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
        width: Dim.width,
        paddingTop: 50
    },
    dropdown: {
        height: 45,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        marginVertical: 10,
        width: Dim.width * 0.9,
    },
    placeholderStyle: {
        color: Colors.Gray,
    },
    selectedTextStyle: {
        color: Colors.Black,
    },
    inputSearchStyle: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
    },
    addButtonContainer: {
        paddingTop: 20
    },
    addButton: {
        backgroundColor: Colors.Trim,
    },
    vehicleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: Colors.Trim,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.White,
        marginVertical: 5,
        width: '100%',
    },
    vehicleText: {
        color: Colors.Black,
    },
    removeButton: {
        padding: 5,
        backgroundColor: Colors.Trim,
        borderRadius: 5,
    },
    removeButtonText: {
        color: Colors.White,
    },
    buttonContainer: {
        width: '100%',
        alignItems: "center",
        paddingVertical: 20,
        // backgroundColor: Colors.Background
    },
    icon: {
        marginRight: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    line: {
        height: 2,
        width: "30%",
        backgroundColor: Colors.Black,
        alignSelf: "center",
        paddingHorizontal: 10
    },
    divider: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20

    }
});

export default ProfileScreen;
