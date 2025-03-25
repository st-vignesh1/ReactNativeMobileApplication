import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const DropDown = ({ data, selectedValue ,setSelectedValue}) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  function handleSelectvalue(label){
    const selected=data.filter(item=>item.label===label);
    if(selected) setSelectedValue(selected[0].value)
        setIsDropDownVisible(false);
    }
  function handleToggleDropDown() {
    setIsDropDownVisible(!isDropDownVisible);
  }

  return (
    <View className="m-5">
      <TouchableOpacity
        className="pb-4 border-b"
        onPress={handleToggleDropDown}
      >
        <Text className="text-black capitalize text-xl">
          {selectedValue ? selectedValue : 'Merchant'}
        </Text>
      </TouchableOpacity>
      {isDropDownVisible && (
        <View className="mt-2 bg-gray-200 rounded-md elevation shadow-white/70 w-full max-h-60">
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={()=>handleSelectvalue(item.label)}
                className="p-4 border-b border-gray-300"
              >
                <Text className="text-base" >{item.label}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default DropDown;
