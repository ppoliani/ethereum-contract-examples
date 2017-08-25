import {Map, fromJS} from 'immutable'
import {handleActions} from 'redux-actions'
import Maybe from 'folktale/maybe'
import {SET_PETS, SET_ADOPTION_CONTRACT, SET_ADOPTION_CONTRACT_INIT_ERROR} from './petActions'
import AsyncData from '../core/AsyncData'

const handleSetPets = (state, action) => state.set('list', fromJS(action.payload));
const handleSetAdoptionContract = (state, action) => state.set('AdoptionContract', Maybe.fromNullable(action.payload));
const handleSetAdoptionContractError = (state, action) => state.set('adoptionContractError', Maybe.fromNullable(action.payload));

const PetsData = Map({
  list: AsyncData.Empty(),
  AdoptionContract: Maybe.Nothing(),
  adoptionContractError: Maybe.Nothing()
});

export default handleActions({
  [SET_PETS]: handleSetPets,
  [SET_ADOPTION_CONTRACT]: handleSetAdoptionContract,
  [SET_ADOPTION_CONTRACT_INIT_ERROR]: handleSetAdoptionContractError
}, PetsData);
