import {createAction} from 'redux-actions'
import fetch from '../../services/api'
import TruffleContract from 'truffle-contract'
import AdoptionArtifact from '../contractRepository/Adoption.json'


export const SET_PETS = 'PETS::SET_PETS';
export const SET_ADOPTION_CONTRACT = 'PETS::SET_ADOPTION_CONTRACT';
export const SET_ADOPTION_CONTRACT_INIT_ERROR = 'PETS::SET_ADOPTION_CONTRACT_INIT_ERROR';

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

        dispatch(setAdoptionContract(AdoptionContract))
      },
      Nothing: () => {
        dispatch(setAdoptionContractInitError('Please create a web3 provider before initializing a contract'))
      }
    });
}

export const setAdoptionContract = createAction(SET_ADOPTION_CONTRACT);
export const setAdoptionContractInitError = createAction(SET_ADOPTION_CONTRACT_INIT_ERROR);

export const loadPets = loadPetsRoot(fetch)
export const initContract = initContractRoot(TruffleContract)
