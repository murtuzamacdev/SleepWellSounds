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
  ImageBackground,
  FlatList,
  Platform,
  Dimensions
} from 'react-native';
import { SOUNDS, admobBannerUnitId } from './src/common/constants';
import MusicControl from 'react-native-music-control';
// import { AdMobBanner } from 'react-native-admob';
import { SoundContext, SoundContextProvider } from './src/context/sound.context';
import SoundList from './src/common/components/SoundList';
import VolumeSlider from './src/common/components/VolumeSlider';
import FloatingControls from './src/common/components/FloatingControls';
import TimerOptions from './src/common/components/TimerOptions';
import Toast from 'react-native-toast-message';
import RNBootSplash from "react-native-bootsplash";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Favourites from './src/pages/Favourites';
import AddToFav from './src/common/components/AddToFav'

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <SoundContextProvider>

            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={AppWrapper}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Favourites"
                component={Favourites}
              />
            </Stack.Navigator>

          </SoundContextProvider>
        </NavigationContainer>
      </SafeAreaView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const AppWrapper = () => {
  const soundContext = useContext(SoundContext);
  const [initializeMusicControl, setInitializeMusicControl] = useState(false);

  useEffect(() => {
    soundContext.initializeSounds();
    setTimeout(() => {
      RNBootSplash.hide({ duration: 250 });
    }, 1000);

  }, []);

  const onTapTemp = (selectedSound) => {
    var Sound = require('react-native-sound');

    // Enable playback in silence mode
Sound.setCategory('Playback');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var whoosh = new Sound('whoosh.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  // Play the sound with an onEnd callback
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
  }

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
    <View style={{ flex: 1 }}>
      <FlatList
        data={soundContext.state.sounds}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <TouchableHighlight onPress={() => { onTap(item) }} key={item.id} style={[styles.controlCtnr]} >
          <View style={styles.controlToggler}>
            <Image
              style={styles.soundIcon}
              source={item.soundImage}
            />
            <View style={{flexDirection: 'row',  justifyContent: 'center', }}>
            <Text style={styles.controlText}>{item.name}</Text>
            </View>
            <View style={styles.overlay} />
            {item.player && <View style={styles.sliderCtnr}><VolumeSlider item={item} /></View>}
            
          </View>
        </TouchableHighlight>}
      />
      <FloatingControls />
      {soundContext.state.isAnySoundPlaying !== undefined && <SoundList />}
      <TimerOptions />

      {/* <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID={Platform.OS === 'ios' ? admobBannerUnitId.IOS : admobBannerUnitId.ANDROID}
        didFailToReceiveAdWithError={onFailToRecieveAd}
      /> */}
    </View>
  </>);
}

const windowW = Dimensions.get('window').width

const styles = StyleSheet.create({
  sliderCtnr: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  controlCtnr: {
    height: windowW / 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  controlToggler: {
    textAlign: 'center',
    height: windowW / 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  controlText: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'flex-start',
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
    zIndex:1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  controlVolumeSlider:
  {
    width: 100,
    height: 40,
    
  },
  soundIcon: {
    // height: windowW / 6,
    height: '100%',
    width: '100%',
    // resizeMode: 'contain',
    // alignSelf: 'center'
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   
  },
  overlay: {
    // height: windowW / 6,
    height: '100%',
    width: '100%',
    // resizeMode: 'contain',
    // alignSelf: 'center'
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }
});

export default App;
