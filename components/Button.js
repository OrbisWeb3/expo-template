import { TouchableOpacity, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function Button({title, onPress, color}) {
  const tailwind = useTailwind();

  /** Display differnt button color based on parameter passed */
  switch (color) {
    /** Transparent Button */
    case "gray-100":
      return(
        <TouchableOpacity style={tailwind('bg-gray-100 px-4 py-2 rounded-full')} onPress={onPress}>
          <Text style={tailwind('text-slate-900 font-semibold')}>{title}</Text>
        </TouchableOpacity>
      );

    /** Default purple button */
    case "indigo-400":
      return(
        <TouchableOpacity style={tailwind('bg-indigo-400 px-4 py-2 rounded-full')} onPress={onPress}>
          <Text style={tailwind('text-white font-semibold')}>{title}</Text>
        </TouchableOpacity>
      );

    /** Default purple button */
    default:
      return(
        <TouchableOpacity style={tailwind('bg-indigo-600 px-4 py-2 rounded-full')} onPress={onPress}>
          <Text style={tailwind('text-white font-semibold')}>{title}</Text>
        </TouchableOpacity>
      );
  }


}
