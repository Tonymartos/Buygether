import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../components/profile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
class TestScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam('title', 'Profile'),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    );
  }
}

export default TestScreen;
