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
  // Data Source for the SearchableDropdown
  const [serverData, setServerData] = useState([]);

  /* useEffect(() => {
    fetch('https://rata.digitraffic.fi/api/v1/metadata/stations')
      .then(response => response.json())

      .then(responseJson => {
        //Successful response from the API Call

        setServerData(responseJson);
      })

      .catch(error => {
        console.error(error);
      });
  }, [serverData]); */

  const fetchTrain = async () => {
    try {
      let response = await fetch(
        // https://rata.digitraffic.fi/api/v1/live-trains/station/HL --- Antaa tietoja HL(Hämeenlinnan asema) tulevista junista.
        // https://www.digitraffic.fi/rautatieliikenne/#p%C3%A4iv%C3%A4n-junien-tiedot
        // https://rata.digitraffic.fi/api/v1/live-trains/station/RI?minutes_before_departure=60&minutes_after_departure=5&minutes_before_arrival=60&minutes_after_arrival=5&train_categories=Long-distance&train_categories=Commuter

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
            maxHeight: '60%',
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => fetchTrain()}>
          <Text style={styles.buttonText}> Lue junat </Text>
        </TouchableOpacity>
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
