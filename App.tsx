import { FlatList, SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import './global.css';
import Claims from './src/components/core/Claims';
const App = () => {

const data=[{company:"amazon",status:"approved",currency:"INR",amount:600},{company:"amazon",status:"approved",currency:"INR",amount:600}];

  return (
    <SafeAreaView >
    <FlatList data={data} renderItem={({item})=><Claims data={item} />} className='w-full h-fit flex-col gap-4'/>
    </SafeAreaView>
  );
};
export default App;

