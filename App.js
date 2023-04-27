import '@orbisclub/orbis-sdk/utils/polyfills_light_crypto';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import Home from "./screens/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from "./contexts/GlobalContext";
import ConnectModal from "./components/ConnectModal";

/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";

/** Initialize the Orbis class object */
let orbis = new Orbis({
  useLit: false,
  store: AsyncStorage,
  storeAsync: true
});

export default function App() {
  const [user, setUser] = useState();
  const [userConnecting, setUserConnecting] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  /** Will check if user is connected on load to automatically re-connect user */
  useEffect(() => {
    connect();

    async function connect() {
      let res = await orbis.isConnected();
      if(res.status == 200) {
        setUser(res.details);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, userConnecting, setUserConnecting, orbis, showConnectModal, setShowConnectModal }}>
      <TailwindProvider utilities={utilities}>
        <Home />

        {/** Display connect modal if user clicked on connect button */}
        {showConnectModal &&
          <ConnectModal />
        }
      </TailwindProvider>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
