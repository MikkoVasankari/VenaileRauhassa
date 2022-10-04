import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import SearchableDropdown from 'react-native-searchable-dropdown';

// npm install react-native-searchable-dropdown <-install first and then import

const items = [
  // name key is must. It is to show the text in front
  {id: 1, name: 'Hämeenlinna'},
  {id: 2, name: 'Riihimäki'},
  {id: 3, name: 'Helsinki'},
  {id: 4, name: 'Turku'},

];



TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={["#004d40", "#009688"]}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const toka = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screenContainer}>
    <View style={styles.container}>
       <Text style={styles.headingText}>
        Searchable Dropdown from Static Array --- ei ehkä tällä
      </Text>
      <AppButton title="selaa aikatauluja" size="sm" backgroundColor="#007bff"
       onPress={()=>navigation.navigate("toka")} title="testi selaa asemia"/> 
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        // Listner on the searchable input
        onItemSelect={(item) => alert(JSON.stringify(item))}
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
        items={items}
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
    alignSelf: "center",
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },

  screenContainer: {
    backgroundColor: '#3C9887',
    flex: 1,
    justifyContent: "flex-start",
    padding: 16
  },
  appButtonContainer: {
    elevation: 5,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  appButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

  
  
  export default toka;