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
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import DropDown from '../components/core/DropDown';
import { claimsData, currency, merchants } from '../constants/claimsData';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/core/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export interface Claim {
  company: string;
  status: string;
  currency: string;
  amount: number;
  date?: Date;
  receipt?: string[];
}
const CreateClaim: React.FC = () => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [selectedMerchantValue, setSelectedMerchantValue] = useState<string | null>(null);
  const [selectedCurrencyValue, setSelectedCurrencyValue] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTransactionDate(selectedDate);
    }
  };

  const handleAmount = (text: string) => {
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
          const asset: Asset = response.assets[0];
          if (asset.uri && imageUris.length < 5) {
            setImageUris([asset.uri,...imageUris ]);
          }  else {
            console.log('Maximum 5 photos allowed');
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
        amount: Number(amount),
        date: transactionDate,
        receipt: imageUris,
      });
      navigation.navigate('Reimbursement');
    }
  };

  const handleDraft = () => {
    if (selectedMerchantValue || selectedCurrencyValue || amount || transactionDate) {
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
    <SafeAreaView className="flex-1  bg-white">
      <ScrollView className="flex-1" nestedScrollEnabled>
        <View className="w-full min-h-fit p-6">
          <Text className="mb-4 mt-10 font-semibold text-xl text-gray-600">Receipt(s)</Text>
          <View className="bg-gray-100 w-full h-40 p-2 rounded-md border border-dashed border-gray-300 mb-4 flex overflow-x-scroll">
            {imageUris.length >0 ? (
              <ScrollView className="w-full" horizontal={true} contentContainerStyle={{justifyContent:'center',alignItems:"center",gap:10}}>
                 { imageUris?.length<5 && <TouchableOpacity
                    onPress={handleLaunchImageLibrary}
                    className="w-12 h-12 bg-blue-500 border border-blue-500 rounded-full items-center justify-center"
                  >
                    <Text className="font-bold text-4xl text-white">+</Text>
                  </TouchableOpacity>}
                {imageUris.map((uri, index) => (
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
        </View>
      </ScrollView>
      <View className="bg-white w-full h-24 bottom-0 flex-row items-center justify-around p-4 ">
        {selectedMerchantValue || selectedCurrencyValue || amount || transactionDate ? (
          <Button
            styles="bg-transparent  text-gray-400 border border-gray-400"
            handlePress={handleDraft}
          >
            Save as draft
          </Button>
        ) : (
          <Button
            styles="bg-transparent  text-gray-500 border border-gray-400"
            handlePress={handleCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          styles=" text-white border border-blue-600  bg-blue-600"
          handlePress={handleCreateClaim}
          disabled={
            !selectedMerchantValue || !selectedCurrencyValue || !amount || !transactionDate
          }
        >
          Create Claim
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CreateClaim;
