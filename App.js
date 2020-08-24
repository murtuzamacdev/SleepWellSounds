/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
import { SOUNDS } from './src/common/constants';

const App: () => React$Node = () => {
  const [players, setPlayers] = useState([]);
  const [sounds, setSounds] = useState([])

  useEffect(() => {
    let _sounds = [];
    for (let key in SOUNDS) {
      SOUNDS[key].player = null;
      _sounds.push(SOUNDS[key])
    }
    setSounds(_sounds);
  }, []);

  const onTap = (selectedSound) => {
    if (selectedSound.player) { // If already playing
      selectedSound.player.stop();
      let selectedSoundIndex = sounds.findIndex((sound) => sound.id === selectedSound.id);
      let _sounds = sounds;
      _sounds[selectedSoundIndex].player = null;
      setSounds([...sounds]);
    } else { // if not already playing, 
      selectedSound.player = new Player(`${selectedSound.fileName}`, {
        autoDestroy: false,
        continuesToPlayInBackground: true
      });
      selectedSound.player.looping = true;
      selectedSound.player.play();
      let selectedSoundIndex = sounds.findIndex((sound) => sound.id === selectedSound.id);
      let _sounds = sounds;
      _sounds[selectedSoundIndex].player = selectedSound.player;
      setSounds([...sounds]);
    }
  }

  const onVolumeChange = (soundPlayerId, volume) => {
    let selectedPlayerIndex = players.findIndex((player) => player.id === soundPlayerId);
    players[selectedPlayerIndex].playerObj.volume = volume;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {sounds.map((sound) => {
          return <TouchableHighlight onPress={() => { onTap(sound) }} key={sound.id} style={styles.controlCtnr}>

            <View
              style={styles.controlToggler}
            >
              <Text style={styles.controlText}>{sound.name}</Text>
              {sound.player && <Slider
                style={{ width: 90, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="lightgrey"
                maximumTrackTintColor="#000000"
                onValueChange={(volume) => { onVolumeChange(sound.id, volume) }}
              />
              }
            </View>
          </TouchableHighlight>
        })}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  controlCtnr: {
    borderWidth: 1,
    height: 100,
    width: 130,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'green',
    borderRadius: 10
  },
  controlToggler: {
    textAlign: 'center'
  },
  controlText: {
    color: 'green',
    fontSize: 20,
    textAlign: 'center'
  },
  controlVolumeSlider: {

  }
});

export default App;
