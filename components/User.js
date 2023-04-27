import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import useDidToAddress from "../hooks/useDidToAddress";
import useGetUsername from "../hooks/useGetUsername";

export default function User({height = 40, details}) {
  const tailwind = useTailwind();
  return(
    <View style={tailwind('flex flex-row items-center')}>
      <UserPfp height={height} details={details} />
      <Text style={tailwind('text-slate-900 font-medium ml-1 text-sm')}>
        <Username details={details} />
      </Text>
    </View>
  )
}

/** Will render the user's pfp or empty state */
export function UserPfp({height = 40, details}) {
  const tailwind = useTailwind();
  if(details && details.profile && details.profile.pfp) {
    return(
      <Image
        style={[tailwind('rounded-full'), { height: height, width: height }]}
        source={{
          uri: details.profile.pfp,
        }} />
    )
  } else {
    return(
      <Image
        style={[tailwind('rounded-full'), { height: height, width: height }]}
        source={require('../assets/empty-state-user.png')} />
    )
  }
}

/** Will render the username or generated username with address */
export function Username({details}) {
  const tailwind = useTailwind();
  const { address, chain } = useDidToAddress(details?.did);
  const username = useGetUsername(details?.profile, address, details?.did);

  return username
}
