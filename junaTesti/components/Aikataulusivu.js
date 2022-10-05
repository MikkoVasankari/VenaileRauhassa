import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

const Aikataulusivu = ({navigation, route}) => {
  const [trainList, addToTrainList] = useState([]);

  // Halutun aseman tiedot aseman valitsemis sivulta
  const stationSC = route.params.asemaKoodi;
  const stationName = route.params.asemaNimi;

  const fetchTrain = async () => {
    try {
      let response = await fetch(
        // https://rata.digitraffic.fi/api/v1/live-trains/station/HL --- Antaa tietoja HL(Hämeenlinnan asema) tulevista junista.
        // https://www.digitraffic.fi/rautatieliikenne/#p%C3%A4iv%C3%A4n-junien-tiedot
        // https://rata.digitraffic.fi/api/v1/live-trains/station/RI?minutes_before_departure=60&minutes_after_departure=5&minutes_before_arrival=60&minutes_after_arrival=5&train_categories=Long-distance&train_categories=Commuter

        'https://rata.digitraffic.fi/api/v1/live-trains/station/' +
          stationSC +
          '?minutes_before_departure=60&minutes_after_departure=5&minutes_before_arrival=60&minutes_after_arrival=5&train_categories=Long-distance&train_categories=Commuter',
      );
      let json = await response.json();

      // console.log(json);
      addToTrainList(json);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTrain = item => {
    let timeAtTheStation;
    let slicetimeAtTheStation;
    let slicedTimeForUTC1;
    let slicedTimeForUTC2;

    let timeInFinnishTimezone;

    /*  let liveEstimateTime;
    let sliceLiveEstimateTime;
    let slicedLiveEstimatedTimeForUTC1;
    let slicedLiveEstimatedTimeForUTC2;

    let estimatedTimeInFinnishTimezone; */

    let a = item.item.timeTableRows.length;

    for (let i = 0; i < item.item.timeTableRows.length; i++) {
      // Otetaan juna-aikataulut halutulta asemalta
      if (item.item.timeTableRows[i].stationShortCode == stationSC) {
        // Lähtemis aikataulu
        if (item.item.timeTableRows[i].type == 'ARRIVAL') {
          timeAtTheStation = item.item.timeTableRows[i].scheduledTime;

          slicetimeAtTheStation = timeAtTheStation.slice(11, 19);

          slicedTimeForUTC1 = slicetimeAtTheStation.slice(0, 2);
          slicedTimeForUTC2 = slicetimeAtTheStation.slice(2, 9);
          var b = parseInt(slicedTimeForUTC1);
          b += 3;
          timeInFinnishTimezone = b + slicedTimeForUTC2;
        } else if (item.item.timeTableRows[i].type == 'DEPARTURE') {
          timeAtTheStation = item.item.timeTableRows[i].scheduledTime;

          slicetimeAtTheStation = timeAtTheStation.slice(11, 19);

          slicedTimeForUTC1 = slicetimeAtTheStation.slice(0, 2);
          slicedTimeForUTC2 = slicetimeAtTheStation.slice(2, 9);
          var b = parseInt(slicedTimeForUTC1);
          b += 3;
          timeInFinnishTimezone = b + slicedTimeForUTC2;
        }
      }
    }
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {item.item.timeTableRows[a - 1].stationShortCode}{' '}
          {item.item.trainCategory} Train {item.item.commuterLineID}{' '}
          {item.item.trainType}-{item.item.trainNumber}
        </Text>
        <Text style={styles.listItemText}>
          Arvioitu lähtemisaika {timeInFinnishTimezone}
        </Text>
      </View>
    );
  };

  fetchTrain();

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#3C9887',
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      marginTop: 10,
      borderWidth: 2,
      padding: 2,
      borderColor: 'black',
      borderRadius: 10,
      width: '60%',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    headerText: {
      color: 'black',
      textDecorationLine: 'bold',
    },
    timetableContainer: {
      backgroundColor: '#3C9887',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listStyle: {
      backgroundColor: '#c4c4c4',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
    },
    listItem: {
      alignItems: 'center',
      backgroundColor: '#dbdbdb',
      borderColor: 'black',
      borderWidth: 2,
      padding: 5,
      marginTop: 4,
      marginBottom: 4,
      marginRight: 4,
      marginLeft: 4,
      borderRadius: 5,
    },
    listItemText: {
      color: 'black',
      textDecorationLine: 'bold',
    },
    buttonContainer: {
      backgroundColor: '#3C9887',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 10,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 2,
      marginTop: 3,
      marginBottom: 3,
      width: '65%',
    },
    buttonText: {
      color: 'black',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate('Asemasivu')}>
              {stationName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timetableContainer}>
        <Text>Lähtevät junat:</Text>
      </View>

      <View>
        <View style={styles.timetableContainer}>
          <FlatList
            style={styles.listStyle}
            data={trainList}
            renderItem={renderTrain}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Koti')}>
          <Text style={styles.buttonText}> Takaisin </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Aikataulusivu;
