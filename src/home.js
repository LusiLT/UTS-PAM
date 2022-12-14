import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Text, Alert, View, Button, Platform, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function Home() {
    const [isi, setIsi] = useState('');
    const [judul, setJudul] = useState('');
    const [hari, setHari] = useState('0');
    const [jam, setJam] = useState('0');
    const [menit, setMenit] = useState('0');
    const [detik, setDetik] = useState('5');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);

    const [listhari] = useState (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']);
    const [listjam] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']);
    const [listmenit] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']);
    const [listdetik] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']);

    const [Data, setData] = useState([])
    const createData = (judul, isi, hari, jam, menit, detik) => {
        Data.push({ judul: judul, isi: isi, hari: hari, jam: jam, menit: menit, detik: detik });
        setData(Data)
        saveData(Data)
    }

    const saveData = async (Data) => {
        try {
            await AsyncStorage.setItem('riwayat', JSON.stringify(Data))
        } catch (error) {
            console.log('Save error', error)
        }
    }
    const getData = async () => {
        try {
            let isi_data = await AsyncStorage.getItem('riwayat')
            isi_data = JSON.parse(isi_data);
            if (isi_data !== null) {
                setData(isi_data)
            }
        } catch (error) {
            console.log('Save error', error)
        }
    }


    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        getData();
    })

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (

        <ScrollView>
            <View style={styles.wrapper}>
                <Text style={styles.judul_besar}>Bill Reminder</Text>
            </View>
            <View style={styles.content}>

                <Text style={styles.labelinput}>Jenis Tagihan</Text>
                <TextInput
                    style={styles.box_input}
                    placeholder="Masukkan jenis tagihan"
                    onChangeText={newJudul => setJudul(newJudul)}
                    defaultValue={judul}
                />
                <Text style={styles.labelinput}>Deskripsi Tagihan</Text>
                <TextInput
                    style={styles.box_input}
                    placeholder="Masukan Deskripsi Tagihan beserta Nominal"
                    onChangeText={newIsi => setIsi(newIsi)}
                    defaultValue={isi}
                />

                <Text>Lama Waktu Notifikasi (Hari, Jam, Menit, Detik)</Text>
                <View style={styles.waktu}>
                    {/* Hari */}
                    <Picker
                        selectedValue={hari}
                        style={styles.box_opsi}
                        onValueChange={(hari) => {
                            setHari(hari);
                        }}
                    >
                        {
                            listhari.map((p) => (
                                <Picker.Item key={p} label={p} value={p} />
                            ))
                        }
                    </Picker>
                    {/* Jam */}
                    <Picker
                        selectedValue={jam}
                        style={styles.box_opsi}
                        onValueChange={(jam) => {
                            setJam(jam);
                        }}
                    >
                        {
                            listjam.map((p) => (
                                <Picker.Item key={p} label={p} value={p} />
                            ))
                        }
                    </Picker>
                    {/* Menit */}
                    <Picker
                        selectedValue={menit}
                        style={styles.box_opsi}
                        onValueChange={(menit) => {
                            setMenit(menit);
                        }}
                    >
                        {
                            listmenit.map((p) => (
                                <Picker.Item key={p} label={p} value={p} />
                            ))
                        }
                    </Picker>
                    {/* detik */}
                    <Picker
                        selectedValue={detik}
                        style={styles.box_opsi}
                        onValueChange={(detik) => {
                            setDetik(detik);
                        }}
                    >
                        {
                            listdetik.map((p) => (
                                <Picker.Item key={p} label={p} value={p} />
                            ))
                        }
                    </Picker>

                </View>
                <TouchableOpacity style={styles.tombol}
                    onPress={

                        async () => {
                            if (judul == '' || isi == '') {
                                alert("Silahkan isi judul dan isi")
                            } else {

                                createData(judul, isi, hari, jam, menit, detik)
                                Alert.alert("Sukses", "Pengingat muncul dalam " + hari + " hari, " + jam + " jam, " + menit + " menit, " + detik + " detik.")
                                await schedulePushNotification(judul, isi, jam, menit, detik, hari);
                            }
                        }
                    }>
                    <Text style={styles.teks}>Buat Notifikasi</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}

async function schedulePushNotification(judul, isi, jam, menit, detik, hari) {

    // console.log(jam)
    var jam = parseInt(jam);
    var menit = parseInt(menit);
    var detik = parseInt(detik);
    var hari = parseInt(hari);
    await Notifications.scheduleNotificationAsync({
        content: {
            title: judul,
            body: isi,
            data: { data: 'goes here' },
        },
        trigger: { seconds: detik + (menit * 60) + (jam * 3600) + (hari * 86400) },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: true
        });
    }

    return token;
}

const styles = StyleSheet.create({
    box_input: {
        borderBottomWidth: 1,
        padding: 5,
        marginVertical: 5,
        width: '100%',
        borderColor: 'gray',
        marginBottom: 10,
    },
    waktu: {
   
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    box_opsi: {
        borderWidth: 1,
        marginVertical: 5,
        width: 75,
        borderRadius: 10,
        backgroundColor: '#a4e1ed',
        marginHorizontal: 1,
    },
    tombol: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0225a3',
        borderRadius: 5,

    },
    teks: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center'
    },
    head: {
        backgroundColor: '#007874',
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    labelinput: {
        color: 'black',
        fontSize: 15,
    },
    teks_judul: {
        color: 'white',
        marginBottom: 20,
        fontSize: 20
    },
    content: {
        backgroundColor: 'white',
        borderColor: 'black',
        flex: 1,
        marginTop: -190,
        marginBottom: 3,
        paddingHorizontal: 20,
        width: '95%',
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4,
        borderRadius: 9,
        alignSelf: 'center'
    },
    wrapper: {
        backgroundColor: '#0041a3',
        marginTop: '10%',
        height: 300

    },
    judul_besar: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    }
});