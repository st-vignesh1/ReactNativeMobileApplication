import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import Claims from '../components/core/Claims';
import { claimsData } from '../constants/claimsData';
import SearchBar from '../components/core/SearchBar';


const Reimbursement = () => {
  return (
    <SafeAreaView>
        <View className="w-full min-h-screen p-4">
      <Text className="mb-14 pl-4 text-2xl font-semibold">Reimbursement</Text>
      <View className="pl-4 pr-4 mb-8">
      <SearchBar/>
      </View>
      {claimsData?.length ? <FlatList data={claimsData} renderItem={({item})=><Claims data={item} />} className='w-full h-fit flex-col gap-4'/>:<Text>NO CLAIMS YET!</Text>}
        </View>
    </SafeAreaView>
  );
};

export default Reimbursement;