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
    add(this.state);
    this.textInput.clear();
  }

  render() {
    const { add } = this.props;
    return (
      <View>
        <TextInput
          ref={(ref) => {
            this.textInput = ref;
          }}
          placeholder="Product name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          ref={(ref) => {
            this.quantityInput = ref;
          }}
          placeholder="Quantity"
          onChangeText={quantity => this.setState({ quantity })}
        />
        <TextInput
          ref={(ref) => {
            this.priceInput = ref;
          }}
          placeholder="Price"
          onChangeText={price => this.setState({ price })}
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
