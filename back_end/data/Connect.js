import password from '../../password';

export default async function connect() {
  console.log(password());
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(
    password(),
  )
    .catch(() => null);
  return connection;
}
