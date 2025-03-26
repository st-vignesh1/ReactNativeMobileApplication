import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({children,styles,handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
            <Text className={`p-4 w-44 text-center text-xl font-semiboldrounded-xl capitalize rounded-xl ${styles}`}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button;