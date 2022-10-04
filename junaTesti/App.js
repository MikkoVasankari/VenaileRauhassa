
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kotiscreen from './components/Kotiscreen';
import Toinenscreen from './components/Toinenscreen';
import Kolmasscreen from './components/Kolmasscreen';

const Naytot = createNativeStackNavigator();

const App=()=>{
  return (
   <NavigationContainer>
    <Naytot.Navigator initialRouteName='Koti'>
      <Naytot.Screen  name='Koti' component={Kotiscreen} options={{ headerShown: false }}/>
      <Naytot.Screen  name='Toinen' component={Toinenscreen} options={{ headerShown: false }}/>
      <Naytot.Screen  name='Kolmas' component={Kolmasscreen}/>
    </Naytot.Navigator>
   </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  
});

export default App;
