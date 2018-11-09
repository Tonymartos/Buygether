import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#9b59b6' title='New Contact' onPress={() => console.log('Contact added!')}>
            <Icon name="md-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

export default TestScreen;
