import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import Die from './Die';
import ScoreDisplay from './ScoreDisplay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgrey',
  },
  scoreContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  diceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  qualifyContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  qualifyText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textShadowColor: 'dodgerblue',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  qualifiedDice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 75,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  buttonStyle: {
    height: 100,
    width: 100,
  },
});

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialDice: {
        die1: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die1: {
                  ...this.state.dice.die1,
                  selected: !this.state.dice.die1.selected,
                },
              },
            });
          },
        },
        die2: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die2: {
                  ...this.state.dice.die2,
                  selected: !this.state.dice.die2.selected,
                },
              },
            });
          },
        },
        die3: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die3: {
                  ...this.state.dice.die3,
                  selected: !this.state.dice.die3.selected,
                },
              },
            });
          },
        },
        die4: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die4: {
                  ...this.state.dice.die4,
                  selected: !this.state.dice.die4.selected,
                },
              },
            });
          },
        },
        die5: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die5: {
                  ...this.state.dice.die5,
                  selected: !this.state.dice.die5.selected,
                },
              },
            });
          },
        },
        die6: {
          value: null,
          selected: false,
          disabled: true,
          onPress: () => {
            this.setState({
              dice: {
                ...this.state.dice,
                die6: {
                  ...this.state.dice.die6,
                  selected: !this.state.dice.die6.selected,
                },
              },
            });
          },
        },
      },
      dice: {},
      gameStarted: false,
      oneQualify: false,
      fourQualify: false,
      scoreArray: [0],
      totalScore: 0,
    };
  }
  rollDie = () => Math.floor(Math.random() * 6) + 1;
  rollDice = () => {
    const { dice, scoreArray, gameStarted } = this.state;
    let aDieSelected = false;
    let remainingDice = {};
    Object.keys(dice).forEach((key) => {
      if (this.state.dice[key].selected) {
        scoreArray.push(dice[key].value);
        aDieSelected = true;
      } else {
        remainingDice = {
          ...remainingDice,
          [key]: {
            ...this.state.dice[key],
            value: this.rollDie(),
            disabled: false,
          },
        };
      }
    });
    if (aDieSelected || !gameStarted) {
      this.setState({ ...this.state.dice, dice: remainingDice, scoreArray });
    }
    if (!gameStarted) this.setState({ gameStarted: true });
    this.calculateScore();
  }
  startGame = () => {
    this.setState({
      dice: this.state.initialDice,
      gameStarted: false,
      oneQualify: false,
      fourQualify: false,
      scoreArray: [0],
      totalScore: 0,
    });
  };
  displayDice = () => {
    const { dice } = this.state;
    const diceComponents = [];
    Object.keys(dice).forEach((key) => {
      diceComponents.push(<Die
        value={dice[key].value}
        key={key}
        disabled={dice[key].disabled}
        onPress={dice[key].onPress}
      />);
    });
    return diceComponents;
  }
  calculateScore = () => {
    let total = 0;
    total += this.state.scoreArray.reduce((acc, curr) => acc + curr);
    if (this.state.scoreArray.includes(1)) {
      total -= 1;
      this.setState({ oneQualify: true });
    }
    if (this.state.scoreArray.includes(4)) {
      total -= 4;
      this.setState({ fourQualify: true });
    }

    this.setState({ totalScore: total });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scoreContainer}>
          <ScoreDisplay
            totalScore={this.state.totalScore}
            oneQualify={this.state.oneQualify}
            fourQualify={this.state.fourQualify}
            gameStarted={this.state.gameStarted}
            diceRemaining={Object.keys(this.state.dice).length}
          />
        </View>
        <View style={styles.diceContainer}>
          {this.displayDice()}
        </View>
        <View style={styles.qualifyContainer}>
          <Text style={styles.qualifyText}>Qualifiers</Text>
          <View style={styles.qualifiedDice}>
            {this.state.oneQualify && <Die value={1} disabled />}
            {this.state.fourQualify && <Die value={4} disabled />}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          { Object.keys(this.state.dice).length === 0
            ?
              <View style={styles.buttonStyle}>
                <Button backgroundColor="navy" fontColor="oldlace" onPress={this.startGame}>
                  Start
                </Button>
              </View>
            :
              <View style={styles.buttonStyle}>
                <Button backgroundColor="dodgerblue" fontColor="black" onPress={this.rollDice}>
                  Roll
                </Button>
              </View>
          }
        </View>
      </View>
    );
  }
}

export default GameScreen;
