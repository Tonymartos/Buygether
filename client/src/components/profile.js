import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { graphql } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  profile: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 15,
    borderColor: 'rgba(0,0,0, 0.5)',
  },
  profilepic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  name: {
    marginTop: 20,
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  pos: {
    fontSize: 18,
    color: '#0fff',
    fontWeight: '300',
    fontStyle: 'italic',
  },
});

class ProfileScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam('title', 'Profile'),
    };
  }

  render() {
    return (
      <ImageBackground style={styles.headerBackground} source={require('../images/headerbg.jpg')}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Image style={styles.profilepic} source={require('../images/profilepic.jpg')} />
          </View>
          <Text style={styles.name}>Lindsay30</Text>
          <Text style={styles.pos}>Tyreek.Langosh@hotmail.com</Text>
        </View>
      </ImageBackground>
    );
  }
}

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 3 } }),
  props: ({ data: { user } }) => ({
    user,
  }),
});

export default userQuery(ProfileScreen);
