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
  FlatList,
  Platform,
  Dimensions
} from 'react-native';
import { SOUNDS, admobBannerUnitId } from './src/common/constants';
import MusicControl from 'react-native-music-control';
import { AdMobBanner } from 'react-native-admob';
import { SoundContext, SoundContextProvider } from './src/context/sound.context';
import SoundList from './src/common/components/SoundList';
import VolumeSlider from './src/common/components/VolumeSlider';
import FloatingControls from './src/common/components/FloatingControls';
import TimerOptions from './src/common/components/TimerOptions';
import Toast from 'react-native-toast-message'

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
          title: 'Sleep and Relax...',
          notificationIcon: 'my_custom_icon',
          artwork: require('./src/assets/images/appIcon.png')
          // artist: 'Playing',
        })

        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Max limit reached',
          text2: '10 sounds can be played at a time',
        })
      }
    }
  }

  const onFailToRecieveAd = (error) => {
    console.log('admob error :>> ', error);
  }

  return (<>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={soundContext.state.sounds}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <TouchableHighlight onPress={() => { onTap(item) }} key={item.id} style={[styles.controlCtnr, { backgroundColor: item.backgroundColor }]} >
          <View style={styles.controlToggler}>
            {/* <Text style={styles.controlText}>{item.name}</Text> */}
            <Image
              style={styles.soundIcon}
              source={item.icon}
            />
            {item.player && <VolumeSlider item={item} />}
          </View>
        </TouchableHighlight>}
      />
      {soundContext.state.isAnySoundPlaying !== undefined && <FloatingControls />}
      {soundContext.state.isAnySoundPlaying !== undefined && <SoundList />}
      <TimerOptions />

      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID={Platform.OS === 'ios' ? admobBannerUnitId.IOS : admobBannerUnitId.ANDROID}
        didFailToReceiveAdWithError={onFailToRecieveAd}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  </>);
}

const windowW = Dimensions.get('window').width

const styles = StyleSheet.create({
  controlCtnr: {
    height: windowW/3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
    height: windowW/6,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});

export default App;
