import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const Kotiscreen = (param) => {
  return (
    <View>
      <Text>Kotinäyttö</Text>
      <Button onPress={()=>param.navigation.navigate("Toinen")} title="Toinen sivu" />
      <Button onPress={()=>param.navigation.navigate("Kolmas")} title="Kolmas sivu" />
    </View>
  );
};

export default Kotiscreen;