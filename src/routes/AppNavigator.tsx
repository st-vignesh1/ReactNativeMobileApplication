import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reimbursement from '../screens/Reimbursement';
import CreateClaim from '../screens/CreateClaim';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reimbursement">
        <Stack.Screen
          name="Reimbursement"
          component={Reimbursement}
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
        <Stack.Screen
          name="CreateClaim"
          component={CreateClaim}
          options={{
            headerStyle: {
              backgroundColor: " #f3f4f6", 
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
