import DataBase from './DataBase';

const mysql = require('mysql2/promise');

export default async function Connect() {
  const bataBase = await DataBase();

  const connection = await mysql.createConnection(
    bataBase,
  )
    .catch((err) => { console.log(err.message); return null; });

  return connection;
}
