import DATABASE from './DATABASE';

export default async function connect() {
  const mysql = require('mysql2/promise');
  const bataBase = await DATABASE();

  const connection = await mysql.createConnection(
    bataBase,
  )
    .catch(() => null);
  return connection;
}
