import R from 'ramda';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, Text, TouchableHighlight, View,
} from 'react-native';

const fakeGroups = R.times(i => ({ name: 'group ' + i, id: i }), 10);

const Group = ({ group: { name } }) => (
  <TouchableHighlight>
    <View>
      <Text>{name}</Text>
    </View>
  </TouchableHighlight>
);

Group.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
  }),
};

class Groups extends Component {
  renderItem = ({ item }) => <Group group={item} />;

  keyExtractor = ({ id }) => id.toString();

  render() {
    return (
      <View>
        <FlatList data={fakeGroups} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default Groups;
