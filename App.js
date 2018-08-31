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
    var months = [["Jan", "Feb", "Mar"],
      ["Apr", "May", "Jun"],
      ["Jul","Aug", "Sep"],
      ["Oct", "Nov", "Dec"]];
    var currentYear = 2018;
    var years = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    this.state = {
      months: months,
      currentYear: currentYear,
      years: years,
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.subContainer}>
        {
          _.map(this.state.months, month => {
            return <View style={styles.row}>
              {
                _.map(month, mon => {
                  return <View style={styles.monthCells} key={month}><Text>{mon}</Text></View>
                })
              }
            </View>
          })

        }
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    width: 400,
    height: 400,
    marginTop: "50%",
    marginLeft: "10%",
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 5,
  },
  row: {
    width: 400,
    height: 100,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  monthCells: {
    width: "33%",
    height: "100%",
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 2,
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