import React, { Component } from 'react'
import PetShopConnection from '../../bridge/PetShopConnection'
import Spinner from '../common/Spinner'
import PetContainer from '../petShop/PetContainer'

class PetShopPage extends Component {
  componentDidMount() {
    const {loadPets, initWeb3, initContract, loadMainAccount, adopt} = this.props;

    loadPets();
    initWeb3();
    initContract();
    loadMainAccount();
  }

  renderPetContainer() {
    const {pet, adopt} = this.props;

    return pet.get('list').matchWith({
      Empty: () => null,
      Loading: () => <Spinner />,
      Success: ({data: pets}) => (
        <PetContainer
          pets={pets}
          adopters={pet.get('adopters')}
          adopt={adopt} />
      ),
      Failure: () => null
    });
  }

  render() {
    return this.renderPetContainer();
  }
}

export default PetShopConnection(PetShopPage)
