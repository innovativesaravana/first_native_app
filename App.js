import React from 'react';
import _ from "lodash";
import { 
  StyleSheet,
  Text,
  View,
  ScrollView,
  AppRegistry,
  TouchableOpacity,
  TextInput  
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const mode = "months"
    const yearOnly = false
    const year = 2018
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun","Jul","Aug", "Sep","Oct", "Nov", "Dec"]
    const { cells, headerLabel } = this.parseData(mode, months, year)
    this.state = {
      mode: mode,
      cells: cells,
      months: months,
      headerLabel: headerLabel,
      currentYear: year,
      currentMonth: "Jan",
      selectedYear: year,
      selectedMonth: "Jan",
    };
  }

  parseData = (mode, months, year) => {
    let cells, headerLabel;
    if(mode === "months") {
      cells = months;
      headerLabel = year
    } else {
      const diff = (year%10) + 1;
      const startYear = year - diff;
      const lastYear = startYear + 13;
      cells = [];
      for (var i = 0; i <= 11; i++) {
        cells.push((startYear + i));
      }
      headerLabel = `${startYear+1} - ${lastYear-2}`
    }
    return { cells, headerLabel};
  }

  render() {
    return (
      <View style={styles.subContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => this.leftClicked()} style={styles.headerCells} key="left"><Text>{"<<"}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.headerCells} onPress={() => this.yearMode()} key="label"><Text>{this.state.headerLabel}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.rightClicked()}style={styles.headerCells} key="right"><Text>{">>"}</Text></TouchableOpacity>
        </View>
        <Text>{this.state.currentMonth} - {this.state.currentYear}</Text>
        <View style={styles.cellContainer}>
        {
          _.map(this.state.cells, cell => {
            return <TouchableOpacity style={styles.monthCells} onPress={() => this.cellClicked(cell)} key={cell}><Text>{cell}</Text></TouchableOpacity>
          })
        }
        </View>
      </View>
    );
  }

  leftClicked = e => {
    var currentYear = this.state.currentYear
    if(this.state.mode === "months"){
      const { cells, headerLabel } = this.parseData("months", this.state.months, (currentYear - 1))
      this.setState({
        currentYear: (currentYear - 1),
        headerLabel: headerLabel
       })
    } else {
      const { cells, headerLabel } = this.parseData("years", this.state.months, (currentYear - 10))
      this.setState({
        currentYear: (currentYear - 10),
        headerLabel: headerLabel,
        cells: cells
      })
    }
  }

  openYearMode = e => {
    // this.headerLabelClicked()
    // this.yearMode()
    // this.setState({ monthView: false })
  }

  yearMode = e => {
    const { cells, headerLabel } = this.parseData("years", this.state.months, this.state.currentYear)
    this.setState({
      cells: cells,
      headerLabel: headerLabel,
      mode: "years"
    })
  }

  cellClicked = cellValue =>  {
    if(this.state.mode === "years") {
      const { cells, headerLabel } = this.parseData("months", this.state.months, cellValue)
      this.setState({
        cells: cells,
        headerLabel: headerLabel,
        mode: "months",
        currentYear: cellValue
      })
    } else {
      this.setState({ currentMonth: cellValue })
    }
  }

  // headerLabelClicked = e => {
  //   // var visible = this.state.visible

  //   // this.setState({ visible: !visible, monthView: true })
  // }

  rightClicked = e => {
    var currentYear = this.state.currentYear
    if(this.state.mode === "months"){
      const { cells, headerLabel } = this.parseData("months", this.state.months, (currentYear + 1))
      this.setState({
        currentYear: (currentYear + 1),
        headerLabel: headerLabel
       })
    } else {
      const { cells, headerLabel } = this.parseData("years", this.state.months, (currentYear + 10))
      this.setState({
        currentYear: (currentYear + 10),
        headerLabel: headerLabel,
        cells: cells
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  monthButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  subContainer: {
    width: 300,
    height: 330,
    marginTop: 50,
    marginLeft: "10%",
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 5,
  },
  cellContainer: {
    width: 300,
    height: 280,
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: "10%",
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 5,
  },
  row: {
    width: 200,
    height: 50,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  headerRow: {
    width: 300,
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  monthCells: {
    width: "33%",
    height: "20%",
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
  },
  headerCells: {
    width: "33%",
    height: "100%",
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
