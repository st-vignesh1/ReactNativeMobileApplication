import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import DropDown from '../components/core/DropDown';
import { currency, merchants } from '../constants/claimsData';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/core/Button';
import { Image } from 'react-native';


const CreateClaim = () => {
  const [uri,setUri] = useState(null)
  const [selectedMerchantValue,setSelectedMerchantValue]=useState(null);
  const [selectedCurrencyValue,setSelectedCurrencyValue]=useState(null);
  const [amount,setAmount]=useState();
   const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
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

  function handleAmount(text){
    setAmount(text);
  }
  function handleCancel(){
    navigation.navigate('Reimbursement');
  }

function handleLaunchImageLibrary()
{
  console.log("image gallery");
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
            setUri(asset.uri);
          }
      } )
} 
console.log(uri);
return (
    <SafeAreaView className='flex-1'>
      <View className="w-full min-h-screen p-8">
      <Text className='mb-4 font-semibold text-xl'>Receipt(s)</Text>
      <View className='bg-gray-100 w-full h-40 rounded-md border border-dashed border-gray-300 mb-4 p-4 flex justify-center items-center'>
        {uri ?
        <Image source={{ uri }} className="w-40 h-full" />
        :
      <TouchableOpacity className='w-full flex justify-center items-center h-full'>
        <Text onPress={handleLaunchImageLibrary} className='capitalize text-blue-700 underline mb-1'>Upload Receipt</Text>
        <Text className='text-gray-600'>PNG,JPG,PDF upto 5 MB</Text>
      </TouchableOpacity>
        }

      </View>
      <DropDown data={merchants} selectedValue={selectedMerchantValue} setSelectedValue={setSelectedMerchantValue} dropDownName="Merchant"/>
      <DropDown data={currency} selectedValue={selectedCurrencyValue} setSelectedValue={setSelectedCurrencyValue} dropDownName="Currency"/>
      </View>
      <View className='bg-white w-full h-28 absolute bottom-0 flex-row items-center justify-around p-4 ' >
        {uri || selectedMerchantValue || selectedCurrencyValue ?<Button styles='bg-transparent  text-gray-400 border border-gray-400'>Save as draft</Button>:<Button styles='bg-transparent  text-gray-400 border border-gray-400' handlePress={handleCancel}>Cancel</Button>}
        <Button styles=' text-white border border-blue-600  bg-blue-600'>Create Claim</Button>
      </View >
    </SafeAreaView>
  );
};

export default CreateClaim;
