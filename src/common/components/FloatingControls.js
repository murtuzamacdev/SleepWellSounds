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

    const openTimerPopup = () => {
        soundContext.setShowTimerPopup(true);
    }

    return (<View style={styles.container}>
        <TouchableHighlight
            style={styles.buttons}
            onPress={() => togglePlay()}>
            {soundContext.state.playState !== MusicControl.STATE_PAUSED ? <Image
                style={styles.icons}
                source={require('../../assets/images/icons/pause.png')}
            /> : <Image
                    style={styles.icons}
                    source={require('../../assets/images/icons/play.png')}
                />}
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.buttons}
            onPress={() => openTimerPopup()}>
            <View style={styles.timerCtnr}>
                <Image
                    style={[styles.icons, styles.timerIcon]}
                    source={require('../../assets/images/icons/timer.png')}
                />
                {soundContext.state.selectedTimer.value !== 'NO_TIMER' && <Text style={styles.timerText}>{soundContext.state.timerCountdown}</Text>}
            </View>

        </TouchableHighlight>
        <TouchableHighlight
            style={styles.buttons}
            onPress={() => showSoundList()}>
            <Image
                style={styles.icons}
                source={require('../../assets/images/icons/sounds.png')}
            />
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
        borderTopWidth: 3,
        borderColor: 'white',
        height: 60

    },
    buttons: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    btnLable: {
        textAlign: 'center'
    },
    icons: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    timerCtnr: {
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerIcon: {
        marginRight: 10
    },
    timerText: {
        fontSize: 17
    }
});

export default FloatingControls;