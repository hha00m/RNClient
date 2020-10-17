import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, FlatList, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Sender from '../components/chat/Sender'
import Reciever from '../components/chat/Receiver'
import InputTextMessage from '../components/chat/InputTextMessage'
import colors from '../config/colors'
import Screen from './../components/Screen'
import getMessages from './../api/getMessages'
import useAuth from "../auth/useAuth";

const ChatModel = () => {
    const [value, onChangeText] = React.useState('');
    const route = useRoute();
    let { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    //---------------------------------------------------------
    const loadMessages = async (token, id) => {
        console.log("load details called")
        const results = (await getMessages.getMessages(token, id));
        setMessages(results.data.data);
        setIsLoading(false);
    };
    useEffect(() => {
        loadMessages(user.token, route.params.id);
    }, [])

    const sendMessages = async (token, id, message) => {
        console.log("send message from method")
        const results = (await getMessages.sendMessages(token, id, message));
        // setMessages(...messages, ...message);
        // setIsLoading(false);
        loadMessages(token, id);
    };
    //---------------------------------------------------------
    return (
        <Screen>
            <View style={styles.container}>

                <View style={styles.sendingBottonContainer}>
                    <InputTextMessage
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={message => onChangeText(message)}
                        value={value}
                        multiline

                        onPress={() => sendMessages(user.token, route.params.id, value)}
                    />
                </View>
                <View style={{ flexDirection: "column-reverse", justifyContent: "space-around", width: "100%", height: "100%", paddingTop: 70 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            item.is_client === "1" ? <Sender item={item} key={item.id} /> : <Reciever item={item} key={item.id} />
                        )}
                    // ItemSeparatorComponent={ListItemSeparator}
                    />
                </View>

            </View>

        </Screen>
    )
}

export default ChatModel

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray,
        flex: 1,
        flexDirection: "column-reverse"
    },
    logoContainer: {
        position: "absolute",
        top: "5%",
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.white,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10
    },

    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    sendingBottonContainer: {
        height: "15%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    }
})
