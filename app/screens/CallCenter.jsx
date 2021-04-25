import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Headline, Paragraph, Title } from 'react-native-paper';

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import routes from "../Routes";
import Screen from "../components/Screen";
import { Linking } from "react-native";
import borderRadiuss from "../config/borderRadiuss";
import { I18nManager } from "react-native";

const menuItems = [
    {
        title: "بغداد",
        subTitle: "07722877759",
        img: require("../assets/avatar/call-center.png"),

        targetScreen: routes.NOTIFICATION,
    },
    {
        title: "كربلاء نجف",
        subTitle: "07733003055",
        img: require("../assets/avatar/call-center-agent.png"),

        targetScreen: routes.CHAT,
    }, {
        title: "بابل",
        subTitle: "07812334335",
        img: require("../assets/avatar/24-hours-support.png"),

        targetScreen: routes.CHAT,
    },
    {
        title: "باقي المدن",
        subTitle: "07722877759",
        img: require("../assets/avatar/call-cente.png"),

        targetScreen: routes.CHAT,
    },
    // {
    //     title: "بصرة, أربيل, سليمانية",
    //     subTitle: "07835723018",
    //     img: require("../assets/avatar/24-hours-suppor.png"),

    //     targetScreen: routes.CHAT,
    // },
    // {
    //     title: "ديوانية, موصل, بابل, كوت",
    //     subTitle: "07835723019",
    //     img: require("../assets/avatar/woman-with-headset.png"),
    //     targetScreen: routes.CHAT,
    // },
];

function CallCenter() {

    return (
        <Screen style={styles.screen}>

            <View
                style={{
                    width: "90%",
                    height: 120,
                    backgroundColor: "#D8D8D8",
                    alignSelf: "center",
                    margin: 10,
                    borderRadius: borderRadiuss.Radius_light,

                }}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: I18nManager.isRTL ? "row-reverse" : "row-reverse",
                    }}
                >
                    <Feather name="info" size={24} color={colors.black} />
                    <Title
                        style={{
                            alignSelf: "center",
                            padding: 8,
                            color: colors.black,
                            fontFamily: "Tjw_blod",
                            fontSize: 16
                        }}>خدمة العملاء</Title>
                </View>
                <Paragraph
                    style={{
                        alignSelf: "center",
                        textAlign: "center",
                        color: colors.black,
                        padding: 8,
                        fontFamily: "Tjw_reg",
                        fontSize: 14
                    }}>نحن هنا من اجل مساعدتك اضغط مباشرتا على المحافظة وسوف تتصل بالشخص المسوؤل لحل طلبك</Paragraph>

            </View>




            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            subTitle={item.subTitle}
                            image={item.img}

                            onPress={() =>
                                Linking.openURL(`tel:${item.subTitle}`)
                            }
                        />
                    )}
                />
            </View>

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

export default CallCenter;
