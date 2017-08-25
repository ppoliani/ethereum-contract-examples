import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Pet from './Pet'

const PetContainer = ({pets}) => (
  <div>
    <GridList cellHeight={180}>
      <Subheader>Pets</Subheader>
      {pets.map((pet, i) => <Pet key={i} pet={pet} />)}
    </GridList>
  </div>
)

export default PetContainer
