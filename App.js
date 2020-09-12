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
  Image,
  FlatList
} from 'react-native';
import { SOUNDS } from './src/common/constants';
import MusicControl from 'react-native-music-control';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import { SoundContext, SoundContextProvider } from './src/context/sound.context';
import SoundList from './src/common/components/SoundList';
import VolumeSlider from './src/common/components/VolumeSlider';
import FloatingControls from './src/common/components/FloatingControls';

const App: () => React$Node = () => {

  return (
    <SoundContextProvider>
      <AppWrapper />
    </SoundContextProvider>
  );
};

const AppWrapper = () => {
  const soundContext = useContext(SoundContext);
  const [initializeMusicControl, setInitializeMusicControl] = useState(false);

  useEffect(() => {
    soundContext.initializeSounds();

    // Show Interstitial Ad
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7653964150164042/1289478516');
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
    <SafeAreaView style={{ height: '100%' }}>
      <FlatList
        data={soundContext.state.sounds}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <TouchableHighlight onPress={() => { onTap(item) }} key={item.id} style={[styles.controlCtnr, {backgroundColor: item.backgroundColor}]} >
          <View style={styles.controlToggler}>
            {/* <Text style={styles.controlText}>{item.name}</Text> */}
            <Image
              style={styles.soundIcon}
              source={require('./src/assets/images/rain.png')}
            />
            {item.player && <VolumeSlider item={item} />}
          </View>
        </TouchableHighlight>}
      />
      {soundContext.state.isAnySoundPlaying !== undefined && <FloatingControls />}
      {soundContext.state.isAnySoundPlaying !== undefined && <SoundList />}

      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID="ca-app-pub-7653964150164042/7040498642"
        didFailToReceiveAdWithError={onFailToRecieveAd}
      />
    </SafeAreaView>
  </>);
}


const styles = StyleSheet.create({
  controlCtnr: {
    // borderWidth: 1,
    height: 130,
    flex: 1,
    // margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // alignContent: 'center',
    borderColor: 'green',
    // borderRadius: 10,
  },
  controlToggler: {
    textAlign: 'center'
  },
  controlText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  controlVolumeSlider:
  {
    width: 100,
    height: 40
  },
  soundIcon: {
    width: 65, 
    alignSelf: 'center'
  }
});

export default App;
