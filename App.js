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
      <Modal style={styles.modalContainer} transparent={true}>
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
              return (
                <TouchableOpacity
                  style={styles.monthCells}
                  onPress={() => this.cellClicked(cell)}
                  key={cell}
                >
                  <Text style={styles.cellText}>{cell}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.closeModel()}
            key="label"
          >
            <Text style={styles.textCell}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

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
        this.setState({
          currentYear: cellValue,
          selectedYear: cellValue
        });
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
      this.setState({
        currentMonth: cellValue,
        selectedMonth: cellValue,
        selectedYear: this.state.currentYear
      });
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }
  // <Calendar mode="months" yearOnly={false} startMonth="Jan" startYear={1996} />
  render() {
    return (
      <View>
        {this.state.isVisible && (
          <Calendar
            mode="months"
            yearOnly={false}
            startMonth="Jan"
            startYear={1996}
            closeModel={this.closeModel}
          />
        )}
        <TouchableOpacity
          style={styles.viewButton}
          key="label"
          onPress={() => this.viewBottonClicked()}
        >
          <Text>Show Calendar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  viewBottonClicked = e => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  closeModel = e => {
    this.setState({
      isVisible: false
    });
  };
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
    height: "10%",
    marginTop: "5%",
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
    width: "33%",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  textCell: {
    marginTop: "15%"
  },
  cellText: {
    marginTop: "25%"
  },
  closeButton: {
    marginBottom: "2%",
    width: "15%",
    height: "8%",
    borderColor: "black",
    borderWidth: 2
  },
  viewButton: {
    width: "33%",
    height: "20%",
    marginTop: "10%",
    alignItems: "center",
    alignSelf: "stretch"
  }
});
