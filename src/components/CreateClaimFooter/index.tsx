import { View} from 'react-native'
import React from 'react'
import Button from '../core/Button/index';
const CreateClaimFooter = ({selectedMerchantValue,selectedCurrencyValue,amount,transactionDate,handleDraft,handleCancel,handleCreateClaim}) => {
  return (
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
  )
}

export default CreateClaimFooter