import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reimbursement from '../pages/Reimbursement';
import CreateClaim from '../pages/CreateClaim';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reimbursement">
        <Stack.Screen
          name="Reimbursement"
          component={Reimbursement}
        />
        <Stack.Screen
          name="CreateClaim"
          component={CreateClaim}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
