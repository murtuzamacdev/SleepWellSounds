import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { SoundContext } from '../context/sound.context';
import AddToFav from '../common/components/AddToFav'
import AsyncStorage from '@react-native-community/async-storage';

const Favourites = () => {
    const soundContext = useContext(SoundContext);
    const [favs, setFavs] = React.useState([]);
    const [addToFav, setAddToFav] = React.useState(false);

    useEffect(() => {
        loadFavs();
    }, []);

    const loadFavs = async () => {
        let temp = await AsyncStorage.getItem('favs')
        let favs = JSON.parse(temp);
        setFavs(favs);
    }

    const onRemove = async (item) => {
        var favsTemp = favs;
        let index = favsTemp.findIndex((_item) => Object.keys(_item)[0] === Object.keys(item)[0])

        favsTemp.splice(index, 1);
        await AsyncStorage.setItem('favs', JSON.stringify(favsTemp));
        loadFavs();
    }

    return (<View style={styles.ctrn}>
        <View style={{ width: '100%' }}>
            <FlatList
                data={favs}
                keyExtractor={(item, index) => Object.keys(item)[0]}
                initialNumToRender={soundContext.state.sounds.length}
                renderItem={({ item }) => {
                    return <View style={styles.listItem}>
                        <Text style={styles.favName}>{Object.keys(item)[0]}</Text>
                        <TouchableHighlight
                            onPress={() => onRemove(item)}>
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
            onPress={() => { setAddToFav(true) }}>
            <Text style={styles.txt}>ADD CURRENT SOUNDS TO FAVOURITES</Text>
        </TouchableHighlight>

        <AddToFav addToFav={addToFav} setAddToFav={setAddToFav} loadFavs={loadFavs} favs={favs} />
    </View>);
}

const styles = StyleSheet.create({
    ctrn: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#45963B',
        paddingBottom: 60
    },
    addBtn: {
        width: '100%',
        height: 60,
        borderWidth: 0,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#251743',
        position: 'absolute',
        bottom: 0
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
        paddingLeft: 30,
        paddingRight: 30
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