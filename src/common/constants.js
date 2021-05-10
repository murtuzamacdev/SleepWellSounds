export var SOUNDS = {
    RAIN: {
        id: 'RAIN',
        fileName: 'rain.wav',
        src: require('../assets/sounds/rain.wav'),
        name: 'Rain',
        volume: 0.5,
        soundImage: require('../assets/images/soundImages/rain.jpg'),
        backgroundColor: '#45963B',
        duration: 5387
    },
    THUNDER: {
        id: 'THUNDER',
        fileName: 'thunder.wav',
        src: require('../assets/sounds/thunder.wav'),
        name: 'Thunder',
        soundImage: require('../assets/images/soundImages/storm.jpg'),
        volume: 0.5,
        backgroundColor: '#74BB4C',
        duration: 27272
    },
    RAIN_WINDOW: {
        id: 'RAIN_WINDOW',
        fileName: 'umbrella.wav',
        src: require('../assets/sounds/umbrella.wav'),
        name: 'Umbrella',
        soundImage: require('../assets/images/soundImages/umbrella.jpg'),
        volume: 0.5,
        backgroundColor: '#98CB80',
        duration: 5077
    },
    BIRDS: {
        id: 'BIRDS',
        fileName: 'birds.wav',
        src: require('../assets/sounds/birds.wav'),
        name: 'Birds',
        soundImage: require('../assets/images/soundImages/birds.jpg'),
        volume: 0.5,
        backgroundColor: '#77B982',
        duration: 6161
    },
    WIND: {
        id: 'WIND',
        fileName: 'wind.wav',
        src: require('../assets/sounds/wind.wav'),
        name: 'Wind',
        soundImage: require('../assets/images/soundImages/wind.jpg'),
        volume: 0.5,
        backgroundColor: '#3C925B',
        duration: 9765
    },
    CAR: {
        id: 'CAR',
        fileName: 'car.wav',
        src: require('../assets/sounds/car.wav'),
        name: 'Car',
        soundImage: require('../assets/images/soundImages/car.jpg'),
        volume: 0.5,
        backgroundColor: '#9CC7A5',
        duration: 5091
    },
    STREAM: {
        id: 'STREAM',
        fileName: 'stream.wav',
        src: require('../assets/sounds/stream.wav'),
        name: 'Stream',
        soundImage: require('../assets/images/soundImages/stream.jpg'),
        volume: 0.5,
        backgroundColor: '#44AAAA',
        duration: 5011
    },
    OM: {
        id: 'OM',
        fileName: 'om.wav',
        src: require('../assets/sounds/om.wav'),
        name: 'Om',
        soundImage: require('../assets/images/soundImages/om.jpg'),
        volume: 0.5,
        backgroundColor: '#126DAB',
        duration: 8380
    },
    FIRE: {
        id: 'FIRE',
        fileName: 'fire.wav',
        src: require('../assets/sounds/fire.wav'),
        name: 'Fire',
        soundImage: require('../assets/images/soundImages/fire.jpg'),
        volume: 0.5,
        backgroundColor: '#0D3D84',
        duration: 5036
    },
    WAVES: {
        id: 'WAVES',
        fileName: 'waves.wav',
        src: require('../assets/sounds/waves.wav'),
        name: 'Waves',
        soundImage: require('../assets/images/soundImages/waves.jpg'),
        volume: 0.5,
        backgroundColor: '#1C2239',
        duration: 6241
    },
    BOWL: {
        id: 'BOWL',
        fileName: 'bowl.wav',
        src: require('../assets/sounds/bowl.wav'),
        name: 'Bowl',
        soundImage: require('../assets/images/soundImages/bowl.jpg'),
        volume: 0.5,
        backgroundColor: '#545488',
        duration: 6000
    },
    CRICKET: {
        id: 'CRICKET',
        fileName: 'night.wav',
        src: require('../assets/sounds/night.wav'),
        name: 'Night',
        soundImage: require('../assets/images/soundImages/night.jpg'),
        volume: 0.5,
        backgroundColor: '#3A3387',
        duration: 4619
    },
    WHITE_NOISE_1: {
        id: 'WHITE_NOISE_1',
        fileName: 'whitenoisea.wav',
        src: require('../assets/sounds/whitenoisea.wav'),
        name: 'White Noise 1',
        soundImage: require('../assets/images/soundImages/whitenoisea.jpg'),
        volume: 0.5,
        backgroundColor: '#68407c',
        duration: 4922
    },

    WHITE_NOISE_2: {
        id: 'STREAM1',
        fileName: 'whitenoiseb.wav',
        src: require('../assets/sounds/whitenoiseb.wav'),
        name: 'White Noise 2',
        soundImage: require('../assets/images/soundImages/whitenoiseb.jpg'),
        volume: 0.5,
        backgroundColor: '#251743',
        duration: 4789
    },
    FAN: {
        id: 'FAN',
        fileName: 'fan.wav',
        src: require('../assets/sounds/fan.wav'),
        name: 'Fan',
        soundImage: require('../assets/images/soundImages/fan.jpg'),
        volume: 0.5,
        backgroundColor: '#311b46',
        duration: 5004
    },
    FLUTE: {
        id: 'FLUTE',
        fileName: 'flute.wav',
        src: require('../assets/sounds/flute.wav'),
        name: 'Flute',
        soundImage: require('../assets/images/soundImages/flute.jpg'),
        volume: 0.5,
        backgroundColor: '#190d25',
        duration: 40513
    }
}

export const timerOptions = [
    { label: 'No Timer', value: 'NO_TIMER' },
    // { label: '1 Minutes', value: 60000 },
    // { label: 'Custom Duration', value: 'CUSTOM' },
    { label: '5 Minutes', value: 300000 },
    { label: '10 Minutes', value: 600000 },
    { label: '15 Minutes', value: 900000 },
    { label: '20 Minutes', value: 1200000 },
    { label: '30 Minutes', value: 1800000 },
    { label: '40 Minutes', value: 2400000 },
    { label: '1 Hour', value: 3600000 },
    { label: '2 Hours', value: 7200000 },
    { label: '4 Hours', value: 14400000 },
    { label: '8 Hours', value: 28800000 },
]

// Prod
export const admobBannerUnitId = {
    IOS: 'ca-app-pub-7653964150164042/7040498642',
    ANDROID: 'ca-app-pub-7653964150164042/7455431619'
}

export const admobInterstitialUnitId = {
    IOS: 'ca-app-pub-7653964150164042/6229612290',
    ANDROID: 'ca-app-pub-7653964150164042/1289478516'
}

// Test
// export const admobBannerUnitId = {
//     IOS: 'ca-app-pub-3940256099942544/6300978111',
//     ANDROID: 'ca-app-pub-3940256099942544/6300978111'
// }

// export const admobInterstitialUnitId = {
//     IOS: 'ca-app-pub-3940256099942544/1033173712',
//     ANDROID: 'ca-app-pub-3940256099942544/1033173712'
// }
