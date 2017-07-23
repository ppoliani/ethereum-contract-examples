import React, { Component } from 'react'
import ProofForm from '../proof/ProofForm'
import ProofConnection from '../../bridge/ProofConnection'
import Spinner from '../common/Spinner'

class ProofPage extends Component {
  renderOwnerBox(owner) {
    return (
      <div>
        This file belongs to: {owner || 'Nobody'}
      </div>
    )
  }

  renderProofInfo() {
    return this.props.proof.get('proofInfo').matchWith({
      Empty: () => null,
      Loading: () => <Spinner />,
      Success: ({data: {details: [_, owner]}}) => {
        return <div>{this.renderOwnerBox(owner)}</div>
      },
      Failure: () => null
    });
  }

  render() {
    const {proof, sendProof, getProofInfo} = this.props;

    return (
      <div className='page'>
        <ProofForm
          onSendProof={sendProof}
          onGetInfo={getProofInfo} />
        {this.renderProofInfo()}
      </div>
    );
  }
}

export default ProofConnection(ProofPage)
