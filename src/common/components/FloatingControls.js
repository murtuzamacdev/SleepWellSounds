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
    const [playStatus, setPlayStatus] = useState(true);

    const togglePlaying = () => {
        if (playStatus) { // Pause
            soundContext.state.sounds.forEach((sound) => {
                sound.player && sound.player.pause();
            })
        } else { // Play
            soundContext.state.sounds.forEach((sound) => {
                sound.player && sound.player.play();
            })
        }

        setPlayStatus(!playStatus)
    }

    const showSoundList = () => {
        soundContext.setShowSoundListModal(true)
    }

    return (<View style={styles.container}>
        <TouchableHighlight
            onPress={() => togglePlaying()}>
            <Text>{playStatus ? 'Pause' : 'Play'}</Text>
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
        position: 'absolute',
        bottom: 100,
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        paddingBottom: 20
    }
});

export default FloatingControls;