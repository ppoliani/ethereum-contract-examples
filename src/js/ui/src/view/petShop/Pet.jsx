import React from 'react'
import {GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton'
import {partial} from '../../services/fn'

const Pet = ({pet, adopt, isAdopted}) => (
  <GridTile
    title={<span><b>{pet.name}</b> {pet.age}</span>}
    subtitle={<span>{pet.breed} from <b>{pet.location}</b></span>}
    actionIcon={<FlatButton label='Adopt' onClick={partial(adopt, pet.id)} disabled={isAdopted} />}>
      <img src={pet.picture} />
  </GridTile>
)

export default Pet
