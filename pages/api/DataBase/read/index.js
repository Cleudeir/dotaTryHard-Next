import connect from '../../../../back_end/data/Connect';

export default async function readData(req, res) {
  const connection = await connect();
  // const parameter = await JSON.parse(req.body);
  const parameter = 'players';

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err);
    return result;
  }

  if (connection) {
    if (parameter === 'playersMatches') {
      const playersMatches = await queryMySql('SELECT * FROM PLAYERS_MATCHES join PLAYERS on PLAYERS_MATCHES.account_id = PLAYERS.account_id;');
      if (playersMatches) {
        res.status(200).json(playersMatches);
      } else { res.status(200).json([]); }
    } else if (parameter === 'matches') {
      const matches = await queryMySql('SELECT match_id FROM MATCHES;');
      if (matches) {
        res.status(200).json(matches.map((x) => x.match_id));
      } else {
        res.status(200).json([]);
      }
    } else if (parameter === 'players') {
      const players = await queryMySql('SELECT account_id FROM PLAYERS;');
      if (players) {
        res.status(200).json(players.map((x) => x.account_id));
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(500).json('erro parameter');
    }
  }
  res.status(500).json(connection);
}
