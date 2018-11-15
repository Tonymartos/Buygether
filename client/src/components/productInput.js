import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';

class ProductInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // quantity: 1,
      // price: 0,
    };
  }

  add = () => {
    console.log(this.state);
    this.textInput.clear();
  }

  render() {
    return (
      <View>
        <TextInput
          ref={(ref) => {
            this.textInput = ref;
          }}
          placeholder="Product name"
          onChangeText={text => this.setState({ name: text })}
        />
        <Button onPress={this.add} title="Añadir" />
      </View>
    );
  }
}

export default ProductInput;
