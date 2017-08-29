import {createAction} from 'redux-actions'
import fetch from '../../services/api'
import TruffleContract from 'truffle-contract'
import AdoptionArtifact from '../contractRepository/Adoption.json'
import {partial} from '../../services/fn'
import {loadMainAccount} from '../web3/web3Actions'

export const SET_PETS = 'PETS::SET_PETS'
export const SET_ADOPTION_CONTRACT = 'PETS::SET_ADOPTION_CONTRACT'
export const SET_ADOPTION_CONTRACT_INIT_ERROR = 'PETS::SET_ADOPTION_CONTRACT_INIT_ERROR'
export const SET_ADOPTERS = 'PETS::SET_ADOPTERS'

const PET_URL = '/src/data/pet/pets.json';

export const loadPetsRoot = fetch => {
  const getUrl = () => PET_URL;

  return createAction(
    SET_PETS,
    (fetch) ['∘'] (getUrl)
  );
}

export const initContractRoot = TruffleContract => (dispatch, getState) => {
  const {web3} = getState();

  web3.get('provider')
    .matchWith({
      Just: ({value: provider}) => {
        const AdoptionContract = TruffleContract(AdoptionArtifact);
        AdoptionContract.setProvider(provider);

        dispatch(setAdoptionContract(AdoptionContract));
        dispatch(fetchAdopters());
      },
      Nothing: () => {
        dispatch(setAdoptionContractInitError('Please create a web3 provider before initializing a contract'))
      }
    });
}

export const fetchAdopters = () => (dispatch, getState) => {
  const {pet} = getState();

  pet.get('AdoptionContract')
    .matchWith({
      Just: ({value: contract}) => {
        contract.deployed()
          .then(instance => instance.getAdopters.call())
          .then((dispatch) ['∘'] (setAdopters))
          .catch(error => console.error(error))
      },
      Nothing: () => {
        dispatch(setAdoptionContractInitError('Please create a web3 provider before initializing a contract'))
      },
    })
}

export const adopt = petId => (dispatch, getState) => {
  const {web3, pet} = getState();

  const callAdopt = ({value: mainAccount}) => {
    pet.get('AdoptionContract')
      .matchWith({
        Just: ({value: contract}) => {
          contract.deployed()
            .then(instance => instance.adopt(petId, {from: mainAccount}))
            .then((dispatch) ['∘'] (fetchAdopters))
            .catch(error => console.error(error))
        },
        Nothing: () => {
          dispatch(setAdoptionContractInitError('Please create a web3 provider before initializing a contract'))
        }
      });
  }

  web3.get('mainAccount')
    .matchWith({
      Just: callAdopt,
      Nothing: () => {
        dispatch(loadMainAccount())
          .then(dispatch(adopt()))
      }
    })
}

export const setAdoptionContract = createAction(SET_ADOPTION_CONTRACT)
export const setAdoptionContractInitError = createAction(SET_ADOPTION_CONTRACT_INIT_ERROR)
export const setAdopters = createAction(SET_ADOPTERS)

export const loadPets = loadPetsRoot(fetch)
export const initContract = partial(initContractRoot, TruffleContract)
