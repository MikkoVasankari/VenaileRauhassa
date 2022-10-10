import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const Kolmasscreen = (param) => {
  return (
    <View>
      <Text>Kolmasscreen</Text>
      
      <Button onPress={()=>param.navigation.navigate("Koti")} title="koti" />
    </View>
  );
};

export default Kolmasscreen;
