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
import Slider from '@react-native-community/slider';

const VolumeSlider = (props) => {
    const soundContext = useContext(SoundContext);

    return (<Slider
        style={styles.controlVolumeSlider}
        value={props.item.player.volume}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="lightgrey"
        maximumTrackTintColor="#000000"
        onValueChange={(volume) => { soundContext.onVolumeChange(props.item.id, volume) }}
    />);
}

const styles = StyleSheet.create({
    controlVolumeSlider:
    {
        width: 150,
        height: 40,
        alignSelf: 'center'
    }
});

export default VolumeSlider;