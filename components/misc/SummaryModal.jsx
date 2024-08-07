import React from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../Constants';
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomText from '../common/Text';
import { RoundedButton } from '../common/Button';

const SummaryModal = ({ visible, onClose, onConfirm, profileImage, mechanicName }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.profileContent}>
                        <Image source={profileImage} style={styles.profileImage} />
                        <View style={styles.nameContainer}>
                            <CustomText p1 black>{mechanicName}</CustomText>
                        </View>
                    </View>
                    <CustomText h4 black>
                        Please review the summary to confirm {mechanicName} did the job.
                    </CustomText>

                </View>
                <RoundedButton large onPress={onClose} style={{ marginVertical: 10 }}>
                    Summary
                </RoundedButton>
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
    profileContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: "50%"
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: Colors.Black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "30%",
        borderWidth: 2,
        borderColor: Colors.Black
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: "absolute",
        marginTop: -70

        // marginBottom: 20,
    },
    nameContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "50%"
    }
});

export default SummaryModal;
