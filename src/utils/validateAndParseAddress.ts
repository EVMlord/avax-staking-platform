import invariant from "tiny-invariant";
import { getAddress } from "@ethersproject/address";
import warning from "tiny-warning";

// warns if addresses are not checksummed
export default function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address);
    warning(address === checksummedAddress, `${address} is not checksummed.`);
    return checksummedAddress;
  } catch (error) {
    invariant(false, `${address} is not a valid address.`);
  }
}
