import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { SoundContext } from '../context/sound.context';

const Favourites = () => {
    const soundContext = useContext(SoundContext);
    const dummyArr = [
        {
            id: '1',
            name: 'Fav Name',
            soundsCount: 4
        },
        {
            id: '2',
            name: 'Fav Name',
            soundsCount: 4
        },
        {
            id: '3',
            name: 'Fav Name',
            soundsCount: 4
        }
    ]

    return (<View style={styles.ctrn}>
        <View style={{ width: '100%' }}>
            <FlatList
                data={dummyArr}
                keyExtractor={(item, index) => item.id}
                initialNumToRender={soundContext.state.sounds.length}
                renderItem={({ item }) => {
                    return <View style={styles.listItem}>
                        <Text style={styles.favName}>{item.name}</Text>
                        <TouchableHighlight
                            onPress={() => alert('remove')}>
                            <Image
                                style={styles.removeIcon}
                                source={require('../assets/images/icons/remove.png')}
                            />
                        </TouchableHighlight>
                    </View>
                }}
            />
        </View>
        <TouchableHighlight
            style={styles.addBtn}
            onPress={() => { soundContext.setShowAddToFavModal(true) }}>
            <Text style={styles.txt}>ADD CURRENT SOUNDS TO FAVOURITES</Text>
        </TouchableHighlight>
    </View>);
}

const styles = StyleSheet.create({
    ctrn: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#45963B'
    },
    addBtn: {
        width: '100%',
        height: 60,
        borderWidth: 0,
        // borderRadius: 100,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#251743',
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingLeft: 35,
        paddingRight: 35
    },
    removeIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    }, 
    favName: {
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'center'
    }
})

export default Favourites;