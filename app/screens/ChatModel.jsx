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
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorChatLoading'
const ChatModel = () => {
    const [value, onChangeText] = React.useState('');
    const route = useRoute();
    let { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    //---------------------------------------------------------
    const loadMessages = async (token, id) => {
        const results = (await getMessages.getMessages(token, id));
        setMessages(results.data.data);
        setIsLoading(false);
    };
    useEffect(() => {
        loadMessages(user.token, route.params.id);
    }, [])

    const sendMessages = async (token, id, message) => {
        const result = (await getMessages.sendMessages(token, id, message));
        if (!result.ok) loadMessages(token, id);
        if (result.ok) {
            loadMessages(token, id);
            onChangeText("")
        }
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
                <View style={{ flexDirection: "column-reverse", justifyContent: "space-around", width: "100%", height: "85%" }}>
                    {isLoading ? <ActivityIndecator visable={isLoading} /> :
                        <FlatList
                            style={{ flex: 1 }}
                            data={messages}
                            inverted={-1}
                            keyExtractor={(item) => `${item.id}_${item.message}`.toString()}
                            renderItem={({ item }) => (
                                item.is_client === "1" ? <Sender item={item} /> : <Reciever item={item} />
                            )}
                        />
                    }
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
