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

const Calendar = (props) => {
  if (props.mode == "months") {
    var cells = props.months;
    var headerText = props.currentYear
  } else {
    var currentYear = props.currentYear
    var diff = (currentYear%10) + 1;
    var startYear = currentYear - diff;
    var lastYear = startYear + 12;
    // var cells = [...Array(13).keys()].map((i) => (startYear + i)  );
    var cells = [];

    for (var i = 0; i <= 11; i++) {
      cells.push((startYear + i));
    }
    var cells = _.chunk(cells,3);
    // var cells = [[2010,2011,2012],[2013,2014,2015],[2016,2017,2018],[2019,2020,2021]]
    var headerText = `${startYear+1} - ${lastYear-2}`
  }

  return(
  
  <View style={props.styles.subContainer}>
  
      <View style={props.styles.headerRow}>
        <TouchableOpacity onPress={() => props.leftClicked()} style={props.styles.headerCells} key="left"><Text>{"<<"}</Text></TouchableOpacity>
        <TouchableOpacity style={props.styles.headerCells} onPress={() => props.yearMode()} key="label"><Text>{headerText}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => props.rightClicked()}style={props.styles.headerCells} key="right"><Text>{">>"}</Text></TouchableOpacity>
      </View>
        {
          _.map(cells, month => {
            return <View style={styles.row}>
              {
                _.map(month, mon => {
                  return <TouchableOpacity style={props.styles.monthCells} onPress={() => props.monthClicked(mon)} key={mon}><Text>{mon}</Text></TouchableOpacity>
                })
              }
            </View>
          })

        }
      </View>
)
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var months = [["Jan", "Feb", "Mar"],
      ["Apr", "May", "Jun"],
      ["Jul","Aug", "Sep"],
      ["Oct", "Nov", "Dec"]];
    var date = new Date();
    var currentYear = date.getFullYear();
    var monthIndex = date.getMonth();
    var month = _.flatten(months)[monthIndex];

    var years = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    this.state = {
      months: months,
      yearsYear: currentYear,
      currentYear: currentYear,
      years: years,
      mode: "months",
      month: month,
      monthView: true,
      visible: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.openYearMode()} style={styles.yearButton} key="left"><Text>{this.state.yearsYear}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.monthButtonClicked()} style={styles.monthButton} key="left"><Text>{this.state.month} - {this.state.currentYear}</Text></TouchableOpacity>
        {(this.state.visible)&&<Calendar state={this} currentYear={this.state.currentYear} months={this.state.months} mode={this.state.mode}
         yearMode={this.yearMode} monthClicked={this.monthClicked} styles={styles} leftClicked={this.leftClicked} rightClicked={this.rightClicked} />}
      </View>
    );
  }

  leftClicked = e => {
    var currentYear = this.state.currentYear
    if(this.state.mode === "months"){
      this.setState({ currentYear: (currentYear - 1) })
    } else {
      this.setState({ currentYear: (currentYear - 10) })
    }
  }

  openYearMode = e => {
    this.monthButtonClicked()
    this.yearMode()
    this.setState({ monthView: false })
  }

  yearMode = e => {
    this.setState({ mode: "years" })
  }

  monthClicked = cellValue =>  {
    if(this.state.mode === "years") {
      
      if(this.state.monthView){
        this.setState({ currentYear: cellValue })
        this.setState({ mode: "months" })
      } else {
        this.setState({ yearsYear: cellValue })
        this.monthButtonClicked()
      }
    } else {
      this.setState({ month: cellValue })
      this.monthButtonClicked()
    }
  }

  monthButtonClicked = e => {
    var visible = this.state.visible

    this.setState({ visible: !visible, monthView: true })
  }

  rightClicked = e => {
    var currentYear = this.state.currentYear
    if(this.state.mode === "months"){
      this.setState({ currentYear: (currentYear + 1) })
    } else {
      this.setState({ currentYear: (currentYear + 10) })
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
    height: "100%",
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


// header: {
//   backgroundColor: 'green',
//   borderBottomWidth: 10,
//   justifyContent: 'center',
// },
// headerText: {
//   color: 'white',
//   fontSize: 18,
//   padding: 26,
// },
// scrollContainer: {
//   flex: 1,
//   marginBottom: 100,
// },
// footer: {
//   position: 'absolute',
//   alignItems: 'center',
//   bottom: 0,
//   left: 0,
//   right: 0,
// },
// addButton: {
//   justifyContent: 'center',
//   backgroundColor: 'green',
//   borderRadius: 50,
//   width: 90,
//   height: 90,
//   alignItems: 'center'
// },
// addButtonText: {
//   color: '#fff',
//   fontSize: 24,
// },
// textInput: {
//   alignSelf: 'stretch',
// },


// render() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>ToDo</Text>
//       </View>
//       {
//         <View style={styles.headerText}>
//         _.map(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"], month => {
//           return <View style={styles.headerText}><Text>month</Text></View>
//         })
//         </View>

//       }

//       <ScrollView style={styles.scrollContainer}></ScrollView>

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.addButton}>
//           <Text style={styles.addButtonText}>+</Text>
//         </TouchableOpacity>
//         <TextInput style={styles.textInput} placeholder='add your notes'></TextInput>
//       </View>
//     </View>
//   );
// }
// }


// <View style={styles.row}>
//         {
//           _.map(["Jan", "Feb", "Mar"], month => {
//             return <View style={styles.monthCells} key={month}><Text>{month}</Text></View>
//           })
//         }
//       </View>
//       <View style={styles.row}>
//         {
//           _.map(["Apr", "May", "Jun"], month => {
//             return <View style={styles.monthCells} key={month}><Text>{month}</Text></View>
//           })
//         }
//       </View>
//       <View style={styles.row}>
//         {
//           _.map(["Jul","Aug", "Sep"], month => {
//             return <View style={styles.monthCells} key={month}><Text>{month}</Text></View>
//           })
//         }
//       </View>
//       <View style={styles.row}>
//         {
//           _.map(["Oct", "Nov", "Dec"], month => {
//             return <View style={styles.monthCells} key={month}><Text>{month}</Text></View>
//           })
//         }
//       </View>

// {(this.state.visible)&&<Calendar state={this} currentYear={this.state.currentYear} months={this.state.months} mode={this.state.mode} styles={styles} />}