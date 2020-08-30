/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  FlatList
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SOUNDS } from './src/common/constants';
import MusicControl from 'react-native-music-control';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import { SoundContext, SoundContextProvider } from './src/context/sound.context'

const App: () => React$Node = () => {

  return (
    <SoundContextProvider>
      <AppWrapper />
    </SoundContextProvider>
  );
};

const AppWrapper = () => {
  const soundContext = useContext(SoundContext);
  const [initializeMusicControl, setInitializeMusicControl] = useState(false)

  useEffect(() => {
    soundContext.initializeSounds();

    // Show Interstitial Ad
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7653964150164042/1289478516');
    // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  const onTap = (selectedSound) => {
    if (selectedSound.player) { // If already playing
      soundContext.removeSound(selectedSound);
    } else { // if not already playing, 
      let isAllowed = soundContext.checkSoundMaxLimit();
      if (isAllowed) {
        soundContext.addSound(selectedSound);

        if (initializeMusicControl === false) {
          soundContext.initMusicControlEvents()
          setInitializeMusicControl(true)
        }

        MusicControl.setNowPlaying({
          title: 'Sleep Well Sounds',
          artist: 'Playing',
        })

        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING
        })
      } else {
        alert('Max limit reached.')
      }
    }
  }

  const onFailToRecieveAd = (error) => {
    console.log('admob error :>> ', error);
  }

  return (<>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView>
        <FlatList
          data={soundContext.state.sounds}
          numColumns={3}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => <TouchableHighlight onPress={() => { onTap(item) }} key={item.id} style={styles.controlCtnr}>
            <View
              style={styles.controlToggler}
            >
              <Text style={styles.controlText}>{item.name}</Text>
              {item.player && <Slider
                style={{ width: 90, height: 40 }}
                value={0.5}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="lightgrey"
                maximumTrackTintColor="#000000"
                onValueChange={(volume) => { soundContext.onVolumeChange(item.id, volume) }}
              />
              }
            </View>
          </TouchableHighlight>}
        />

        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID="ca-app-pub-7653964150164042/7040498642"
          testDeviceID="CF583E54-34C6-453C-80FC-493D2468A51E"
          didFailToReceiveAdWithError={onFailToRecieveAd}
        />
      </ScrollView>
    </SafeAreaView>
  </>);
}


const styles = StyleSheet.create({
  controlCtnr: {
    borderWidth: 1,
    height: 100,
    flex: 1,
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
