import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import  DateTimePicker  from '@react-native-community/datetimepicker'

const ClaimTransactionDate = ({  transactionDate,setShowDatePicker,showDatePicker,handleDateChange}) => {
  return (
    <View className="mt-3 m-2 mt-8">
    <Text
      className={` ${
        transactionDate
          ? 'mb-4 text-gray-500 font-medium'
          : 'font-semibold text-xl  text-gray-600 '
      }`}
    >
      Transaction Date
    </Text>
    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
      <Text className="border-b border-b-gray-300 w-full  text-gray-600  text-xl font-semibold">
        {transactionDate
          ? transactionDate.toLocaleDateString()
          : ''}
      </Text>
    </TouchableOpacity>
    {showDatePicker && (
      <DateTimePicker
        value={transactionDate || new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    )}
  </View>
  )
}

export default ClaimTransactionDate;