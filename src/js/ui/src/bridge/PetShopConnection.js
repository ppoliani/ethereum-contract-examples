import {connect} from 'react-redux'
import {loadPets, initContract} from '../data/pet/petActions'
import {initWeb3} from '../data/web3/web3Actions'

export default PetShop => {
  const mapStateToProps = state => ({
    pet: state.pet
  });

  const mapDispatchToProps = dispatch => ({
    loadPets: (dispatch) ['∘'] (loadPets),
    initWeb3: (dispatch) ['∘'] (initWeb3),
    initContract: (dispatch) ['∘'] (initContract),
  });

  return connect(mapStateToProps, mapDispatchToProps)(PetShop);
}
