import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import tarefa from './src/pages/Tarefa';
import novatarefa from './src/pages/Novatarefa';
import detalhes from './src/pages/Detalhes';

const Stack = createStackNavigator();

export default function App() {






  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tarefa">





        <Stack.Screen
          name="Tarefa"
          component={tarefa}
          options={{
            headerTintColor: "#1967d2",
          }}
        />


        <Stack.Screen
          name="NovaTarefa"
          component={novatarefa}
          options={{
            headerTintColor: "#1967d2",
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={detalhes}
          options={{
            headerTintColor: "#1967d2",
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>

  );
}


