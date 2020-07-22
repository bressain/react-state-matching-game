import React from 'react'

import './Tile.css'

const Tile = props => {
  const selectedOrMatched = props.selected || props.matched
  const styles = selectedOrMatched ? { backgroundColor: props.color } : null
  return (
    <div className='Tile' style={styles} onClick={() => props.handleTileClicked(props.id, props.color)}>
      {selectedOrMatched ? <props.svg /> : null}
    </div>
  )
}

export default Tile
