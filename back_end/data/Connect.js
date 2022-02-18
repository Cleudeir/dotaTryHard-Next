import password from '../../password';

export default async function connect() {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(
    password(),
  )
    .then((data) => { console.log('>>>>>>>>>>>>>>> Conectado <<<<<<<<<<<<<<<<<'); return data; })
    .catch((err) => { console.log('>>>>>>>>>>>>>>>', err.massage, '<<<<<<<<<<<<<<<<<'); return null; });
  return connection;
}
