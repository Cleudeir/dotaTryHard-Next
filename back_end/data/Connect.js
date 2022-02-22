import DataBase from './DataBase';

export default async function connect() {
  const mysql = require('mysql2/promise');
  const bataBase = await DataBase();

  const connection = await mysql.createConnection(
    bataBase,
  )
    .catch(() => null);
  return connection;
}
