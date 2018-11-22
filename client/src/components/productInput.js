import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';

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
    const { add, close } = this.props;
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
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          buttonText="x"
          size={25}
          verticalOrientation="down"
          offsetY={-40}
          offsetX={15}
          onPress={close}
        />
        <Button onPress={() => this.handleAdd(add)} title="Añadir" />
      </View>
    );
  }
}

ProductInput.propTypes = {
  add: PropTypes.func,
  close: PropTypes.func,
};

export default ProductInput;
