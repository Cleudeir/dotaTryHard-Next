import connect from '../../../../back_end/data/Connect';

export default async function readData(req, res) {
  const { id } = req.query;
  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }

  if (connection) {
    const read = await queryMySql('SELECT * FROM PLAYERS_MATCHES limit 1000');
    res.status(200).json(read);
  }

  res.status(500).json('Erro connection');
}
