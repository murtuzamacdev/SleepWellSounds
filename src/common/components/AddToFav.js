import React, { useState, useContext } from "react";
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

const AddToFav = (props) => {
    const soundContext = useContext(SoundContext);
    const [value, onChangeText] = React.useState('');

    const onSave = async (params) => {
        onChangeText('');
        let activeSounds = soundContext.state.sounds.filter((sound) => sound.player !== null);
        console.log(activeSounds)
        let favsArr = JSON.parse(await AsyncStorage.getItem('favs'));
        favsArr = favsArr || [];
        let fav = {
            [value]: activeSounds
        }

        console.log('fav :>> ', fav);
        soundContext.setShowAddToFavModal(!soundContext.state.showAddToFavModal)
    }

    return (<View style={styles.centeredView}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={soundContext.state.showAddToFavModal}
            onRequestClose={() => { onChangeText(''); soundContext.setShowAddToFavModal(false) }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Name Of The Favourite</Text>
                    <TextInput
                        autoFocus={true}
                        placeholder={'Bedtime, Study, Work etc..'}
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
                        style={[styles.closeBtn, { marginTop: 30 }]}
                        onPress={() => {
                            onChangeText('');
                            soundContext.setShowAddToFavModal(!soundContext.state.showAddToFavModal)
                        }}>
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>}
                </View>


            </View>
        </Modal>
    </View>);
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
        marginTop: 15,
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
        width: '60%',
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
        marginBottom: 20
    },
    saveBtn: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30
    }
});

export default AddToFav;