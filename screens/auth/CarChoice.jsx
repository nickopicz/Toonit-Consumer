import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors, Dim } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import AutoCompleteInput from "../../components/misc/AutoCompleteInput";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/slices/loginSlice";
import { handleAccountCreation } from "../../functions/CreateAuthDoc";

const CarScreen = ({ navigation }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    const { password, phoneNum, firstName, lastName } = useSelector((state) => state.login)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("brand: ", brand);
        console.log("model: ", model);
        console.log("year: ", year);
        console.log("car from redux: ", car)
    }, [brand, model, year]);

    const [activeInput, setActiveInput] = useState(null); // State to track active input

    return (
        <SafeAreaView style={styles.container}>
            <AutoCompleteInput
                label="Brand"
                searchValue={brand}
                setSearchValue={setBrand}
                onItemSelect={(item) => setBrand(item)}
                dataKey="Make"
                dependency={null} // No dependency for brand
                isActive={activeInput === 'brand'}
                setActiveInput={() => setActiveInput('brand')}
                clearActiveInput={() => setActiveInput(null)}
            />
            <AutoCompleteInput
                label="Model"
                searchValue={model}
                setSearchValue={setModel}
                onItemSelect={(item) => setModel(item)}
                dataKey="Model"
                dependency={brand} // Filter models based on selected brand
                isActive={activeInput === 'model'}
                setActiveInput={() => setActiveInput('model')}
                clearActiveInput={() => setActiveInput(null)}
            />
            <AutoCompleteInput
                label="Year"
                searchValue={year}
                setSearchValue={setYear}
                onItemSelect={(item) => setYear(item)}
                dataKey="Year"
                dependency={brand && model ? { brand, model } : null} // Filter years based on selected brand and model
                isActive={activeInput === 'year'}
                setActiveInput={() => setActiveInput('year')}
                clearActiveInput={() => setActiveInput(null)}
            />
            <RoundedButton
                large
                onPress={() => {
                    if (brand.length > 0 && model.length > 0 && year.length > 0) {
                        handleAccountCreation(password, phoneNum, firstName, lastName, { brand: brand, model: model, year: year })
                    }
                }}
                style={styles.button}
            >
                Complete Setup
            </RoundedButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
        padding: 20,
        alignItems: "center",
        flexDirection: "column",
    },
    button: {
        position: "absolute",
        marginTop: Dim.height - 100,
    },
});

export default CarScreen;
