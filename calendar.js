import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  $rem: 1.08270676692
});

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const { yearOnly, onSelect, date } = props;
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const mode = yearOnly ? "years" : "months";
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

  getDate = (year, month) => {
    return new Date(year, _.indexOf(this.state.months, month), 1);
  };

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
        transparent={true}
        visible={true}
        onRequestClose={() => null}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => this.leftArrowClicked()}
              style={styles.headerArrowCells}
              key="left"
            >
              <Icon name='chevron-double-left' style={styles.arrowIcon}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerLabelCell}
              onPress={() => this.headerLabelClicked()}
              key="label"
            >
              <Text style={styles.textCell}>{this.state.headerLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.rightArrowClicked()}
              style={styles.headerArrowCells}
              key="right"
            >
              <Icon name='chevron-double-right' style={styles.arrowIcon}/>
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
              const bColor = isActive ? "#686678" : "#dee3ea";
              const fColor = isActive ? "white" : "#686678";

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
                this.props.onSelect(
                  this.getDate(
                    this.state.selectedYear,
                    this.state.selectedMonth
                  )
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

  leftArrowClicked = e => {
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

  headerLabelClicked = e => {
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
            this.props.onSelect(
              this.getDate(this.state.selectedYear, this.state.selectedMonth)
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
          this.props.onSelect(
            this.getDate(this.state.selectedYear, this.state.selectedMonth)
          )
      );
    }
  };

  rightArrowClicked = e => {
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

Calendar.defaultProps = {
  date: new Date()
};

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  yearOnly: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

const styles = EStyleSheet.create({
  mainContainer: {
    backgroundColor: "#dee3ea",
    width: "75%",
    aspectRatio: 0.9,
    padding: "1%",
    flexDirection: "column",
    marginTop: "30%",
    marginLeft: "12%",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1
  },
  cellContainer: {
    aspectRatio: 1.3,
    padding: "4%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerRow: {
    aspectRatio: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  footerRow: {
    width: "100%",
    aspectRatio: 6,
    flexDirection: "row",
  },
  monthCells: {
    width: "25%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerArrowCells: {
    justifyContent: "center",
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  headerLabelCell: {
    justifyContent: "center",
    flex: 3,
    height: "100%",
    alignItems: "center",
  },
  textCell: {
    fontWeight: "bold",
    fontSize: '16rem',
    color: "#686678"
  },
  arrowIcon: {
    fontSize: '16rem',
    color: "#686678"
  },
  cellText: {
    fontSize: '16rem',
    fontWeight: "bold",
  },
  closeButtonText: {
    fontSize: '16rem',
    color: "#f5f5f5",
    fontWeight: "bold"
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#686678",
    width: "30%",
    height: "85%",
    marginLeft: "70%",
    borderRadius: 50,
  }
});
