import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated, Pressable, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import colors from '../../config/colors'
import { Text } from '@ui-kitten/components';
import borderRadiuss from '../../config/borderRadiuss';

const AdsCompany = ({ title }) => {
    const regex = /(<([^>]+)>)/ig;
    const [modalVisible, setModalVisible] = useState(false);
    const result = title.replace(regex, '');
    const startValue = new Animated.Value(1);
    const endValue = 1.5;
    useEffect(() => {
        Animated.loop(
            Animated.spring(startValue, {
                toValue: endValue,
                friction: 1,
                useNativeDriver: true,
            }),
            { iterations: 1000 },
        ).start();
    }, [startValue, endValue]);



    return (
        <View style={styles.adsContainer}>
            <View style={{ width: 60, height: 60, alignSelf: "center" }}>
                <Pressable style={{ flex: 1 }}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Animated.View
                        style={[
                            styles.adsAlart,
                            {
                                transform: [
                                    {
                                        scale: startValue,
                                    },
                                ],
                            },
                        ]}
                    >
                        <Image style={styles.img}
                            source={require("../../assets/dashboard/advertisement.png")}
                        />
                    </Animated.View>
                </Pressable>
            </View>
            <ScrollView>
                <Text style={{ textAlign: "right", fontFamily: 'Tjw_reg', fontSize: 12, color: colors.black }}>{result}</Text>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{result}</Text>
                        <Pressable
                            style={[styles.button,]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>اخفاء</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    )
}
export default AdsCompany;
const styles = StyleSheet.create({
    adsContainer: {
        width: "97%",
        height: 90,
        alignSelf: "center",
        borderRadius: borderRadiuss.Radius_light,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        backgroundColor: colors.grayRandom,
        margin: "3%",
        padding: 5,
        shadowColor: "black",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    adsAlart: {
        width: "95%",
        height: "95%",
        padding: 10,
        alignSelf: "center",


    },
    img: {
        width: "90%",
        height: "90%",
        alignSelf: "center",
        backgroundColor: colors.grayRandom,
        borderRadius: borderRadiuss.Radius_light,


    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: colors.vueColorButtom
    },

    textStyle: {
        color: "white",
        fontFamily: "Tjw_blod",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Tjw_reg"
    }

})
