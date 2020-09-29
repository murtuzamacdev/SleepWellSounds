import React, { useState, useContext } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
    Image
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import VolumeSlider from './VolumeSlider';

const SoundList = (props) => {
    const soundContext = useContext(SoundContext);

    return (<View style={styles.centeredView}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={soundContext.state.showSoundListModal}
            onRequestClose={() => {soundContext.setShowSoundListModal(false)}}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FlatList
                        data={soundContext.state.sounds}
                        keyExtractor={(item, index) => item.id}
                        initialNumToRender={soundContext.state.sounds.length}
                        renderItem={({ item }) => {
                            if (item.player !== null) {
                                return <View style={styles.listItem} >
                                    <Image
                                        style={styles.soundIcon}
                                        source={item.icon}
                                    />
                                    {item.player && <VolumeSlider item={item} />}
                                    <TouchableHighlight
                                        onPress={() => soundContext.removeSound(item)}>
                                        <Image
                                            style={styles.removeIcon}
                                            source={require('../../assets/images/icons/remove.png')}
                                        />
                                    </TouchableHighlight>
                                </View>
                            }
                        }}
                    />

                    {Platform.OS === 'ios' && <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => {
                            soundContext.setShowSoundListModal(!soundContext.state.showSoundListModal)
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
    textStyle: {
        color: "white",
        fontSize: 18,
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
        // borderWidth: 1,
        width: '100%',
        marginBottom: 30
    },
    soundIcon: {
        borderWidth: 0,
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    removeIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    }
});

export default SoundList;