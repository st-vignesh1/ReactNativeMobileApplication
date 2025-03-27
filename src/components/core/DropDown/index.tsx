import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const DropDown = ({ data, selectedValue, setSelectedValue, dropDownName }) => {

  console.log(selectedValue)
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  function handleSelectValue(label) {
    const selected = data.find((item) => item.label === label);
    if (selected) setSelectedValue(selected.label);
    setIsDropDownVisible(false);
  }

  function handleToggleDropDown() {
    setIsDropDownVisible(!isDropDownVisible);
  }

  return (
    <View className="m-5">
      <Text className="mb-2 text-gray-500 font-medium">{selectedValue ? dropDownName : ''}</Text>
      <TouchableOpacity
        className="pb-4 border-b"
        onPress={handleToggleDropDown}
      >
        <Text className="text-black capitalize text-xl font-semibold">
          {selectedValue ? selectedValue : dropDownName}
        </Text>
      </TouchableOpacity>
      {isDropDownVisible && (
        <View className="mt-2 bg-gray-200 rounded-md elevation shadow-white/70 w-full min-h-fit">
          {data?.length > 0 && (
            <View>
            {data.map((item, index) =>
              <TouchableOpacity
                key={index.toString()}
                onPress={() => handleSelectValue(item.label)}
                className="p-4 border-b border-gray-300"
              >
                <Text className="text-base">{item.label}</Text>
              </TouchableOpacity>
            )}
          </View>
          
          )}
        </View>
      )}
    </View>
  );
};

export default DropDown;
