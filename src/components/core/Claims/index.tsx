import {  SafeAreaView, Text, View } from 'react-native';
import React from 'react';




const Claims = ({data}) => {
  return (
   <SafeAreaView>
    <View className='w-full h-fit flex-row p-4 justify-between items-center'>
    <View className='flex-row items-center gap-4'>
        <View className='w-10 h-10 rounded-full bg-black'></View>
        <View className='flex-col gap-1'>
            <Text className='capitalize font-bold'>{data.company}</Text>
            <Text className={`capitalize text-xs font-semibold ${data.status==="approved"?"text-green-600":"text-yellow-600"}`}>{data.status}</Text>
        </View>
    </View>
    <View className="flex-row gap-2">
        <Text className='font-semibold'>{data.amount}</Text>
        <Text className='font-semibold'>{data.currency}</Text>
    </View>
    </View>
   </SafeAreaView>
  );
};

export default Claims;

