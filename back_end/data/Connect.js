import DATABASE from './DATABASE';

export default async function connect() {
  const mysql = require('mysql2/promise');
  const bataBase = await DATABASE();

  const connection = await mysql.createConnection(
    bataBase,
  )

    .then((data) => { console.log('>>>>>>>>>>>>>>> Conectado <<<<<<<<<<<<<<<<<'); return data; })
    .catch((err) => { console.log('Não Conectado>>>>>>>>>>>>>>>', err.massage, '<<<<<<<<<<<<<<<<<'); return null; });
  return connection;
}
