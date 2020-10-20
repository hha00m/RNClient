import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import colors from "../config/colors";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
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
          onDateChange={this.onDateChange}
        />

        <View style={{ alignItems: "flex-end" }}>
          <Text>من تاريخ:{startDate}</Text>
          <Text>الى تاريخ{endDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
