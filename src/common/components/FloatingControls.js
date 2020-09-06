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

const FloatingControls = (props) => {
    const soundContext = useContext(SoundContext);

    const togglePlaying = () => {
        
    }

    const showSoundList = () => {
        soundContext.setShowSoundListModal(true)
    }

    return (<View style={styles.container}>
        <TouchableHighlight
            onPress={() => togglePlaying()}>
            <Text>Play/Pause</Text>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => showSoundList()}>
            <Text>Sound List</Text>
        </TouchableHighlight>
    </View>);
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        position:'absolute',
        bottom:100,
        width: '100%'
    }
});

export default FloatingControls;