import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import User, { UserPfp } from "./User";

export default function Post({post}) {
  const tailwind = useTailwind();
  return(
    <View style={tailwind('flex flex-row p-3 bg-white rounded-md border-b border-slate-200 w-full mb-2')}>
      <View style={tailwind('flex')}><UserPfp details={post.creator_details} /></View>
      <View style={tailwind('ml-2 flex flex-1')}>
        <Text style={tailwind('text-slate-900 text-sm font-normal')}>
          {post.content.body}
        </Text>
      </View>
    </View>
  )
}
