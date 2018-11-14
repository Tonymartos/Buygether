import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList, Text, View, StyleSheet,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';
import { LIST_QUERY } from '../graphql/list.query';

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

const Product = ({ product: { name, quantity, price } }) => {
  const formatedPrice = `${price.toFixed(2)} €`;
  return (
    <View style={styles.list}>
      <Text>{quantity}</Text>
      <Text>{name}</Text>
      <Text>{formatedPrice}</Text>
    </View>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number,
  }),
};

class ListScreen extends Component {
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

  renderItem = ({ item }) => <Product product={item} />;

  render() {
    const { list } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        { list
        && (
        <FlatList
          data={list.products}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        ) }
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor="#9b59b6" title="New Product" onPress={() => console.log('Product added!')}>
            <Icon name="md-pricetag" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

ListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  list: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number,
      }),
    ),
  }),
};

const listQuery = graphql(LIST_QUERY, {
  options: props => ({ variables: { id: props.navigation.state.params.listId } }),
  props: ({ data: { loading, list } }) => ({
    loading,
    list,
  }),
});

export default listQuery(ListScreen);
