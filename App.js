import React from "react";
import _ from "lodash";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AppRegistry,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { mode, yearOnly, startMonth, startYear, closeModel } = props;
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
    const { cells, headerLabel } = this.parseData(mode, months, startYear);
    this.state = {
      mode: mode,
      cells: cells,
      months: months,
      headerLabel: headerLabel,
      yearOnly: yearOnly,
      currentYear: startYear,
      currentMonth: startMonth,
      selectedYear: startYear,
      selectedMonth: startMonth
    };
  }

  parseData = (mode, months, year) => {
    let cells, headerLabel;
    if (mode === "months") {
      cells = months;
      headerLabel = year;
    } else {
      const diff = (year % 10) + 1;
      const startYear = year - diff;
      const lastYear = startYear + 13;
      cells = [];
      for (var i = 0; i <= 11; i++) {
        cells.push(startYear + i);
      }
      headerLabel = `${startYear + 1} - ${lastYear - 2}`;
    }
    return { cells, headerLabel };
  };

  render() {
    return (
      <Modal
        style={styles.modalContainer}
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => this.leftClicked()}
              style={styles.headerCells}
              key="left"
            >
              <Text style={styles.textCell}>{"<<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerCells}
              onPress={() => this.yearMode()}
              key="label"
            >
              <Text style={styles.textCell}>{this.state.headerLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.rightClicked()}
              style={styles.headerCells}
              key="right"
            >
              <Text style={styles.textCell}>{">>"}</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>
          {this.state.selectedMonth} - {this.state.selectedYear}
        </Text> */}
          <View style={styles.cellContainer}>
            {_.map(this.state.cells, cell => {
              const selectedYear = this.state.selectedYear;
              const selectedMonth = this.state.selectedMonth;
              // const compareValue = (this.state.mode == "years") ? this.state.selectedYear : this.state.selectedMonth
              let isActive = false;
              if (this.state.mode == "years") {
                isActive = this.state.selectedYear == cell;
              } else {
                isActive =
                  this.state.selectedYear == this.state.currentYear &&
                  this.state.selectedMonth == cell;
              }
              const bColor = isActive ? "#0081ED" : "white";
              const fColor = isActive ? "white" : "black";

              return (
                <TouchableOpacity
                  style={[styles.monthCells, { backgroundColor: bColor }]}
                  onPress={() => this.cellClicked(cell)}
                  key={cell}
                >
                  <Text style={[styles.cellText, { color: fColor }]}>
                    {cell}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                this.props.closeModel(
                  this.state.selectedMonth,
                  this.state.selectedYear
                )
              }
              key="label"
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  getColor = cellValue => {
    if (this.state.mode == "years") {
      return this.state.currentYear == cellValue ? "blue" : "black";
    } else {
      return this.state.currentMonth == cellValue ? "blue" : "black";
    }
  };

  leftClicked = e => {
    var currentYear = this.state.currentYear;
    if (this.state.mode === "months") {
      const { cells, headerLabel } = this.parseData(
        "months",
        this.state.months,
        currentYear - 1
      );
      this.setState({
        currentYear: currentYear - 1,
        headerLabel: headerLabel
      });
    } else {
      const { cells, headerLabel } = this.parseData(
        "years",
        this.state.months,
        currentYear - 10
      );
      this.setState({
        currentYear: currentYear - 10,
        headerLabel: headerLabel,
        cells: cells
      });
    }
  };

  openYearMode = e => {
    // this.headerLabelClicked()
    // this.yearMode()
    // this.setState({ monthView: false })
  };

  yearMode = e => {
    const { cells, headerLabel } = this.parseData(
      "years",
      this.state.months,
      this.state.currentYear
    );
    this.setState({
      cells: cells,
      headerLabel: headerLabel,
      mode: "years"
    });
  };

  cellClicked = cellValue => {
    if (this.state.mode === "years") {
      if (this.state.yearOnly) {
        this.setState(
          {
            currentYear: cellValue,
            selectedYear: cellValue
          },
          () =>
            this.props.closeModel(
              this.state.selectedMonth,
              this.state.selectedYear
            )
        );
      } else {
        const { cells, headerLabel } = this.parseData(
          "months",
          this.state.months,
          cellValue
        );
        this.setState({
          cells: cells,
          headerLabel: headerLabel,
          mode: "months",
          currentYear: cellValue
        });
      }
    } else {
      this.setState(
        {
          currentMonth: cellValue,
          selectedMonth: cellValue,
          selectedYear: this.state.currentYear
        },
        () =>
          this.props.closeModel(
            this.state.selectedMonth,
            this.state.selectedYear
          )
      );
    }
  };

  // headerLabelClicked = e => {
  //   // var visible = this.state.visible

  //   // this.setState({ visible: !visible, monthView: true })
  // }

  rightClicked = e => {
    var currentYear = this.state.currentYear;
    if (this.state.mode === "months") {
      const { cells, headerLabel } = this.parseData(
        "months",
        this.state.months,
        currentYear + 1
      );
      this.setState({
        currentYear: currentYear + 1,
        headerLabel: headerLabel
      });
    } else {
      const { cells, headerLabel } = this.parseData(
        "years",
        this.state.months,
        currentYear + 10
      );
      this.setState({
        currentYear: currentYear + 10,
        headerLabel: headerLabel,
        cells: cells
      });
    }
  };
}

class Button extends React.Component {
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
    const d = new Date();
    const currentMonth = months[d.getMonth()];
    const currentYear = d.getFullYear();
    const mode = props.mode;
    const yearOnly = props.yearOnly;
    this.state = {
      isVisible: false,
      currentMonth: currentMonth,
      currentYear: currentYear,
      mode: mode,
      yearOnly: yearOnly
    };
  }
  // <Calendar mode="months" yearOnly={false} startMonth="Jan" startYear={1996} />
  render() {
    return (
      <View>
        {this.state.isVisible && (
          <Calendar
            mode={this.state.mode}
            yearOnly={this.state.yearOnly}
            startMonth={this.state.currentMonth}
            startYear={this.state.currentYear}
            closeModel={this.closeModel}
          />
        )}
        <TouchableOpacity
          style={styles.viewButton}
          key="label"
          onPress={() => this.viewBottonClicked()}
        >
          <Text>
            {this.state.yearOnly
              ? this.state.currentYear
              : `${this.state.currentMonth} - ${this.state.currentYear}`}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.viewButton}
          key="yearlabel"
          onPress={() => this.yearButtonClicked()}
        >
          <Text>{this.state.currentYear}</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  viewBottonClicked = e => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  // yearButtonClicked = e => {
  //   this.setState({
  //     isVisible: !this.state.isVisible,
  //     yearOnly: true,
  //     mode: "years"
  //   });
  // };

  closeModel = (month, year) => {
    this.setState({
      isVisible: false,
      currentMonth: month,
      currentYear: year
    });
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // <Calendar mode="months" yearOnly={false} startMonth="Jan" startYear={1996} />
  render() {
    return (
      <View style={styles.appContainer}>
        <Button mode={"months"} yearOnly={false} />
        <Button mode={"years"} yearOnly={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  yearButton: {
    width: "30%",
    height: "20%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    alignSelf: "stretch"
  },
  monthButton: {
    width: "30%",
    height: "25%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    alignSelf: "stretch"
  },
  subContainer: {
    backgroundColor: "black",
    width: "10%",
    height: "10%",
    marginTop: "10%",
    marginLeft: "10%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 5
  },
  appContainer: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderWidth: 2
  },
  modalContainer: {
    borderWidth: 5
  },
  mainContainer: {
    backgroundColor: "white",
    width: "70%",
    height: "60%",
    marginTop: "30%",
    marginLeft: "5%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 5
  },
  cellContainer: {
    width: "100%",
    height: "80%",
    marginTop: "2%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "1%",
    alignItems: "center"
  },
  row: {
    width: "80%",
    height: "5%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    alignSelf: "stretch"
  },
  headerRow: {
    width: "100%",
    height: "20%",
    marginTop: "5%",
    marginBottom: "2%",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  footerRow: {
    width: "100%",
    height: "20%",
    marginTop: "2%",
    marginBottom: "2%",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  monthCells: {
    width: "33%",
    height: "25%",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "black",
    borderWidth: 1
  },
  headerCells: {
    marginTop: "0%",
    width: "33%",
    height: "100%",
    alignItems: "center",
    alignSelf: "stretch"
  },
  textCell: {
    marginTop: "15%"
  },
  cellText: {
    marginTop: "25%"
  },
  closeButtonText: {
    fontWeight: "bold"
  },
  closeButton: {
    marginLeft: "5%",
    width: "35%",
    height: "100%",
    borderColor: "black",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 2
  },
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
