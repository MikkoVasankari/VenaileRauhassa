
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'asemat.db' });
var tableName="asemat";
//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('DROP TABLE IF EXISTS asemat', []); //uncomment this if needed - sometimes it is good to empty the table
            //By default, primary key is auto_incremented - we do not add anything to that column
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key, breed text not null);',
            [],//second parameters of execution:empty square brackets - this parameter is not needed when creating table
            //If the transaction succeeds, this is called
            ()=>{
                resolve();//There is no need to return anything
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const addOneFish=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into '+tableName+'(breed) values(?);',
            //And the values come here
            ["tampere"],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchAllFish=()=>{
  const promise=new Promise((resolve, reject)=>{
      db.transaction((tx)=>{
          //Here we select all from the table fish
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