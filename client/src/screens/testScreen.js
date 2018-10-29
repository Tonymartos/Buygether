import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
class TestScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam('title', 'title not found'),
      headerStyle: {
        backgroundColor: '#4286f4',
      },
      headerTintColor: '#fff',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>cosas</Text>
      </View>
    );
  }
}

export default TestScreen;
