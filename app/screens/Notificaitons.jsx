import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import getNotifications from '../api/getNofification'
import useAuth from "../auth/useAuth";
import Routes from '../Routes';
import colors from "../config/colors";
import GestureRecognizer from 'react-native-swipe-gestures';
import AppText from "../components/AppText";

function NotificationScreen(props) {
    const [messages, setMessages] = useState([]);
    const [totalNotificaiton, setTotalNotificaiton] = useState(0);
    const navigator = useNavigation();
    let { user } = useAuth();

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const loadNotification = async () => {
        const results = await getNotifications.get(user.token);
        setMessages([...messages, ...results.data]);
        setTotalNotificaiton(results.unseen);
    };
    useEffect(() => {
        loadNotification();
    }, []);
    return (
        <GestureRecognizer
            config={config}
            onSwipeLeft={() => navigator.navigate(Routes.DASHBOARD)}
            onSwipeRight={() => navigator.navigate(Routes.SEARCH_RESULTS)}
            style={{ width: "100%", height: "100%" }}>
            <Screen>
                <AppText
                    style={styles.header}>جميع الاشعارات:{totalNotificaiton}
                </AppText>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={`${item.title} - ${item.order_no}`}
                            subTitle={`${item.body} `}
                            date={item.date}
                            seen={item.client_seen == 1 ? colors.white : colors.gray}
                            image={item.client_seen == 1 ? require("../assets/notifications/seen.png") : require("../assets/notifications/unseen.png")}
                            onPress={() => navigator.navigate(Routes.ORDER_DETAILS, { id: item.order_id })}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}

                />
            </Screen>
        </GestureRecognizer>
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

