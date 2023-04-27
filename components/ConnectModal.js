import React, { useState, useRef, useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Button from "./Button";
import { useTailwind } from 'tailwind-rn';
import * as Linking from 'expo-linking';

/** Replaces localStorage in React Native */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Import Context */
import { GlobalContext } from "../contexts/GlobalContext";

/** Modal explaining what connecting is on mobile */
export default function ConnectModal({connect, visible, checkIsConnected}) {
  const tailwind = useTailwind();

  return(
    <View style={tailwind('absolute h-full w-full z-50')}>
      <ConnectWithQR />
    </View>
  )
}

/** Connect using QR code scanning with camera */
function ConnectWithQR() {
  const { user, setUser, orbis, setShowConnectModal } = useContext(GlobalContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const tailwind = useTailwind();
  const { width } = Dimensions.get('window');

  /** Will trigger a native modal to ask for camera's permission */
  async function askCameraPermission() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }

  /** Triggered when qr code is scanned with success, we use the data to connect the user */
  async function handleBarCodeScanned({ type, data }) {
    let { path, queryParams } = Linking.parse(data);
    setScanned(true);

    /** Save did and encrypted seed in localStorage */
    await AsyncStorage.setItem('ceramic-session', queryParams.sessionString);

    /** Connect to account */
    let res = await orbis.isConnected();
    if(res.status == 200) {
      setUser(res.details);
    }

    /** Hide connect modal */
    setShowConnectModal(false);
  };

  /** Hide connect modal */
  function back() {
    setShowConnectModal(false);
  }

  /** BarCode Scanner container */
  if(hasPermission) {
    return(
      <View style={[tailwind('absolute w-full h-full flex'), { backgroundColor: "rgba(0,0,0,0.7)" }]}>
        <SafeAreaView style={[tailwind('w-full flex flex-col justify-center'), { top: 100, borderRadius: 26, height: width }]} >
          <View style={tailwind("w-full flex items-end pr-6")}>
            <Button color="gray-100" title="Close" onPress={() => back()} />
          </View>
          <View style={[tailwind('bg-white w-full rounded-md m-4'), {overflow: "hidden", marginLeft: width * 0.05, width: width * 0.9, height: width * 0.9}]}>
            {scanned ?
              <Text style={tailwind("text-gray-900 text-sm text-center pt-3")}>Connecting...</Text>
            :
              <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[tailwind('w-full h-full'), {  }]} />
            }
          </View>
        </SafeAreaView>
      </View>
    )
  }

  return(
    <View style={tailwind('h-full w-full p-6 bg-white z-50')}>
      <View style={{flexDirection: "column", paddingHorizontal: 35, marginTop: 25}}>
        <Text style={tailwind('text-lg font-medium text-gray-900 text-center mt-4')}>Connect to your account</Text>
        <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent:"center", marginBottom: 20}}>
          <Text style={tailwind('text-sm text-gray-600 text-center mt-1')}><Text style={tailwind('text-gray-900 font-medium')}>#1.</Text> Open app.orbis.club on your desktop.</Text>
        </View>

        <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent:"center", marginBottom: 20}}>
          <Text style={tailwind('text-sm text-gray-600 text-center mt-1')}><Text style={tailwind('text-gray-900 font-medium')}>#2.</Text> Connect and click on the three dots icon on the top-right.</Text>
        </View>

        <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent:"center", marginBottom: 20}}>
          <Text style={tailwind('text-sm text-gray-600 text-center mt-1')}><Text style={tailwind('text-gray-900 font-medium')}>#3.</Text> Click on "Connect with mobile" and scan the QR code.</Text>
        </View>
      </View>

      {hasPermission === null &&
        <View style={{alignItems: "center", justifyContent: "center", marginTop: 10, flexDirection: "row"}}>
          <View style={tailwind('mr-2')}>
            <Button color="gray-100" title="Back" onPress={() => back()} />
          </View>
          <Button onPress={() => askCameraPermission()} color="blue" title="Open camera" />
        </View>
      }

      {hasPermission === false &&
        <Text style={tailwind('text-sm text-red-600 text-center mt-1')}>We don't have access to the camera. Please enable it.</Text>
      }
    </View>
  );
}
