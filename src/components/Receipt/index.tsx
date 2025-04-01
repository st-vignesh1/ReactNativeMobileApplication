import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Receipt = ({imageUris,handleLaunchImageLibrary}) => {
  return (
        <>
        <Text className="mb-4 mt-10 font-semibold text-xl text-gray-600">Receipt(s)</Text>
          <View className="bg-gray-100 w-full h-40 p-2 rounded-md border border-dashed border-gray-300 mb-8 flex overflow-x-scroll">
            {imageUris?.length >0 ? (
              <ScrollView className="w-full" horizontal={true} contentContainerStyle={{justifyContent:'center',alignItems:"center",gap:10}}>
                 { imageUris?.length<5 && <TouchableOpacity
                    onPress={handleLaunchImageLibrary}
                    className="w-12 h-12 bg-blue-500 border border-blue-500 rounded-full items-center justify-center"
                  >
                    <Text className="font-bold text-4xl text-white">+</Text>
                  </TouchableOpacity>}
                {imageUris?.length>0 && imageUris.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    className="w-40 h-full rounded-md"
                  />
                ))}
              </ScrollView>
            ) : (
              <TouchableOpacity
                onPress={handleLaunchImageLibrary}
                className="w-full flex justify-center items-center h-full"
              >
                <Text className="capitalize text-blue-700 underline mb-1">
                  Upload Receipt
                </Text>
                <Text className="text-gray-600">PNG, JPG, PDF up to 5 MB</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
  )
}
export default Receipt;