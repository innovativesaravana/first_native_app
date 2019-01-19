import React from "react";
import _ from "lodash";
import Calendar from "./calendar";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const date = new Date();
    this.state = {
      isVisible: false,
      date: date,
      months: months
    };
  }
  render() {
    return (
      <View>
        {this.state.isVisible && (
          <Calendar
            date={this.state.date}
            yearOnly={false}
            closeModel={this.closeModel}
          />
        )}
        <TouchableOpacity
          style={styles.viewButton}
          key="label"
          onPress={() => this.viewBottonClicked()}
        >
          <Text>
            {`${
              this.state.months[this.state.date.getMonth()]
            } ${this.state.date.getFullYear()}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  viewBottonClicked = e => {
    this.setState({
      isVisible: true
    });
  };
  closeModel = date => {
    this.setState({
      isVisible: false,
      date: date
    });
  };
}

const styles = StyleSheet.create({
  viewButton: {
    width: "33%",
    height: "20%",
    marginTop: "10%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    alignSelf: "stretch"
  }
});
