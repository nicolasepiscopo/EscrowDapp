import { Escrow } from './Escrow';
import { useEscrows } from "../hooks/useEscrows";

import './ExistingContracts.css';

export function ExistingContracts() {
  const {escrows = [], isLoading, error } = useEscrows();

  if (isLoading || error) return null;

  return (
    <div className="existing-contracts">
      <h1> Existing Contracts </h1>

      <div id="container">
        {escrows.toReversed().map((escrow) => (
          <Escrow key={escrow.id} address={escrow.address} />
        ))}
        {escrows.length === 0 && (
          <div className="no-contracts">
            <h2> No contracts yet! </h2>
          </div> 
        )}
      </div>
    </div>
  )
}