import {Map} from 'immutable'
import {handleActions} from 'redux-actions'
import {SEND_PROOF_ACTION, GET_PROOF_INFO_ACTION} from './proofActions'
import AsyncData from '../core/AsyncData'

const ProofData = Map({
  sendProofResult: AsyncData.Empty(),
  proofInfo: AsyncData.Empty(),
});

const handleSendProofResult = (state, action) => state.set('sendProofResult', action.payload);
const handleSetProofInfo = (state, action) => state.set('proofInfo', action.payload);

export default handleActions({
  [SEND_PROOF_ACTION]: handleSendProofResult,
  [GET_PROOF_INFO_ACTION]: handleSetProofInfo
}, ProofData);
