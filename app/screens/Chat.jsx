import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ListItem, ListItemSeparator } from "../components/lists";
import cache from "../utility/cache";

import ActivityIndecator from "../components/ActivtyIndectors/ActivityIndecatorSimpleLine";
import getChatListAPI from '../api/getChatList'
// import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import Routes from '../Routes';
import AppText from "../components/AppText";

function NotificationScreen(props) {
    const [messages, setMessages] = useState([]);
    const [totalNotificaiton, setTotalNotificaiton] = useState(0);
    const navigator = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    let { user } = useAuth();

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const loadNotification = async () => {
        setIsLoading(true);
        const results = await getChatListAPI.get(user.token);
        setMessages([...messages, ...results.data.data]);
        setTotalNotificaiton(results.data.count);
        setIsLoading(false);
    };
    const loadNotification_local = async () => {
        setIsLoading(true);
        const results = await cache.get("/chat.php?token=" + user.token);
        setMessages([...messages, ...results.data]);
        // setTotalNotificaiton(results.data.count);
        setIsLoading(false);
    };
    useEffect(() => {
        loadNotification_local();
        loadNotification();

    }, []);
    return (
        <Screen>
            <AppText
                style={styles.header}>جميع المحادثات المفتوحة:{totalNotificaiton}
            </AppText>

            {isLoading && <ActivityIndecator visable={isLoading} />}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.order_no}
                        subTitle={item.message}
                        date={item.date}
                        seen={item.client_seen === "1" ? colors.white : colors.unseen}
                        image={item.client_seen === "1" ? require("../assets/notifications/chatBlue.png") : require("../assets/notifications/chatRed.png")}
                        onPress={() =>
                            navigator.navigate(Routes.CHAT_MODEL, { id: item.id })
                        }
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}

            />
        </Screen>
    );
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.black,
        color: colors.white,
        fontSize: 20,
        padding: 10,
    }
})

export default NotificationScreen;

