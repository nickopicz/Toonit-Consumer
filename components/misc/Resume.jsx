import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CustomText from '../common/Text';
import { Colors } from '../../Constants';


const ExperienceItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <CustomText h3 white style={styles.title}>{item.title}</CustomText>
            <CustomText p1 white style={styles.company}>{item.com}</CustomText>
            <CustomText p2 black>Years of Experience: {item.years}</CustomText>
        </View>
    );
};

const ExperienceList = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ExperienceItem item={item} />}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Black,
    },
    title: {
        marginBottom: 4,
    },
    company: {
        marginBottom: 2,
    }
});

export default ExperienceList;
