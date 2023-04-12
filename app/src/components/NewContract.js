import { ethers } from "ethers";
import { useState } from "react";
import axios from "axios";
import deploy from "../scripts/deploy";
import { useSigner } from "../hooks/useSigner";

import './NewContract.css';

export function NewContract () {
  const [arbiter, setArbiter] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [eth, setEth] = useState('');
  const signer = useSigner();

  function cleanup() {
    setArbiter('');
    setBeneficiary('');
    setEth('');
  }

  async function newContract() {
    const value = ethers.utils.parseEther(eth);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    try {
      await axios.post(process.env.REACT_APP_API_URL, {
        address: escrowContract.address,
      });
      cleanup();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className="contract">
      <h1> New Contract </h1>
      <label>
        Arbiter Address
        <input type="text" id="arbiter" value={arbiter} onChange={e => setArbiter(e.target.value)} />
      </label>

      <label>
        Beneficiary Address
        <input type="text" id="beneficiary" value={beneficiary} onChange={e => setBeneficiary(e.target.value)} />
      </label>

      <label>
        Deposit Amount (in ETH)
        <input type="text" id="eth" value={eth} onChange={e => setEth(e.target.value)} />
      </label>

      <div
        className="button"
        id="deploy"
        onClick={(e) => {
          e.preventDefault();

          newContract();
        }}
      >
        Deploy
      </div>
    </div>
  );
}
