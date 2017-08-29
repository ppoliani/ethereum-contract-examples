import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Pet from './Pet'

const isAdopted = (adopters, index) => adopters[index] !== '0x0000000000000000000000000000000000000000';
const handleAdopt = adopt => petId => adopt(petId);

const PetContainer = ({pets, adopters, adopt}) => (
  <div>
    <GridList cellHeight={180}>
      <Subheader>Pets</Subheader>
      {
        adopters.matchWith({
          Just: ({value}) => pets.map((pet, i) => <Pet
             key={i}
             pet={pet}
             isAdopted={isAdopted(value, i)}
             adopt={handleAdopt(adopt)} />),
          Nothing: () => []
        })
      }
    </GridList>
  </div>
)

export default PetContainer
