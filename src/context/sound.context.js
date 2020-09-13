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
        playState: MusicControl.STATE_STOPPED,
        showSoundListModal: false,
        isAnySoundPlaying: undefined
    }

    initializeSounds = () => {
        let _sounds = [];
        for (let key in SOUNDS) {
            SOUNDS[key].player = null;
            SOUNDS[key].volume = 0.5;
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

        let isAnySoundSelected = this.state.sounds.find((sound) => {
            return sound.player ? true : false
        })

        let isSoundPlaying = this.state.sounds.find((sound) => {
            return (sound.player && sound.player.isPlaying) ? true : false
        })

        this.setState({ 
            isAnySoundPlaying: isAnySoundSelected,
            playState: isSoundPlaying ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED
         })

        if (isAnySoundSelected === undefined) {
            MusicControl.resetNowPlaying();
            this.setState({
                showSoundListModal: false
            })
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

        this.setState({ isAnySoundPlaying: true, playState: MusicControl.STATE_PLAYING })
    }

    initMusicControlEvents = () => {
        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableBackgroundMode(true);
        MusicControl.enableControl('closeNotification', true, { when: 'always' });

        // Add Listeners
        MusicControl.on('play', (e) => {
            this.togglePlay('PLAY');
        })

        MusicControl.on('pause', () => {
            this.togglePlay('PAUSE');
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

    checkSoundMaxLimit = () => {
        let playingSound = this.state.sounds.filter((sound) => {
            return (sound.player ? true : false);
        })

        return (playingSound.length <= 8 ? true : false)
    }

    setShowSoundListModal = (val) => {
        this.setState({ showSoundListModal: val })
    }

    togglePlay = (val) => {
        let state, method;
        if (val === 'PLAY') {
            state = MusicControl.STATE_PLAYING;
            method = 'play';
        }else {
            state = MusicControl.STATE_PAUSED;
            method = 'pause';
        }
        MusicControl.updatePlayback({
            state: state
        })
        this.state.sounds.forEach((sound) => {
            sound.player && sound.player[method]();
        })

        this.setState({
            playState: state
        })
    }

    render() {
        return (
            <SoundContext.Provider
                value={{
                    state: this.state,
                    initMusicControlEvents: this.initMusicControlEvents,
                    initializeSounds: this.initializeSounds,
                    removeSound: this.removeSound,
                    addSound: this.addSound,
                    togglePlay: this.togglePlay,
                    onVolumeChange: this.onVolumeChange,
                    checkSoundMaxLimit: this.checkSoundMaxLimit,
                    setShowSoundListModal: this.setShowSoundListModal
                }}>
                {this.props.children}
            </SoundContext.Provider>
        );
    }
}

