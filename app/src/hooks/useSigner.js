import { ethers } from "ethers";

export function useSigner () {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  return provider.getSigner();
}