import React, { useState, useContext } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import { timerOptions } from '../constants'

const TimerOptions = () => {
    const soundContext = useContext(SoundContext);

    return (<View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={soundContext.state.showTimerPopup}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Select Timer Duration</Text>
                    <FlatList
                        data={timerOptions}
                        keyExtractor={(item, index) => item.value.toString()}
                        initialNumToRender={timerOptions.length}
                        renderItem={({ item }) => {
                            return <TouchableHighlight
                                onPress={() => soundContext.updateTimer(item)}>
                                <View style={styles.listItem}>
                                    <View style={{ width: 25, marginRight: 20 }}>
                                        {item.value === soundContext.state.selectedTimer.value && <Image
                                            style={styles.checkIcon}
                                            source={require('../../assets/images/icons/check_circle.png')}
                                        />}
                                    </View>
                                    <Text style={[styles.textStyle, item.value === soundContext.state.selectedTimer.value && styles.selectedText]}>{item.label}</Text>
                                </View>
                            </TouchableHighlight>
                        }}
                    />
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => {
                            soundContext.setShowTimerPopup(!soundContext.state.showTimerPopup)
                        }}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>);
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
        width: 300,
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        height: 50
        // borderWidth: 1,
        // width: '100%',
        // marginBottom: 30
    },
    textStyle: {
        color: "white",
        fontSize: 18,
        textAlign: "left",
    },
    closeBtn: {
        marginTop: 15,
        backgroundColor: "transparent",
        borderRadius: 20,
        elevation: 0
    },
    selectedText: {
        fontWeight: 'bold'
    },
    checkIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',

    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25
    }
});

export default TimerOptions;