import React from 'react';
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ToDo</Text>
        </View>

        <ScrollView style={styles.scrollContainer}></ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput style={styles.textInput} placeholder='add your notes'></TextInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'green',
    borderBottomWidth: 10,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 50,
    width: 90,
    height: 90,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  textInput: {
    alignSelf: 'stretch',
  },
});
