import React, { useState, useContext } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    FlatList
} from "react-native";
import { SoundContext } from '../../context/sound.context';

const TimerOptions = () => {
    const soundContext = useContext(SoundContext);

    return ( <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={soundContext.state.showTimerPopup}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>Hello</Text>
                </View>
            </View>
        </Modal>
    </View> );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        paddingTop: 35,
        paddingBottom: 25,
        backgroundColor: "white",
        borderRadius: 20,
        backgroundColor: 'grey',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%',
        maxHeight: '80%'

    },
    closeBtn: {
        marginTop: 15,
        backgroundColor: "transparent",
        borderRadius: 20,
        elevation: 0
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        // borderWidth: 1,
        width: '100%',
        marginBottom: 30
    },
   
});
 
export default TimerOptions;