import {connect} from 'react-redux';
import {sendProof, getProofInfo} from '../data/proof/proofActions'

export default Proof => {
  const mapStateToProps = state => ({
    proof: state.proof
  })

  const mapDispatchToProps = dispatch => ({
    sendProof: (dispatch) ['∘'] (sendProof),
    getProofInfo: (dispatch) ['∘'] (getProofInfo)
  });

  return connect(mapStateToProps, mapDispatchToProps)(Proof);
}
