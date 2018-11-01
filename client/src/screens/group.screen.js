import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, Text, TouchableHighlight, View, StyleSheet,
} from 'react-native';
import { graphql } from 'react-apollo';
import { GROUP_QUERY } from '../graphql/group.query';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
});

const List = ({ list: { name }, onListPress }) => (
  <TouchableHighlight style={styles.list} onPress={onListPress} underlayColor="rgba(100, 200, 255, 0.3)">
    <View>
      <Text>{name}</Text>
    </View>
  </TouchableHighlight>
);

List.propTypes = {
  onListPress: PropTypes.func,
  list: PropTypes.shape({
    name: PropTypes.string,
  }),
};

class GroupScreen extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam('title', 'title not found'),
      headerStyle: {
        backgroundColor: '#4286f4',
      },
      headerTintColor: '#fff',
    };
  }

  keyExtractor = ({ id }) => id.toString();

  onListPress = list => () => {
    const {
      navigation: { navigate },
    } = this.props;
    console.log(list.name);
    navigate('List', { title: list.name, listId: list.id });
  };

  renderItem = ({ item }) => <List list={item} onListPress={this.onListPress(item)} />;

  render() {
    const { group } = this.props;
    return (
      <View>
        { group
        && (
        <FlatList
          data={group.lists}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        ) }
      </View>
    );
  }
}

GroupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  group: PropTypes.shape({
    lists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    ),
  }),
};

const groupQuery = graphql(GROUP_QUERY, {
  options: props => ({ variables: { id: props.navigation.state.groupId } }),
  props: ({ data: { loading, group } }) => ({
    loading,
    group,
  }),
});

export default groupQuery(GroupScreen);
