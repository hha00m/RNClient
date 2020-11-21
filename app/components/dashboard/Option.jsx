import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
const OptionsList = ({ path, data }) => {
    const navigator = useNavigation();
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
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
        width: "45%",
        height: 120,
        backgroundColor: "white",
        margin: 10,
        elevation: 20,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 12,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    adsAlart: {
        width: 60,
        height: 60,
        padding: 5

    },
    text: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold"
    }


})
