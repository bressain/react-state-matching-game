import React, { Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board'
import { createTiles, indexOfSelected } from '../../misc/utils'

import './App.css';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null
    }
  }
  startGame() {
    this.setState(state => ({
      playing: true,
      previousTileIndex: null,
      toBeCleared: null,
      tiles: createTiles(state.numTiles, this.handleTileClicked)
    }))
  }
  handleTileClicked(id, color) {
    this.setState(state => {
      let { tiles, toBeCleared, previousTileIndex } = state
      const selectedTileIndex = indexOfSelected(tiles, id, color)

      if (toBeCleared !== null) {
        tiles[toBeCleared[0]].selected = false
        tiles[toBeCleared[1]].selected = false
        toBeCleared = null
      }
      tiles[selectedTileIndex].selected = true
      if (previousTileIndex !== null) {
        const previousTile = tiles[previousTileIndex]
        const selectedTile = tiles[selectedTileIndex]
        if (previousTile.id !== selectedTile.id && previousTile.color === color) {
          selectedTile.matched = true
          previousTile.matched = true
        } else {
          toBeCleared = [previousTileIndex, selectedTileIndex]
        }
        previousTileIndex = null
      } else {
        previousTileIndex = selectedTileIndex
      }
      return { tiles, toBeCleared, previousTileIndex }
    })
  }
  handleNumTileChange(num) {
    this.setState({ numTiles: num, playing: false, tiles: [] })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Turbo-Matcher
        </header>
          <OptionsPanel
            handleNumTileChange={this.handleNumTileChange}
            numTiles={this.state.numTiles}
            playing={this.state.playing}
            startGame={this.startGame} />
          <Board numTiles={this.state.numTiles} tiles={this.state.tiles} />
        }
      </div>
    );

  }
}

export default App;
