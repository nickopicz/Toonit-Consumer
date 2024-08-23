import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../../Constants";
import { RoundedButton } from "../../components/common/Button";
import AutoCompleteInput from "../../components/misc/AutoCompleteInput";

const FirstCarScreen = ({ navigation }) => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

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
                dependency={{ brand, model }} // Filter years based on selected brand and model
                isActive={activeInput === 'year'}
                setActiveInput={() => setActiveInput('year')}
                clearActiveInput={() => setActiveInput(null)}
            />
            <RoundedButton large trim>
                Confirm
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
    },
});

export default FirstCarScreen;
