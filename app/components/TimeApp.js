import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import colors from "../config/colors";

const TimeApp = ({ onSlectedTime }) => {
  const [state, setState] = useState({
    selectedStartDate: null,
  });

  const onDateChange = (date) => {
    setState({
      selectedStartDate: date.format("YYYY-MM-DD"),
    });
    return onSlectedTime(date.format("YYYY-MM-DD"));
  };
  return (
    <View style={styles.container}>
      <CalendarPicker
        startFromMonday={true}
        weekdays={[
          "الاثنين",
          "ثلاثاء",
          "الاربعاء",
          "الخميس",
          "الجمعة",
          "سبت",
          "الاحد",
        ]}
        months={[
          "كانون الثاني",
          "شباط",
          "اذار",
          "نيسان",
          "ايار",
          "حزيران",
          "تموز",
          "اب",
          "ايلول",
          "تشرين الاول",
          "تشرين الثاني",
          "كانون ألاول",
        ]}
        previousTitle="سابق"
        nextTitle="تالي"
        todayBackgroundColor={colors.secondery}
        selectedDayColor={colors.primery}
        selectedDayTextColor="#fff"
        scaleFactor={375}
        onDateChange={onDateChange}
      />
      <Text
        style={{
          alignSelf: "center",
          top: "5%",
        }}
      >
        {state.selectedStartDate &&
          ` التاريخ المختار (${state.selectedStartDate})`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
export default TimeApp;
