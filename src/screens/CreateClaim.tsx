import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import DropDown from '../components/core/DropDown';
import { claimsData, currency, merchants } from '../constants/claimsData';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Receipt from '../components/Receipt';
import ClaimAmountInput from '../components/ClaimAmountInput';
import ClaimTransactionDate from '../components/ClaimTransactionDate';
import CreateClaimFooter from '../components/CreateClaimFooter';

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
        company: selectedMerchantValue.toLowerCase(),
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
        company: selectedMerchantValue?.toLocaleLowerCase() || 'Unknown',
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
          <Receipt imageUris={imageUris} handleLaunchImageLibrary={handleLaunchImageLibrary}/>
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
       <ClaimAmountInput amount={amount} handleAmount={handleAmount}/>
       <ClaimTransactionDate  transactionDate={transactionDate} setShowDatePicker={setShowDatePicker} showDatePicker={showDatePicker} handleDateChange={handleDateChange}/>
        </View>
      </ScrollView>
     <CreateClaimFooter selectedMerchantValue={selectedMerchantValue} selectedCurrencyValue={selectedCurrencyValue} amount={amount} transactionDate={transactionDate} handleDraft={handleDraft} handleCancel={handleCancel} handleCreateClaim={handleCreateClaim}/>
    </SafeAreaView>
  );
};

export default CreateClaim;
