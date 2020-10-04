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
                options={{
                  headerShown: false
                }} />
            </Stack.Navigator>

          </SoundContextProvider>
        </NavigationContainer>
      </SafeAreaView>

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
    {/* <StatusBar barStyle="dark-content" /> */}
    <View style={{ flex: 1 }}>
      <FlatList
        data={soundContext.state.sounds}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <TouchableHighlight onPress={() => { onTap(item) }} key={item.id} style={[styles.controlCtnr, { backgroundColor: item.backgroundColor }]} >
          <View style={styles.controlToggler}>
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
      <AddToFav />

      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID={Platform.OS === 'ios' ? admobBannerUnitId.IOS : admobBannerUnitId.ANDROID}
        didFailToReceiveAdWithError={onFailToRecieveAd}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  </>);
}

const windowW = Dimensions.get('window').width

const styles = StyleSheet.create({
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
    fontSize: 20,
    textAlign: 'center'
  },
  controlVolumeSlider:
  {
    width: 100,
    height: 40
  },
  soundIcon: {
    height: windowW / 6,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});

export default App;
