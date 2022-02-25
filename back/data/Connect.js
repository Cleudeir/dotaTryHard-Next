import DataBase from './DataBase';

export default async function Connect() {
  const mysql = require('mysql2/promise');
  const bataBase = await DataBase();

  const connection = await mysql.createConnection(
    bataBase,
  )
    .catch((err) => {console.log(err.message); return null});
    
  return connection;
}
