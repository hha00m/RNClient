import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import getNotifications from '../api/getNofification'
import useAuth from "../auth/useAuth";
import Routes from '../Routes';
import colors from "../config/colors";
import AppText from "../components/AppText";
import ActivityIndecator from "../components/ActivtyIndectors/ActivityIndecatorNotifications";

function NotificationScreen(props) {
    const [messages, setMessages] = useState([]);
    const [totalNotificaiton, setTotalNotificaiton] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigation();
    let { user } = useAuth();

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const loadNotification = async () => {
        setIsLoading(true);
        const results = await getNotifications.get(user.token);
        setMessages([...messages, ...results.data.data]);
        setTotalNotificaiton(results.data.unseen);
        setIsLoading(false);
    };
    useEffect(() => {
        loadNotification();
    }, []);
    return (
        <Screen>
            <AppText
                style={styles.header}>جميع الاشعارات:{totalNotificaiton}
            </AppText>
            {isLoading && <ActivityIndecator visable={isLoading} />}
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

