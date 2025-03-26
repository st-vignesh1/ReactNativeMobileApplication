import {  SafeAreaView, Text, View } from 'react-native';
import React from 'react';




const Claims = ({data,color,symbol}) => {
 return (
   <SafeAreaView>
    <View className="w-full h-fit flex-row p-4 justify-between items-center">
    <View className="flex-row items-center gap-4">
        <View style={{backgroundColor:color}} className=" w-12 h-12 rounded-full flex justify-center items-center "><Text className='text-white text-xl font-bold uppercase'>
            {symbol}
            </Text>
            </View>
        <View className="flex-col gap-1">
            <Text className="capitalize font-bold">{data.company}</Text>
            <Text className={` uppercase text-xs font-semibold ${data.status==="approved"?"text-green-600":"text-yellow-600"}`}>{data.status}</Text>
        </View>
    </View>
    <View className="flex-row gap-2">
        <Text className="font-semibold">{data.amount}</Text>
        <Text className="font-semibold">{data.currency}</Text>
    </View>
    </View>
   </SafeAreaView>
  );
};

export default Claims;

