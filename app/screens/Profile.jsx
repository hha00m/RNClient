import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../Routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import Routes from "../Routes";
import { useNavigation } from "@react-navigation/native";

const menuItems = [
    {
        title: "أشعاراتي",
        icon: {
            name: "bell",
            backgroundColor: colors.primary,
        },
        targetScreen: routes.NOTIFICATION,

    },
    {
        title: "محادثاتي",
        icon: {
            name: "chat",
            backgroundColor: colors.secondary,
        },
        targetScreen: routes.CHAT,
    },
];

function AccountScreen({ navigation }) {
    const { user, logOut } = useAuth();
    const navigator = useNavigation();
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.data.name}
                    subTitle={user.data.phone}
                    image={require("../assets/avatar/man.jpg")}
                    onPress={() => navigation.navigate(routes.CHAT)}

                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={colors.primery}
                                />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    )}
                />
            </View>
            <ListItem
                title="تسجيل خروج"
                IconComponent={<Icon name="logout" />}
                onPress={() => logOut()}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    },
});

export default AccountScreen;
