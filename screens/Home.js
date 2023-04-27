import React, { useState, useContext, useEffect, useCallback } from "react";
import Postbox from "../components/Postbox";
import Feed from "../components/Feed";
import { GlobalContext } from "../contexts/GlobalContext";
import { useTailwind } from 'tailwind-rn';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home() {
  const { user, orbis } = useContext(GlobalContext);
  const tailwind = useTailwind();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setRefreshing(true);
    let { data } = await orbis.getPosts();
    console.log("Data loaded.");
    if(data) {
      console.log(data.length + " posts retrieved.");
      setPosts(data);
    }
    setRefreshing(false);
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let { data } = await orbis.getPosts();
    console.log("Data loaded.");
    if(data) {
      console.log(data.length + " posts retrieved.");
      setPosts(data);
    }
    setRefreshing(false);
  }, []);

  return(
    <View style={tailwind('flex flex-col h-full')}>
      <Postbox callback={() => loadPosts()} />
      <View style={tailwind('flex flex-1 bg-white')}>
        <Feed posts={posts} refreshing={refreshing} onRefresh={onRefresh} />
      </View>
    </View>
  )
}
