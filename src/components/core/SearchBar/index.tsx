import React, { useState } from 'react';
import { TextInput } from 'react-native';

const SearchBar = () => {
    const [value,setValue] = useState('');
    console.log(value);
  return (
  <TextInput value={value} onChangeText={text=>setValue(text)} className="border border-gray-300 rounded w-full h-12 p-2 pl-4 pr-4 placeholder:text-gray-600 placeholder:font-medium" placeholder='Search'/>
  );
};

export default SearchBar;

