import React, { Component } from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';

const die1 = require('../assets/DiceImages/die1.png');
const die2 = require('../assets/DiceImages/die2.png');
const die3 = require('../assets/DiceImages/die3.png');
const die4 = require('../assets/DiceImages/die4.png');
const die5 = require('../assets/DiceImages/die5.png');
const die6 = require('../assets/DiceImages/die6.png');


const styles = StyleSheet.create({
  dieStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  dieHighlightStyle: {
    opacity: 0.5,
    borderColor: 'white',
    marginBottom: 25,
  },
  dieImageStyle: {
    width: 50,
    height: 50,
  },
});
class Die extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dieSelected: false,
    };
  }
  diePressed = () => {
    this.setState({ dieSelected: !this.state.dieSelected });
    this.props.onPress();
  };
  selectStyle = () => {
    if (this.state.dieSelected) {
      return [styles.dieStyle, styles.dieHighlightStyle];
    }
    return styles.dieStyle;
  }
  render() {
    return (
      <TouchableHighlight
        disabled={!!this.props.disabled}
        style={this.selectStyle()}
        onPress={this.diePressed}
      >
        <View>
          {this.props.value === 1 && <Image source={die1} style={styles.dieImageStyle} />}
          {this.props.value === 2 && <Image source={die2} style={styles.dieImageStyle} />}
          {this.props.value === 3 && <Image source={die3} style={styles.dieImageStyle} />}
          {this.props.value === 4 && <Image source={die4} style={styles.dieImageStyle} />}
          {this.props.value === 5 && <Image source={die5} style={styles.dieImageStyle} />}
          {this.props.value === 6 && <Image source={die6} style={styles.dieImageStyle} />}
        </View>
      </TouchableHighlight>
    );
  }
}

export default Die;
