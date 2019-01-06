import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { yearOnly, closeModel,date } = props;
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

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const mode = yearOnly ? "years" : "months"
    const { cells, headerLabel } = this.parseData(mode, months, year);
    this.state = {
      mode: mode,
      cells: cells,
      months: months,
      headerLabel: headerLabel,
      yearOnly: yearOnly,
      currentYear: year,
      currentMonth: month,
      selectedYear: year,
      selectedMonth: month
    };
  }

  getDate = (year,month) => {
    return new Date(year,_.indexOf(this.state.months, month),1)
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
          <View style={styles.cellContainer}>
            {_.map(this.state.cells, cell => {
              const selectedYear = this.state.selectedYear;
              const selectedMonth = this.state.selectedMonth;
              let isActive = false;
              if (this.state.mode == "years") {
                isActive = selectedYear == cell;
              } else {
                isActive =
                  selectedYear == this.state.currentYear &&
                  selectedMonth == cell;
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
                  this.getDate(this.state.selectedYear,this.state.selectedMonth)
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
              this.getDate(this.state.selectedYear,this.state.selectedMonth)
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
            this.getDate(this.state.selectedYear,this.state.selectedMonth)
          )
      );
    }
  };

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

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  yearOnly: PropTypes.bool,
  closeModel: PropTypes.func.isRequired,
}

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
            date = {this.state.date}
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
            {`${this.state.months[this.state.date.getMonth()]} ${this.state.date.getFullYear()}`}
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
  closeModel = (date) => {
    this.setState({
      isVisible: false,
      date: date,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
  modalContainer: {
    borderWidth: 5
  },
  mainContainer: {
    backgroundColor: "white",
    width: "75%",
    height: "66%",
    marginTop: "30%",
    marginLeft: "5%",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1
  },
  cellContainer: {
    width: "90%",
    height: "80%",
    margin: "1%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "1%",
    alignItems: "center"
  },
  headerRow: {
    width: "90%",
    height: "15%",
    margin: "4%",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
  },
  footerRow: {
    width: "100%",
    height: "15%",
    margin: "1%",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  monthCells: {
    width: "31%",
    height: "22%",
    margin: "1%",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: "#bec0c4",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    }
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
    marginTop: "12%",
    marginBottom: "12%",
    alignItems: "center",
  },
  closeButtonText: {
    marginLeft: "15%",
    marginBottom: "5%",
    marginTop: "5%",
    fontWeight: "bold"
  },
  closeButton: {
    margin: "2%",
    width: "35%",
    height: "85%",
    borderRadius: 50,
    borderColor: "black",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1
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
