import { getAddressFromDid } from "@orbisclub/orbis-sdk/utils/index.js";

/** Turns a did:pkh into a clean address and chain object */
export default function useDidToAddress(did) {
  let res = getAddressFromDid(did);
  return res;
}
