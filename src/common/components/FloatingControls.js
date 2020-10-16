import React, { useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Dimensions
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import MusicControl from 'react-native-music-control';

const FloatingControls = (props) => {
    const navigation = useNavigation();
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
        {soundContext.state.isAnySoundPlaying && <TouchableHighlight
            style={styles.buttons}
            onPress={() => togglePlay()}>
            {soundContext.state.playState !== MusicControl.STATE_PAUSED ? <Image
                style={styles.icons}
                source={require('../../assets/images/icons/pause.png')}
            /> : <Image
                    style={styles.icons}
                    source={require('../../assets/images/icons/play.png')}
                />}
        </TouchableHighlight>}

        {soundContext.state.isAnySoundPlaying && <TouchableHighlight
            style={styles.buttons}
            onPress={() => openTimerPopup()}>
            <View style={styles.timerCtnr}>
                {soundContext.state.selectedTimer.value === 'NO_TIMER' && <Image
                    style={[styles.icons, styles.timerIcon]}
                    source={require('../../assets/images/icons/timer.png')}
                />}
                {soundContext.state.selectedTimer.value !== 'NO_TIMER' && <Text style={styles.timerText}>{soundContext.state.timerCountdown}</Text>}
            </View>
        </TouchableHighlight>}

        <TouchableHighlight
            style={styles.buttons}
            onPress={() => showSoundList()}>
            <View style={styles.timerCtnr}>
                <View style={styles.iconWithBadgeCtnr}>
                    <Image
                        style={[styles.icons]}
                        source={require('../../assets/images/icons/sounds.png')}
                    />
                    {soundContext.state.selectedSoundBadge !== 0 && <Text style={styles.badge}>{soundContext.state.selectedSoundBadge}</Text>}
                </View>
            </View>
        </TouchableHighlight>
        
        <TouchableHighlight
            style={styles.buttons}
            onPress={() => navigation.navigate('Favourites')}>
            <View style={styles.timerCtnr}>
                <Image
                    style={[styles.icons]}
                    source={require('../../assets/images/icons/favourite.png')}
                />
            </View>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconWithBadgeCtnr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
    },
    timerIcon: {
        marginRight: 10
    },
    timerText: {
        fontSize: 17
    },
    badge: {
        fontSize: 12,
        color: 'black',
        width: 21,
        height: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        position: 'absolute',
        top: 25,
        left: 30
    }
});

export default FloatingControls;