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
    Image,
    Platform
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import { timerOptions } from '../constants'

const TimerOptions = () => {
    const soundContext = useContext(SoundContext);

    return (<View style={styles.centeredView}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={soundContext.state.showTimerPopup}
            onRequestClose={() => { soundContext.setShowTimerPopup(false) }}
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
                                <View style={[styles.listItem, item.value === soundContext.state.selectedTimer.value && styles.selectedListItem]}>
                                    <View style={styles.checkIconCtrn}>
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
                    {Platform.OS === 'ios' && <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => {
                            soundContext.setShowTimerPopup(!soundContext.state.showTimerPopup)
                        }}>
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>}
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
        paddingTop: 25,
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
        maxHeight: '95%'

    },
    listItem: {
        flexDirection: 'row',
        width: 250,
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        height: 50,
        marginRight: 15,
        paddingLeft: 15
    },
    selectedListItem: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
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
    checkIconCtrn: {
        width: 22,
        marginRight: 15,
        // marginLeft: 10
    },
    checkIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default TimerOptions;