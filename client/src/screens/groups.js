import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, Text, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  group: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
});

const Group = ({ group: { name }, onGroupPress }) => (
  <TouchableHighlight style={styles.group} onPress={onGroupPress} underlayColor='rgba(100, 200, 255, 0.3)'>
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
  keyExtractor = ({ id }) => id.toString();

  onGroupPress = group => () => {
    const {
      navigation: { navigate },
    } = this.props;
    console.log(group.name);
    navigate('Group', { title: group.name, groupId: group.id });
  };

  renderItem = ({ item }) => <Group group={item} onGroupPress={this.onGroupPress(item)} />;

  render() {
    const { user } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        {user && (
          <FlatList
            data={user.groups}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        )}
        <ActionButton buttonColor='rgba(231,76,60,1)'>
          <ActionButton.Item buttonColor='#9b59b6' title='New Group' onPress={() => console.log('Group added!')}>
            <Icon name="md-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
