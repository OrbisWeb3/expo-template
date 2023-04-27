import { shortAddress } from "../utils";

export default function useGetUsername(details, address, did) {
  if(details && details.username) {
    return details.username;
  } else if(details && details.body?.name) {
    return details.body.name;
  } else if(address) {
    return shortAddress(address)
  } else {
    return shortAddress(did)
  }
}
