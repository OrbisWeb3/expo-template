import React, { useContext, useState } from "react";
import { useTailwind } from 'tailwind-rn';
import { GlobalContext } from "../contexts/GlobalContext";
import User, { UserPfp } from "./User";
import Button from "./Button";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { sleep } from "../utils";

export default function Postbox({callback}) {
  const { user, orbis, showConnectModal, setShowConnectModal } = useContext(GlobalContext);
  const tailwind = useTailwind();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    let res = await orbis.createPost({body: message});

    /** Wait for new post to be indexed */
    await sleep(1000);
    setMessage("");
    callback();
    setLoading(false);
  }

  return(
    <>
		<View style={tailwind('p-3 items-center bg-gray-50 border-b border-gray-200 w-full')}>
      <SafeAreaView>
        {user ?
          <View style={tailwind('flex flex-row items-start w-full')}>
            <UserPfp details={user} height={40} />
            <TextInput
              onChangeText={setMessage}
              value={message}
              disabled={loading}
              style={tailwind('flex flex-1 bg-white p-3 rounded-md border border-gray-200 ml-2 mr-2')}
              placeholder="What's happening?"
              multiline={true} />
              {loading ?
                <Button title="Sending..." color="indigo-400" />
              :
                <Button title="Send" onPress={() => send()} />
              }

          </View>
        :
          <View style={tailwind('w-full items-center flex flex-col')}>
            <Text style={tailwind('text-gray-600 text-sm text-center mt-1 mb-2')}>
              You need to be connected to share content.
            </Text>
            <Button title="Connect" onPress={() => setShowConnectModal(true)} />
          </View>
        }
      </SafeAreaView>
		</View>
    </>
  )
}
