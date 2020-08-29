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
import MusicControl from 'react-native-music-control';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';

const App: () => React$Node = () => {
  const [sounds, setSounds] = useState([])
  const [initializeMusicControl, setInitializeMusicControl] = useState(false)

  useEffect(() => {
    let _sounds = [];
    for (let key in SOUNDS) {
      SOUNDS[key].player = null;
      SOUNDS[key].volume = 1;
      _sounds.push(SOUNDS[key])
    }
    setSounds(_sounds);

    // Show Interstitial Ad
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7653964150164042/1289478516');
    // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  const onTap = (selectedSound) => {
    if (selectedSound.player) { // If already playing
      selectedSound.player.stop();
      let selectedSoundIndex = sounds.findIndex((sound) => sound.id === selectedSound.id);
      let _sounds = sounds;
      _sounds[selectedSoundIndex].player = null;
      setSounds([...sounds]);

      let isAnySoundPlaying = sounds.find((sound) => {
        if (sound.player && sound.player.isPlaying) {
          return true;
        } else {
          return false;
        }
      })

      if (isAnySoundPlaying === undefined) {
        MusicControl.resetNowPlaying();
      }

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

      sounds.forEach((sound) => {
        if (sound.player && sound.player.isPaused) {
          sound.player.play()
        }
      })

      if (initializeMusicControl === false) {
        initMusicControlEvents()
        setInitializeMusicControl(true)
      }

      MusicControl.setNowPlaying({
        title: 'Sleep Well Sounds',
        artist: 'Playing',
      })

      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING
      })
    }
  }

  const onVolumeChange = (soundPlayerId, volume) => {
    let selectedSoundIndex = sounds.findIndex((sound) => sound.id === soundPlayerId);
    sounds[selectedSoundIndex].player.volume = volume;
    let _sounds = sounds;
    _sounds[selectedSoundIndex].volume = volume;
    setSounds([...sounds]);
  }

  const initMusicControlEvents = () => {
    MusicControl.enableControl('play', true)
    MusicControl.enableControl('pause', true)
    MusicControl.enableBackgroundMode(false);
    MusicControl.enableControl('closeNotification', true, { when: 'always' });

    MusicControl.on('play', (e) => {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING
      })
      sounds.forEach((sound) => {
        sound.player && sound.player.play();
      })
    })

    // On Pause
    MusicControl.on('pause', () => {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED
      })
      sounds.forEach((sound) => {
        sound.player && sound.player.pause();
      })
    })
  }

  const onFailToRecieveAd = (error) => {
    console.log('admob error :>> ', error);
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
                value={sound.volume}
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
        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID="ca-app-pub-7653964150164042/7040498642"
          testDeviceID="CF583E54-34C6-453C-80FC-493D2468A51E"
          didFailToReceiveAdWithError={onFailToRecieveAd}
        />
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
