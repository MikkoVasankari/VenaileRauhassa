import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Button, Text} from 'react-native';

export default function App() {
  const [trainList, addToTrainList] = useState([]);

  // station ShortCode attribute
  const stationSC = 'HL';

  const fetchTrain = async () => {
    try {
      let response = await fetch(
        // https://rata.digitraffic.fi/api/v1/live-trains/station/HL --- Antaa tietoja HL(Hämeenlinnan asema) tulevista junista.
        // https://www.digitraffic.fi/rautatieliikenne/#p%C3%A4iv%C3%A4n-junien-tiedot
        // https://rata.digitraffic.fi/api/v1/live-trains/station/HL?minutes_before_departure=60&minutes_after_departure=5&minutes_before_arrival=60&minutes_after_arrival=5&train_categories=Long-distance&train_categories=Commuter'

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

  // Suomi UTC +3:00 tällä hetkellä

  const renderTrain = item => {
    let timeAtTheStation;
    let slicetimeAtTheStation;
    let slicedTimeForUTC1;
    let slicedTimeForUTC2;
    let timeInFinnishTimezone;

    let a = item.item.timeTableRows.length;

    for (let i = 0; i < item.item.timeTableRows.length; i++) {
      // Otetaan juna-aikataulut halutulta asemalta 
      if (item.item.timeTableRows[i].stationShortCode == stationSC) {
        
        // Saapumis aikataulu
        if (item.item.timeTableRows[i].type == 'ARRIVAL') {
          timeAtTheStation = item.item.timeTableRows[i].scheduledTime;

          slicetimeAtTheStation = timeAtTheStation.slice(11, 19);

          slicedTimeForUTC1 = slicetimeAtTheStation.slice(0, 2);
          slicedTimeForUTC2 = slicetimeAtTheStation.slice(2, 9);
          var b = parseInt(slicedTimeForUTC1);
          b += 3;
          timeInFinnishTimezone = b + slicedTimeForUTC2;
        }
        // Lähtemis aikataulu
        if (item.item.timeTableRows[i].type == 'DEPARTURE') {
          liveEstimateTime = item.item.timeTableRows[i].liveEstimateTime;
          sliceLiveEstimateTime = liveEstimateTime.slice(11, 19);

          slicedLiveEstimatedTimeForUTC1 = sliceLiveEstimateTime.slice(0, 2);
          slicedLiveEstimatedTimeForUTC2 = sliceLiveEstimateTime.slice(2, 9);

          var estimatedTimeInFinnishTimezone;
          var b = parseInt(slicedLiveEstimatedTimeForUTC1);
          b += 3;
          estimatedTimeInFinnishTimezone = b + slicedLiveEstimatedTimeForUTC2;
        }
      }
    }

    // {item.item.timeTableRows[0].scheduledTime}

    return (
      <View style={styles.listItemStyle}>
        <Text>
          {item.index}) {timeInFinnishTimezone}{' '}
          {item.item.timeTableRows[a - 1].stationShortCode}{' '}
          {item.item.trainCategory} Train {item.item.commuterLineID}{' '}
          {item.item.trainType}-{item.item.trainNumber}{' '}
        </Text>
        <Text>Arvioitu lähtemisaika {estimatedTimeInFinnishTimezone}</Text>
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          style={styles.flatliststyle}
          data={trainList}
          renderItem={renderTrain}
        />
      </View>

      <View>
        <Button
          style={styles.buttonStyle}
          title="Read Trains"
          onPress={fetchTrain}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
