import { SafeAreaView} from 'react-native';
import React from 'react';
import './global.css';
import Reimbursement from './src/pages/Reimbursement';
import CreateClaim from './src/pages/CreateClaim';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView >
      <GestureHandlerRootView>
      <CreateClaim/>
      </GestureHandlerRootView>
      {/* <Reimbursement/> */}
    </SafeAreaView>
  );
};
export default App;

