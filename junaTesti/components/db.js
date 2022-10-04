import React from 'react'; //
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'asema.db'}); //Open database - create if the database does not exist
var tableName = 'asema'; //Easier to handle, when table name in one place

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS asema', []); 

      tx.executeSql('create table if not exists' + tableName+'(asema text not null);',// luodaan uusi table
        [],

        () => {
          resolve();
        },

        (_, err) => {
          reject(err);
        },
      );

      tx.executeSql('insert into '+tableName+' (asema) values(Tampere,Kuopio,Helsinki,Vaasa,Turku,Riihimäki,Hämeenlinna);',
      [asema],
      () => {
        resolve();
      },

      (_, err) => {
        reject(err);
      },
    );



    });
  });
  return promise;
};

export const addAsema=(kaupunki)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            
            tx.executeSql('insert into '+tableName+'(kaupunki) values(?);',
            
            [kaupunki],
            
            ()=>{
                    resolve();
            },
            
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchAllAsemat=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table asema
            tx.executeSql('select * from '+tableName, [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    //And add all the items of the result (database rows/records) into that table
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                        console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                    }
                    console.log(items);//For debugging purposes to see the data in console window
                    resolve(items);//The data the Promise will have when returned
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};
