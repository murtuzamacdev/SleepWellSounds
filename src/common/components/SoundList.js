import React, { useState, useContext } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    FlatList
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import VolumeSlider from './VolumeSlider';

const SoundList = (props) => {
    const soundContext = useContext(SoundContext);

    return (<View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={soundContext.state.showSoundListModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FlatList
                        data={soundContext.state.sounds}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            if (item.player !== null) {
                                return <View style={styles.listItem} >
                                    <Text style={styles.controlText}>{item.name}</Text>
                                    {item.player && <VolumeSlider item={item} />}
                                    <TouchableHighlight
                                        onPress={() => soundContext.removeSound(item)}>
                                        <Text>Remove</Text>
                                    </TouchableHighlight>
                                </View>
                            } else {
                                return null
                            }
                        }}
                    />

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            soundContext.setShowSoundListModal(!soundContext.state.showSoundListModal)
                        }}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
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
        marginTop: 22
    },
    modalView: {
        paddingTop: 35,
        paddingBottom: 35,
        backgroundColor: "white",
        borderRadius: 20,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,

    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        width: 250,
    },
});

export default SoundList;