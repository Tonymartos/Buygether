import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';

class ProductInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 1,
      price: 0,
    };
  }

  handleAdd = (add) => {
    const { name } = this.state;
    if (name) {
      add(this.state);
      this.setState({
        name: '',
        quantity: 1,
        price: 0,
      });
    } else {
      // TODO: send alert to the user
      console.log('empty name');
    }
  }

  render() {
    const { add } = this.props;
    const { name, quantity, price } = this.state;
    return (
      <View>
        <TextInput
          ref={(ref) => {
            this.textInput = ref;
          }}
          placeholder="Product name"
          onChangeText={newName => this.setState({ name: newName })}
          value={name}
        />
        <TextInput
          ref={(ref) => {
            this.quantityInput = ref;
          }}
          keyboardType="numeric"
          placeholder="Quantity"
          onChangeText={newQuantity => this.setState({ quantity: parseInt(newQuantity.replace(/[^0-9]/, ''), 10) })}
          value={quantity ? quantity.toString() : '0'}
        />
        <TextInput
          ref={(ref) => {
            this.priceInput = ref;
          }}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={newPrice => this.setState({ price: parseInt(newPrice.replace(/[^0-9]/, ''), 10) })}
          value={price ? price.toString() : '0'}
        />
        <Button onPress={() => this.handleAdd(add)} title="Añadir" />
      </View>
    );
  }
}

ProductInput.propTypes = {
  add: PropTypes.func,
};

export default ProductInput;
