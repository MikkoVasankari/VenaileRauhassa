
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'asemat.db' });
var tableName="asemat";
//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('DROP TABLE IF EXISTS asemat', []); 
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key, asema text not null, tunnus text not null);',
            [],
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

export const addOneAsema=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            
            tx.executeSql('insert into '+tableName+'(asema, tunnus) values(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?),(?,?)',
            
            ["Tampere","TPE","Helsinki","HKI","Turku","TKU","Hämeenlinna","HL","Lahti","LH","Riihimäki","RI","Nokia","NOA","Pasila","PSL"],
            
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
          //Here we select all from the table fish
          tx.executeSql('select * from '+tableName, [],
              (tx, result)=>{
                  let items=[];//Create a new empty Javascript array
                  //And add all the items of the result (database rows/records) into that table
                  for (let i = 0; i < result.rows.length; i++){
                      items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                      //console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                  }
                  //console.log(items);//For debugging purposes to see the data in console window
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