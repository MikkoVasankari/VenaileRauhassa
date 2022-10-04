import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

const AppButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={['#004d40', '#009688']}
      style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const Koti = ({navigation}) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.venaaTeksti}>VENAILE RAUHASSA</Text>
      <AppButton  title="selaa aikatauluja" size="sm" backgroundColor="#007bff" onPress={()=>navigation.navigate("Aikataulusivu")} /> 
      <AppButton title="selaa aikatauluja" size="sm" backgroundColor="#007bff" onPress={()=>navigation.navigate("toka")} />
    </View>
  );
};

const styles = StyleSheet.create({
  venaaTeksti: {
    alignSelf: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },

  screenContainer: {
    backgroundColor: '#3C9887',
    flex: 1,
    justifyContent: 'space-around',
    padding: 16,
  },
  appButtonContainer: {
    elevation: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  appButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default Koti;
