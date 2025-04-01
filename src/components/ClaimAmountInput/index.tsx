import { View, Text, TextInput } from 'react-native'
import React from 'react'

const ClaimAmountInput = ({amount,handleAmount}) => {
  return (
      <View className="mt-8 m-2 mb-5">
               <Text
                 className={`${
                   amount
                     ? 'text-gray-500 font-medium'
                     : 'font-semibold text-xl text-gray-600 '
                 }`}
               >
                 Amount
               </Text>
               <TextInput
                 keyboardType="numeric"
                 value={amount}
                 onChangeText={handleAmount}
                 className="border-b border-b-gray-300 pb-4 text-xl font-semibold text-gray-600 "
               />
             </View>
  )
}

export default ClaimAmountInput;