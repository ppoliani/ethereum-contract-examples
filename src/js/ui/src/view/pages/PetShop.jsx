import React, { Component } from 'react'
import PetShopConnection from '../../bridge/PetShopConnection'
import Spinner from '../common/Spinner'
import PetContainer from '../petShop/PetContainer'

class PetShopPage extends Component {
  componentDidMount() {
    this.props.loadPets();
  }

  renderPetContainer() {
    return this.props.pet.get('list').matchWith({
      Empty: () => null,
      Loading: () => <Spinner />,
      Success: ({data: pets}) => (
        <PetContainer pets={pets}/>
      ),
      Failure: () => null
    });
  }

  render() {
    return this.renderPetContainer();
  }
}

export default PetShopConnection(PetShopPage)
