import React, { useState, useContext, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    TextInput
} from "react-native";
import { SoundContext } from '../../context/sound.context';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';


const AddToFav = (props) => {
    const soundContext = useContext(SoundContext);
    const [value, onChangeText] = React.useState('');

    useEffect(() => {
        // Focus on text input for Android
    }, []);

    const onSave = async () => {
        let index = props.favs.findIndex((_item) => Object.keys(_item)[0] === value);

        // Check if the name already exists
        if (index === -1) {
            onChangeText('');
            let activeSounds = soundContext.state.sounds.filter((sound) => sound.player !== null);

            let favsArr = JSON.parse(await AsyncStorage.getItem('favs'));
            favsArr = favsArr || [];
            let fav = {
                [value]: activeSounds
            }

            favsArr.push(fav);
            require("json-circular-stringify");
            await AsyncStorage.setItem('favs', JSON.stringify(favsArr));
            props.loadFavs();
            props.setAddToFav(false);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Name already exists',
                text2: 'Please try again with another name',
            })
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.addToFav}
            onRequestClose={() => { onChangeText(''); props.setAddToFav(false) }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Name Of The Favourite</Text>
                    <TextInput
                        autoFocus={true}
                        placeholder={'Bedtime, Nap, Work...'}
                        placeholderTextColor={'lightgray'}
                        style={styles.txtInput}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />

                    {/* Show Save button only when form is filled */}
                    {/\S/.test(value) && <TouchableOpacity
                        style={[styles.closeBtn, styles.saveBtn]}
                        onPress={onSave}>
                        <Text style={[styles.textStyle, { fontWeight: 'bold', fontSize: 18 }]}>Save</Text>
                    </TouchableOpacity>}


                    {Platform.OS === 'ios' && <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => {
                            onChangeText('');
                            props.setAddToFav(false)
                        }}>
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        paddingTop: 35,
        paddingBottom: 25,
        backgroundColor: "white",
        borderRadius: 20,
        backgroundColor: 'grey',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%',
        maxHeight: '80%'
    },
    closeBtn: {
        marginTop: 30,
        backgroundColor: "transparent",
        borderRadius: 20,
        elevation: 0,

    },
    textStyle: {
        color: "white",
        fontSize: 18,
        textAlign: "center"
    },
    txtInput: {
        width: '70%',
        height: 50,
        borderColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        fontSize: 19
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    saveBtn: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30
    }
});

export default AddToFav;