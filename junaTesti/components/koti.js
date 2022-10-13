import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


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
      <View style={styles.kuvaloota}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/myimages/trainicon.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <AppButton
        title="selaa aikatauluja"
        size="sm"
        backgroundColor="#007bff"
        onPress={() =>
          navigation.navigate('Aikataulusivu', {
            asemaKoodi: 'HL',
            asemaNimi: 'Hämeenlinna',
          })
        }
      />
      <AppButton
        title="Valitse juna-asema"
        size="sm"
        backgroundColor="#007bff"
        onPress={() => navigation.navigate('Valitse Asema')}
      />
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
  kuvaloota:{
    backgroundColor: '#3C9887',
    alignSelf: 'center',
    width:200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignContent:"center",
    height: 200,
    width: '50%',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Koti;
