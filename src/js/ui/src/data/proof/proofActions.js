import {createAction} from 'redux-actions'
import fetch from '../../services/api'

export const SEND_PROOF_ACTION = 'PROOF::SEND_PROOF_ACTION';
export const GET_PROOF_INFO_ACTION = 'PROOF::GET_PROOF_INFO_ACTION';

const PROOF_URL = 'http://localhost:5000/proof';

export const sendProofRoot = fetch => {
  const getUrl = ({fileHash, owner}) => `${PROOF_URL}/send-transaction?filehash=${fileHash}&owner=${owner}`
  const fetchData = (fetch) ['∘'] (getUrl);

  return createAction(
    SEND_PROOF_ACTION,
    fetchData
  );
}

export const getProofInfoRoot = fetch => {
  const getUrl = fileHash => `${PROOF_URL}/info?filehash=${fileHash}`;
  const fetchData = (fetch) ['∘'] (getUrl);

  return createAction(
    GET_PROOF_INFO_ACTION,
    fetchData
  );
}

export const sendProof = sendProofRoot(fetch)
export const getProofInfo = getProofInfoRoot(fetch)
