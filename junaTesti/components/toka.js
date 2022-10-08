import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchableDropdown from 'react-native-searchable-dropdown';

// npm install react-native-searchable-dropdown <-install first and then import

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

const Toka = ({navigation}) => {
  
  const [serverData, setServerData] = useState([]);

  const fetchStations= async () => {
    try {
      let response = await fetch(
        // https://www.digitraffic.fi/rautatieliikenne/#p%C3%A4iv%C3%A4n-junien-tiedot

        'https://rata.digitraffic.fi/api/v1/metadata/stations',
      );
      let json = await response.json();

      // console.log(json);
      setServerData(json);
    } catch (error) {
      console.log(error);
    }
  };

  const asemat = [];

  for (let i = 0; i < serverData.length; i++) {
    newAsema = {
      id: i,
      name: serverData[i].stationName,
      stationShortCode: serverData[i].stationShortCode,
    };
    asemat.push(newAsema);
  }

  useEffect(() => {
    fetchStations()
  },[]);


  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Valitse haluamasi juna-asema</Text>

        <SearchableDropdown
          // Listener on the searchable input
          onItemSelect={item => {
            alert('Valitsit aseman ' + item.name);
            navigation.navigate('Aikataulusivu', {
              asemaKoodi: item.stationShortCode,
              asemaNimi: item.name,
            });
          }}
          onTextChange={text => console.log(text)}
          // Called after the selection
          containerStyle={{padding: 5}}
          // Suggestion container style
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            // Text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            // Items container style you can pass maxHeight
            // To restrict the items dropdown hieght
            maxHeight: '70%',
          }}
          items={asemat}
          // Mapping of item array
          defaultIndex={2}
          // Default selected item index
          placeholder="Valitse Asema"
          // place holder for the search input
          resPtValue={false}
          // Reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          // To remove the underline from the android input
        />
      </View>


    </SafeAreaView>
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
    justifyContent: 'flex-start',
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
  headingText: {
    alignSelf: 'center',
    color: 'black',
    padding: 8,
  },
});

export default Toka;
