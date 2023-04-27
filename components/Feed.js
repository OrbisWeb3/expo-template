import React, { useState, useContext, useEffect } from "react";
import { useTailwind } from 'tailwind-rn';
import { GlobalContext } from "../contexts/GlobalContext";
import User from "./User";
import Post from "./Post";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from 'react-native';

export default function Feed({posts, refreshing, onRefresh}) {
  const { user, orbis } = useContext(GlobalContext);
  const tailwind = useTailwind();

  return(
		<ScrollView
      contentContainerStyle={tailwind('pt-3 items-center w-full')}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {(posts && posts.length > 0) ?
        <>
          {posts.map((post) => {
            return (
              <Post post={post} key={post.stream_id} />
            );
          })}
        </>
      :
        <Text style={tailwind('text-gray-900 font-semibold mt-6')}>
          Loading...
        </Text>
      }
		</ScrollView>
  )
}
