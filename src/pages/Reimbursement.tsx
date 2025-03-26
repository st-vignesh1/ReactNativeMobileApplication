import { View, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Claims from '../components/core/Claims';
import { claimsData, colorPallete } from '../constants/claimsData';
import SearchBar from '../components/core/SearchBar';
import NoDataFound from '../components/core/NoData';
import { useNavigation } from '@react-navigation/native';
import CreateClaim from './CreateClaim';
const Reimbursement = () => {
    const [searchValue,setSearchValue] = useState('');
    const [claims, setClaims] = useState(() => {
        return claimsData?.length ? claimsData : [];
      });
      const navigation = useNavigation();
    function handleSearchData(value){
        setSearchValue(value);
        if(!value) {setClaims(claimsData);}
        else{
            setClaims(claimsData.filter(claim=>claim.company.startsWith(value.toLowerCase())));
        }
    }
    function randomColor(){
        const index=Math.floor(Math.random()*colorPallete.length);
         return `bg-[rgb(${colorPallete[index]})]`;
    }
    function getFirstLetters(input) {
        const words = input.trim().split(/\s+/); 
        if (words.length < 2) {
            return words[0][0];
        }
        const firstLetter1 = words[0][0];
        const firstLetter2 = words[1][0];
        return firstLetter1 + firstLetter2;
    }
    function handleNavigation(){
      navigation.navigate('CreateClaim')
    }

  return (
    <SafeAreaView>
        <View className="w-full min-h-screen p-4">
      <Text className="mb-14 pl-4 text-2xl font-semibold">Reimbursement</Text>
      <View className="pl-4 pr-4 mb-8">
      <SearchBar value={searchValue} handleChange={handleSearchData}/>
      </View>
      <View className='w-full flex-1 mb-10'>
      {claims?.length > 0 ? <FlatList data={claims} renderItem={({item})=><Claims data={item} color={randomColor()} symbol={getFirstLetters(item.company)}/>} scrollEnabled className='w-full flex-col gap-4'/>:<NoDataFound/>}
      </View>
        </View>
        <TouchableOpacity className="absolute bottom-28 right-8 w-16 h-16 bg-blue-500 border border-blue-500 rounded-full items-center justify-center" onPress={handleNavigation}>
         <Text className='text-2xl text-white font-semibold'>+</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Reimbursement;