import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, Text, TouchableHighlight, View,
} from 'react-native';
import { graphql } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';


const Group = ({ group: { name }, onGroupPress }) => (
  <TouchableHighlight onPress={onGroupPress} underlayColor='rgba(100, 200, 255, 0.3)'>
    <View>
      <Text>{name}</Text>
    </View>
  </TouchableHighlight>
);

Group.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
  }),
  onGroupPress: PropTypes.func,
};

class Groups extends Component {
  renderItem = ({ item }) => <Group group={item} />;

  keyExtractor = ({ id }) => id.toString();

  onGroupPress = group => () => {
    const {
      navigation: { navigate },
    } = this.props;
    console.log(group.name);
    navigate('Test', { title: 'group.name' });
  };

  renderItem = ({ item }) => <Group group={item} onGroupPress={this.onGroupPress(item)} />;

  render() {
    const { user } = this.props;
    return (
      <View>
        {user && (
        <FlatList
          data={user.groups}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        )}
      </View>
    );
  }
}

Groups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  user: PropTypes.shape({
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ),
  }),
};

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

export default userQuery(Groups);
