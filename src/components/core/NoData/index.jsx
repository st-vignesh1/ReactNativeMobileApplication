import { View, Text,Image } from 'react-native';
import React from 'react';


const NoDataFound = () => {
  return (
    <View className="w-full h-full flex justify-center items-center">
      <Image
        source={require("../../../assets/nodata.jpg")}
        className="w-96 h-96 mb-4"
      />
      <Text className='text-2xl font-extrabold'>NO DATA FOUND!</Text>
    </View>
  )
}

export default NoDataFound;