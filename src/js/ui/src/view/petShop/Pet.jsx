import React from 'react'
import {GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton'

const Pet = ({pet}) => (
  <GridTile
    title={<span><b>{pet.name}</b> {pet.age}</span>}
    subtitle={<span>{pet.breed} from <b>{pet.location}</b></span>}
    actionIcon={<FlatButton label='Adopt' />}>
      <img src={pet.picture} />
  </GridTile>
)

export default Pet
