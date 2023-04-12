import { useMutation } from '@tanstack/react-query';
import { ethers } from "ethers";
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';
import { useSigner } from './useSigner';

export function useApprove() {
  const { mutate, isLoading } = useMutation({
    mutationFn: approve,
  })
  const signer = useSigner();

  async function approve(escrowAddress) {
    const escrowContract = ethers.ContractFactory.getContract(escrowAddress, Escrow.abi, signer);
    const approveTxn = await escrowContract.connect(signer).approve();
    await approveTxn.wait();
  }

  return [mutate, { isLoading }];
}