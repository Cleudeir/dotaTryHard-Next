import connect from '../../../../back_end/data/Connect';

export default async function readData(req, res) {
  const { id } = req.query;
  const connection = await connect();
  const useDatabase = 'use dotaTryHard';

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err.message);
    return result;
  }

  if (connection) {
    const use = await queryMySql(useDatabase);
    const read = await queryMySql('SELECT * FROM dotatryhard.players_matches;');
    res.status(200).json({ use, read });
  }

  res.status(500).json(connection);
}
