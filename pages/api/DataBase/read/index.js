import connect from '../../../../back_end/data/Connect';

export default async function readData(req, res) {
  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err.message);
    return result;
  }

  if (connection) {
    const playersMatches = await queryMySql('SELECT * FROM dotatryhard.players_matches;');
    const matches = (await queryMySql('SELECT match_id FROM dotatryhard.matches;')).map((x) => x.match_id);
    const players = (await queryMySql('SELECT account_id FROM dotatryhard.players;')).map((x) => x.account_id);

    res.status(200).json({
      matches, players, playersMatches,
    });
  }

  res.status(500).json(connection);
}
