import React, { useState, useContext } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
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
        soundContext.setShowSoundListModal(true)
    }

    return (<View style={styles.container}>
        <TouchableHighlight
        style={styles.buttons}
            onPress={() => togglePlay()}>
            <Text style={styles.btnLable}>{soundContext.state.playState !== MusicControl.STATE_PAUSED ? 'Pause' : 'Play'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.buttons}
            onPress={() => showSoundList()}>
            <Text style={styles.btnLable}>Sound List</Text>
        </TouchableHighlight>
    </View>);
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'lightgrey',
        borderTopWidth: 1,
        borderColor: 'grey',
        height: 60
        
    },
    buttons: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    }, 
    btnLable: {
        textAlign: 'center'
    }
});

export default FloatingControls;