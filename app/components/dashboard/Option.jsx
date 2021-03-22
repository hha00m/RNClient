import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import borderRadiuss from '../../config/borderRadiuss';
import colors from '../../config/colors';
const OptionsList = ({ path, data }) => {
    const navigator = useNavigation();

    const handelData = (key) => {
        switch (key) {
            case "disclosures": return "";// `(${numberWithCommas(data.client_price)})`;
            case "returned": return `(${data.inprocess})`;;
            case "instorage": return `(${parseInt(data.instorageReturnd) + parseInt(data.instoragereplace) + parseInt(data.instoragepartiallyReturnd)})`;
            case "onway": return `(${data.onway})`;
            case "posponded": return `(${data.posponded})`;
            case "recived": return `(${parseInt(data.replace) + parseInt(data.recieved) + parseInt(data.partiallyReturnd)})`;
            default:
                return "(0)";
        }
    }
    return (
        <>
            <TouchableOpacity style={styles.box}
                onPress={() => navigator.navigate(path.forwardTo, { action: path.action, name: path.name })} >
                <Image style={styles.adsAlart}
                    source={path.path}
                />
                <Text style={styles.text}>{path.name} {data && handelData(path.action)}</Text>
            </TouchableOpacity>
        </>
    )
}
export default OptionsList;
const styles = StyleSheet.create({
    box: {
        width: "43%",
        height: 110,
        backgroundColor: colors.white,
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: borderRadiuss.Radius_light,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        borderBottomWidth: 4,
        borderBottomColor: colors.vueColorButtom,

    },

    adsAlart: {
        width: 60,
        height: 70,
        padding: 30

    },
    text: {
        alignSelf: "center",
        color: colors.black,
        fontSize: 12,
        fontFamily: "Tjw_xblod",
        textShadowColor: colors.black,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,

    }


})
