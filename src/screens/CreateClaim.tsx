import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDown from '../components/core/DropDown';
import { claimsData, currency, merchants } from '../constants/claimsData';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/core/Button';
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateClaim = () => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [selectedMerchantValue, setSelectedMerchantValue] = useState(null);
  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState(null);
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTransactionDate(selectedDate);
    }
  };

  const handleAmount = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAmount(numericValue);
  };

  const handleLaunchImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Error Code:', response.errorCode);
        } else if (response.assets) {
          const asset = response.assets[0];
          if (imageUris.length < 2) {
            setImageUris([...imageUris, asset.uri]);
          } else {
            console.log('Maximum 2 photos allowed');
          }
        }
      }
    );
  };

  const handleCreateClaim = () => {
    if (
      selectedMerchantValue &&
      selectedCurrencyValue &&
      amount &&
      transactionDate
    ) {
      claimsData.unshift({
        company: selectedMerchantValue,
        status: 'approval pending',
        currency: selectedCurrencyValue,
        amount,
        Date: transactionDate,
        receipt:imageUris,
      });
      navigation.navigate('Reimbursement');
    }
  };

  const handleDraft = () => {
    if (selectedMerchantValue || selectedCurrencyValue || amount) {
      claimsData.unshift({
        company: selectedMerchantValue || 'Unknown',
        status: 'draft',
        currency: selectedCurrencyValue || 'Not Updated',
        amount: Number(amount) || 0,
    
      });
      navigation.navigate('Reimbursement');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1" nestedScrollEnabled>
        <View className="w-full min-h-fit p-8">
          <Text className="mb-4 font-semibold text-xl">Receipt(s)</Text>
          <View className="bg-gray-100 w-full h-40 rounded-md border border-dashed border-gray-300 mb-4 p-4 flex ">
            {imageUris.length > 0 ? (
              <View className="w-full flex-row h-full items-center gap-4">
                {imageUris.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    className="w-40 h-full rounded-md"
                  />
                ))}
                {imageUris.length<2 &&  <TouchableOpacity
                onPress={handleLaunchImageLibrary}
                className='w-12 h-12 bg-blue-500 border border-blue-500 rounded-full items-center justify-center'
              >
                <Text className='font-bold text-4xl text-white'>
              +
                </Text>
              </TouchableOpacity>}
              </View>
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
          <DropDown
            data={merchants}
            selectedValue={selectedMerchantValue}
            setSelectedValue={setSelectedMerchantValue}
            dropDownName="Merchant"
          />
          <DropDown
            data={currency}
            selectedValue={selectedCurrencyValue}
            setSelectedValue={setSelectedCurrencyValue}
            dropDownName="Currency"
          />
          <View className="p-6">
            <Text
              className={`${
                amount
                  ? 'mb-2 text-gray-500 font-medium'
                  : 'font-semibold text-xl '
              }`}
            >
              Amount
            </Text>
            <TextInput
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmount}
              className="border-b pb-4 text-xl font-semibold"
            />
          </View>
          <View className="p-6">
            <Text
              className={`mb-4 ${
                transactionDate
                  ? 'mb-2 text-gray-500 font-medium'
                  : 'font-semibold text-xl '
              }`}
            >
              Transaction Date
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text className="border-b w-full pb-4 text-xl font-semibold">
                {transactionDate
                  ? transactionDate.toLocaleDateString()
                  : 'Select date'}
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
        </View>
      </ScrollView>
      <View className="bg-white w-full h-28 bottom-0 flex-row items-center justify-around p-4">
        {selectedMerchantValue || selectedCurrencyValue || amount || transactionDate ? (
          <Button
            styles="bg-transparent  text-gray-400 border border-gray-400"
            handlePress={handleDraft}
          >
            Save as draft
          </Button>
        ) : (
          <Button
            styles="bg-transparent  text-gray-400 border border-gray-400"
            handlePress={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          styles=" text-white border border-blue-600  bg-blue-600"
          handlePress={handleCreateClaim}
        >
          Create Claim
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateClaim;
