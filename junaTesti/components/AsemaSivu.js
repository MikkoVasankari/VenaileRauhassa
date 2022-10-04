import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { init, addAsema, fetchAllAsemat,addHalutaAsemat } from './db';

init()
.then(()=>{
    console.log('Tietokannan luonti onnistui!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});

addHalutaAsemat()
.then(()=>{
    console.log('Tietokannan luonti onnistui!');
}).catch((err)=>{
  console.log('LOOOL! '+err);
});


const Asemasivu=()=> {
  const [isInserted, setIsInserted]=useState(false);
  const [asemaList, setAsemaList]=useState([]);

  async function readAllAsemat(){
    try{
      const dbResult = await fetchAllAsemat();
      console.log("dbResult readAllAsemat in App.js");
      console.log(dbResult);
      setAsemaList(dbResult);
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
      console.log("toimii?");
    }
  }

//---------TYYLIT ALKAA----------------------------------
  const styles = StyleSheet.create({
    listItemStyle: {
      borderWidth: 1,
      borderColor: 'blue',
      padding: 5,
      backgroundColor: '#abc',
      width: '80%',
    },
    container: {
      flex: 1,
      backgroundColor: '#3C9887',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headercontainer: {
      marginTop: 10,
      marginBottom: 10,
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
      fontStyle: 'italic',
      fontSize: '100', // ei toimi :(
    },
    formView: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#3C9887',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 20,
      width: '100%',
    },
    listStyle: {
      flex: 8,
      alignItems: 'center',
      backgroundColor: '#3C9887',
  
      width: '100%',
    },
    inputStyle: {
      backgroundColor: '#abc',
      borderColor: 'black',
      borderWidth: 2,
      margin: 2,
      padding: 5,
      width: '50%',
    },
    touchableStyle: {
      margin: 2,
      padding: 5,
      width: '40%',
    },
  });

//---------TYYLIT LOPPUU------------------



  return (

    

    
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <View style={styles.headerText}>
          <Text>ASEMASI OVAT TÄSSÄ</Text>
        </View>
      </View>

      <Button title="Read" onPress={()=>readAllAsemat()} />



      <View style={styles.listStyle}>
      <FlatList
          data={asemaList}
          renderItem={(item)=><View><Text>{item.item.asema}</Text></View>}
          />
      </View>

      <TouchableOpacity
        style={styles.touchableStyle}
        title="Takaisin"
        //onPress={takaisinpolku} tähän sitten oikea polku
      />
    </View>
  );
}

export default Asemasivu;