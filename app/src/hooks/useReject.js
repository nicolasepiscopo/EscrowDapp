import { useMutation } from '@tanstack/react-query';
import { ethers } from "ethers";
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';
import { useSigner } from './useSigner';

export function useReject() {
  const { mutate, isLoading } = useMutation({
    mutationFn: reject,
  })
  const signer = useSigner();

  async function reject(escrowAddress) {
    const escrowContract = ethers.ContractFactory.getContract(escrowAddress, Escrow.abi, signer);
    const rejectTxn = await escrowContract.connect(signer).reject();
    await rejectTxn.wait();
  }

  return [mutate, { isLoading }];
}