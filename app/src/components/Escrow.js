import { useApprove } from "../hooks/useApprove";
import { useEscrow } from "../hooks/useEscrow";
import { useReject } from "../hooks/useReject";

import './Escrow.css';

export function Escrow({
  address,
}) {
  const {
    escrow,
  } = useEscrow(address);
  const [approve, { isLoading: isApproving }] = useApprove();
  const [reject, { isLoading: isRejecting }] = useReject();

  const {
    arbiter,
    beneficiary,
    value,
    isApproved,
  } = escrow ?? {};
  const isRejected = !isApproved && value === '0';

  return (
    <div className="existing-contract">
      <ul className="fields">
        {!escrow && (
          <li>
            <div> Loading escrow ({address}) please wait... </div>
          </li>
        )}
        {escrow && (
          <>
            <li>
              <div> Arbiter </div>
              <div> {arbiter} </div>
            </li>
            <li>
              <div> Beneficiary </div>
              <div> {beneficiary} </div>
            </li>
            {!isApproved && (
              <li>
                <div> Value </div>
                <div> {value/10**18} ETH</div>
              </li>
            )}
            {isApproved && (
              <div className="approved">
                ✅ Approved
              </div>
            )}
            {isRejected && (
              <div className="rejected">
                ❌ Rejected
              </div>
            )}
            {!isApproved && !isRejected && (
              <div
                className="button"
                onClick={async (e) => {
                  e.preventDefault();

                  if (!isApproving) {
                    await approve(address);
                  }
                }}
              >
                Approve
              </div>
            )}
            {!isApproved && !isRejected && (
              <div
                className="button"
                onClick={async (e) => {
                  e.preventDefault();

                  if (!isRejecting || !isApproving) {
                    await reject(address);
                  }
                }}
              >
                Reject
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
