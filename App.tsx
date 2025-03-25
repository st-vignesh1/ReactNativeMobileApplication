import { SafeAreaView} from 'react-native';
import React from 'react';
import './global.css';
import Reimbursement from './src/pages/Reimbursement';
import CreateClaim from './src/pages/CreateClaim';

const App = () => {
  return (
    <SafeAreaView >
      {/* <Reimbursement/> */}
      <CreateClaim/>
    </SafeAreaView>
  );
};
export default App;

