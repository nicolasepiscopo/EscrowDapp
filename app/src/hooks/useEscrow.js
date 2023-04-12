import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export function useEscrow (address) {
  const { data, ...rest } = useQuery({
    queryKey: ['escrow', address],
    queryFn: async () => {
      const escrowContract = new ethers.Contract(address, Escrow.abi, provider);
      const arbiter = await escrowContract.arbiter();
      const balance = (await provider.getBalance(address)).toString();
      const beneficiary = await escrowContract.beneficiary();
      const depositor = await escrowContract.depositor();
      const isApproved = await escrowContract.isApproved();

      return {
        arbiter,
        beneficiary,
        depositor,
        value: balance,
        isApproved,
      }
    },
    retry: true,
  });

  return {
    escrow: data,
    ...rest
  };
}