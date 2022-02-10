export default async function readData(req, res) {
  const mysql = require('mysql2/promise');
  const { id } = req.query;
  const filter = JSON.parse(req.body);

  const connection = await mysql.createConnection(
    {
      host: 'localhost', user: 'root', database: 'dotaTryHard',
    },
  )
    .catch(() => console.log('error connection'));

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }

  const read = await queryMySql(`SELECT * FROM dotatryhard.n_${id}`);

  if (read) {
    for (let i = filter.length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < read.length; j += 1) {
        if (filter[i] === read[j].match_id) {
          filter.splice(i, 1);
        }
      }
    }
  }

  res.status(200).json({ read, filter });
}
