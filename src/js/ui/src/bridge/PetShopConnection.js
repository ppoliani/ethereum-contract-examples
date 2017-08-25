import {connect} from 'react-redux'
import {loadPets} from '../data/pet/petActions'

export default PetShop => {
  const mapStateToProps = state => ({
    pet: state.pet
  });

  const mapDispatchToProps = dispatch => ({
    loadPets: (dispatch) ['∘'] (loadPets)
  });

  return connect(mapStateToProps, mapDispatchToProps)(PetShop);
}
