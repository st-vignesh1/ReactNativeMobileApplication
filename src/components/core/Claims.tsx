import {  SafeAreaView, Text, View } from 'react-native';
import React from 'react';

const Claims = ({data}) => {
    console.log(data);
  return (
   <SafeAreaView>
    <View className='w-full h-fit flex-row pl-8 pr-8 pt-4 pb-4 justify-between items-center'>
    <View className='flex-row items-center gap-4'>
        <View className='w-10 h-10 rounded-full bg-black'></View>
        <View className='flex-col gap-1'>
            <Text className='capitalize font-bold'>{data.company}</Text>
            <Text className='capitalize text-xs'>{data.status}</Text>
        </View>
    </View>
    <View>
        <Text className='font-semibold'>{data.amount} {data.currency}</Text>
    </View>
    </View>
   </SafeAreaView>
  );
};

export default Claims;

