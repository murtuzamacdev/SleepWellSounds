import React, { Component } from 'react';
import { SOUNDS } from '../common/constants';
import MusicControl from 'react-native-music-control';
import {
    Player,
    Recorder,
    MediaStates
} from '@react-native-community/audio-toolkit';

export const SoundContext = React.createContext();

export class SoundContextProvider extends Component {
    state = {
        sounds: [],
    }

    initializeSounds = () => {
        let _sounds = [];
        for (let key in SOUNDS) {
            SOUNDS[key].player = null;
            SOUNDS[key].volume = 1;
            _sounds.push(SOUNDS[key])
        }

        this.setState({
            sounds: _sounds
        })
    }

    removeSound = (selectedSound) => {
        selectedSound.player.stop();
        let selectedSoundIndex = this.state.sounds.findIndex((sound) => sound.id === selectedSound.id);
        let _sounds = this.state.sounds;
        _sounds[selectedSoundIndex].player = null;
        _sounds[selectedSoundIndex].volume = 0.5
        this.setState({
            sounds: _sounds
        })

        let isAnySoundPlaying = this.state.sounds.find((sound) => {
            if (sound.player && sound.player.isPlaying) {
                return true;
            } else {
                return false;
            }
        })

        if (isAnySoundPlaying === undefined) {
            MusicControl.resetNowPlaying();
        }
    }

    addSound = (selectedSound) => {
        selectedSound.player = new Player(`${selectedSound.fileName}`, {
            autoDestroy: false,
            continuesToPlayInBackground: true
        });
        selectedSound.player.looping = true;
        selectedSound.player.play();
        selectedSound.player.volume = 0.5;
        let selectedSoundIndex = this.state.sounds.findIndex((sound) => sound.id === selectedSound.id);
        let _sounds = this.state.sounds;
        _sounds[selectedSoundIndex].player = selectedSound.player;
        this.setState({
            sounds: _sounds
        })

        this.state.sounds.forEach((sound) => {
            if (sound.player && sound.player.isPaused) {
                sound.player.play()
            }
        })
    }

    initMusicControlEvents = () => {
        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableBackgroundMode(false);
        MusicControl.enableControl('closeNotification', true, { when: 'always' });

        // Add Listeners
        MusicControl.on('play', (e) => {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING
            })
            this.state.sounds.forEach((sound) => {
                sound.player && sound.player.play();
            })
        })

        MusicControl.on('pause', () => {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PAUSED
            })
            this.state.sounds.forEach((sound) => {
                sound.player && sound.player.pause();
            })
        })
    }

    onVolumeChange = (soundPlayerId, volume) => {
        let selectedSoundIndex = this.state.sounds.findIndex((sound) => sound.id === soundPlayerId);
        this.state.sounds[selectedSoundIndex].player.volume = volume;
        let _sounds = this.state.sounds;
        _sounds[selectedSoundIndex].volume = volume;
        this.setState({
            sounds: _sounds
        })
    }


    setSounds = (_sounds) => {
        this.setState({
            sounds: _sounds
        })
    }

    checkSoundMaxLimit = () => {
        let playingSound = this.state.sounds.filter((sound) => {
            return (sound.player ? true : false);
        })

        return (playingSound.length <= 3 ? true : false)

    }

    render() {
        return (
            <SoundContext.Provider
                value={{
                    state: this.state,
                    initMusicControlEvents: this.initMusicControlEvents,
                    setSounds: this.setSounds,
                    initializeSounds: this.initializeSounds,
                    removeSound: this.removeSound,
                    addSound: this.addSound,
                    onVolumeChange: this.onVolumeChange,
                    checkSoundMaxLimit: this.checkSoundMaxLimit
                }}>
                {this.props.children}
            </SoundContext.Provider>
        );
    }
}

