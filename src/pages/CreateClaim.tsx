import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import DropDown from '../components/core/DropDown';
import { currency, merchants } from '../constants/claimsData';


const CreateClaim = () => {
  const [selectedMerchantValue,setSelectedMerchantValue]=useState(null)
  const [selectedCurrencyValue,setSelectedCurrencyValue]=useState(null)
  const handleLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: false, 
        includeBase64: true, 
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Error Code:', response.errorCode);
        } else if (response.assets) {
          const asset = response.assets[0];
          console.log('Photo URI:', asset.uri);
          console.log('Base64 String:', asset.base64);
          console.log('File Name:', asset.fileName);
        }
      }
    );
  };
function handleLaunchImageLibrary()
{
    launchImageLibrary(  {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
      },(response)=>{
        if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('Error Code:', response.errorCode);
          } else if (response.assets) {
            const asset = response.assets[0];
            console.log('Photo URI:', asset.uri);
            console.log('File Name:', asset.fileName);
          }
      } )
      
}  return (
    <SafeAreaView>
      <View className="w-full min-h-screen p-8">
      <Text className='mb-4 font-semibold text-xl'>Receipt(s)</Text>
      <View className='bg-gray-100 w-full h-36 rounded-md border border-dashed border-gray-300 mb-4'>
      <TouchableOpacity className='w-full flex justify-center items-center h-full'>
        <Text onPress={handleLaunchImageLibrary} className='capitalize text-blue-700 underline mb-1'>Upload Receipt</Text>
        <Text className='text-gray-600'>PNG,JPG,PDF upto 5 MB</Text>
      </TouchableOpacity>
      </View>
      <DropDown data={merchants} selectedValue={selectedMerchantValue} setSelectedValue={setSelectedMerchantValue} dropDownName="Merchant"/>
      <DropDown data={currency} selectedValue={selectedCurrencyValue} setSelectedValue={setSelectedCurrencyValue} dropDownName="Currency"/>
      </View>
    </SafeAreaView>
  );
};

export default CreateClaim;
