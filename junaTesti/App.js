
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kotiscreen from './components/Kotiscreen';
import Aikataulusivu from './components/Aikataulusivu';
import Kolmasscreen from './components/Kolmasscreen';
import Asemasivu from './components/AsemaSivu';

const Naytot = createNativeStackNavigator();

const App=()=>{
  return (
   <NavigationContainer>
    <Naytot.Navigator initialRouteName='Koti'>
      <Naytot.Screen  name='Koti' component={Kotiscreen} options={{ headerShown: false }}/>
      <Naytot.Screen  name='Toinen' component={Aikataulusivu} options={{ headerShown: false }}/>
      <Naytot.Screen  name='Kolmas' component={Kolmasscreen}/>
      <Naytot.Screen  name='Asemasivu' component={Asemasivu}/>
    </Naytot.Navigator>
   </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  
});

export default App;
