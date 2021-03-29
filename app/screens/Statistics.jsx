import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Divider } from 'react-native-paper';
import colors from '../config/colors';
import { DataTable, Title } from 'react-native-paper';

export default function Statistics() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Title style={[{ marginTop: 30, color: colors.danger, fontFamily: "Tjw_blod", alignSelf: "center" }]}>
                    الصفحة قيد الانشاء والمعلومات غير صحيحة
                   </Title>
                <Title style={[{ marginTop: 40 }, styles.Title]}>
                    اليوم
                   </Title>
                <DataTable>

                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات جديدة</Text></DataTable.Cell>
                        <DataTable.Cell numeric>120</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات تم تسليمها</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات راجعة ممكن معالجتها </Text></DataTable.Cell>
                        <DataTable.Cell numeric>6 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات راجعة ممكن استلامها </Text></DataTable.Cell>
                        <DataTable.Cell numeric>6 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>ارباح ممكن استلامها</Text></DataTable.Cell>
                        <DataTable.Cell numeric>16 000 000 </DataTable.Cell>
                    </DataTable.Row>

                </DataTable>
                <Divider />
                <Title style={[{ marginTop: 40 }, styles.Title]}>
                    موقف من الكشف اسبوعي
                   </Title>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات مسحوب بها كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>مبالغ مستلمة</Text></DataTable.Cell>
                        <DataTable.Cell numeric>100 000 000 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات مسحوب بها كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                <Divider />

                <Title style={[{ marginTop: 40 }, styles.Title]}>
                    موقف من الكشف شهري
                   </Title>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات مسحوب بها كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>مبالغ مستلمة</Text></DataTable.Cell>
                        <DataTable.Cell numeric>100 000 000 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات مسحوب بها كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>

                <Title style={[{ marginTop: 40 }, styles.Title]}>
                    موقف من الكشف لكل الفترة
                   </Title>
                <DataTable>
                    <DataTable.Row  >
                        <DataTable.Cell><Text style={styles.RowTitle}> طلبيات مسحوب بها كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>مبالغ مستلمة</Text></DataTable.Cell>
                        <DataTable.Cell numeric>100 000 000 </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف واصل</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات مسحوب بها كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell><Text style={styles.RowTitle}>طلبيات بدون كشف راجع</Text></DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        direction: "rtl"
    },
    Title: {
        fontFamily: "Tjw_medum",
        alignSelf: "flex-start",
        padding: 8,
        color: colors.secondery,
    },
    RowTitle: {
        fontFamily: "Tjw_reg",
        fontSize: 12

    },
    Row: {
        direction: "rtl"

    }
})
