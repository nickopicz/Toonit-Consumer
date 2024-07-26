import React from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../Constants';
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../common/Text';

const MechModal = ({ visible, onClose, onConfirm, profileImage, summaryText }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={profileImage} style={styles.profileImage} />
                    <ScrollView style={styles.textScroll}>
                        <CustomText p3 black>
                            {summaryText}
                        </CustomText>
                    </ScrollView>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                            <FontAwesome name='close' size={30} color={Colors.Trim} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={styles.iconButton}>
                            <FontAwesome name='check' size={30} color={Colors.Background} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.Background,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "65%",
        borderWidth: 2,
        borderColor: Colors.Trim
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginBottom: 20,
    },
    textScroll: {
        marginBottom: 20,
        textAlign: 'center',
        height: "35%",
        borderWidth: 2,
        width: "95%",
        borderRadius: 10,
        borderColor: Colors.Trim,
        backgroundColor: Colors.White,
        padding: 10
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    iconButton: {
        height: 60,
        width: 60,
        backgroundColor: Colors.White,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.Trim
    },
});

export default MechModal;
