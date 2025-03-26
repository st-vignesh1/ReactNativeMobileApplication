import { SafeAreaView} from 'react-native';
import React from 'react';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  return (
      <GestureHandlerRootView className="flex-1">
    <SafeAreaView className="flex-1" >
     <AppNavigator/>
    </SafeAreaView>
      </GestureHandlerRootView>
  );
};
export default App;

