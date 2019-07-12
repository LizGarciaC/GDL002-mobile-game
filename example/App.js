import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        currentPlayer: 1,
    })
  }

  //Regresa 1 si el jugador 1 ganó, -1 si ganó el jugador 2, ó 0 si no ganó nadie.
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    // Check rows...
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //Check Columns...
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //Check Diagonals...
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //There are no winners
    return 0;
  }
//Cuando alguien selecciona alguna celda
  onTilePress = (row, col) => {
    //Evitar que la celda ya seleccionada se modifique
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }


    //Revisa el jugador que este en turno
    var currentPlayer = this.state.currentPlayer;

    //Asignación de casilla al usuario en turno
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //Cambiar el turno al siguiente usuario
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Buscamos un ganador
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Ganó el jugador 1");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("Ganó el jugador 2");
      this.initializeGame();
    }



  }
  onNewGamePress = () => {
    this.initializeGame();
  }


  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="weather-night" style={styles.tileX} />
      case -1: return <Icon name="white-balance-sunny" style={styles.tileO} />
      default: return <View />
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('./assets/gameBg.jpg')}>


        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile} >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50}} />
        <Button title="Jugar de Nuevo" onPress={this.onNewGamePress} />
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c99690',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
  },
  tileX: {
    color: "orange",
    fontSize: 85,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tileO: {
    color: "yellow",
    fontSize: 85,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }

});
