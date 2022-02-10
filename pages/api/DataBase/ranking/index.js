import StatusAverage from '../../../../components/math/StatusAverage';

export default async function ranking(req, res) {
  const mysql = require('mysql2/promise');

  const connection = await mysql.createConnection(
    {
      host: 'localhost', user: 'root', database: 'dotaTryHard',
    },
  )
    .catch(() => console.log('error connection'));

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err);
    return result;
  }
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((error) => error.message);
    return result;
  }

  const describe = await queryMySql('show tables');

  const tables = [];

  for (let i = 0; i < describe.length; i += 1) {
    const player = describe[i].Tables_in_dotatryhard;
    tables.push(+player.slice(2, player.length));
  }
  const tablesDetails = [];
  for (let j = 0; j < tables.length; j += 1) {
    const query = await queryMySql(`select * from n_${tables[j]}`);
    const average = StatusAverage(query);
    const profile = await pull(`../../Profile/${tables[j]}`);
    tablesDetails.push({ profile, ...average });
  }
  res.status(200).json(tables);
}
