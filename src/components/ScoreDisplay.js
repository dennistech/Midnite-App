import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tallyText: {
    fontSize: 125,
    fontWeight: 'bold',
    color: 'dodgerblue',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 5,
      height: 5,
    },
    textShadowRadius: 5,
  },
});

const ScoreDisplay = ({
  totalScore,
  oneQualify,
  fourQualify,
  gameStarted,
  diceRemaining,
}) => {
  return (
    <View style={styles.container}>
      { (!oneQualify || !fourQualify) && gameStarted && diceRemaining === 0
        ?
          <Text style={styles.tallyText}>D N Q</Text>
        :
          <Text style={[styles.tallyText, { fontSize: 200 }]}>{totalScore}</Text>
      }
    </View>
  );
};

export default ScoreDisplay;
