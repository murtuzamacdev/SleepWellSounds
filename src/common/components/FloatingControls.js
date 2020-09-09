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
import MusicControl from 'react-native-music-control';

const FloatingControls = (props) => {
    const soundContext = useContext(SoundContext);

    const togglePlay = () => {
        if (soundContext.state.playState === MusicControl.STATE_PLAYING) { // Pause
            soundContext.togglePlay('PAUSE');
        } else { // Play
            soundContext.togglePlay('PLAY');
        }
    }

    const showSoundList = () => {
        console.log('soundContext.state.sounds :>> ', soundContext.state.sounds);
        soundContext.setShowSoundListModal(true)
    }

    return (<View style={styles.container}>
        <TouchableHighlight
            onPress={() => togglePlay()}>
            <Text>{soundContext.state.playState !== MusicControl.STATE_PAUSED ? 'Pause' : 'Play'}</Text>
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
        borderColor: 'green',
        borderRadius: 20,
        // position: 'absolute',
        // bottom: 100,
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        paddingBottom: 20
    }
});

export default FloatingControls;