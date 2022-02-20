/* eslint-disable brace-style */
import connect from '../../../../back_end/data/Connect';

export default async function read(req, res) {
  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => []);
    return result;
  }

  if (connection) {
    // playersMatches
    const dataPlayersMatches = await queryMySql('SELECT * FROM PLAYERS_MATCHES join PLAYERS on PLAYERS_MATCHES.account_id = PLAYERS.account_id;');

    // matches
    const dataMatches = await queryMySql('SELECT match_id FROM MATCHES;').then((data) => (data.length > 0 ? data.map((x) => x.match_id) : []));

    // players
    const dataPlayers = await queryMySql('SELECT account_id FROM PLAYERS;').then((data) => (data.length > 0 ? data.map((x) => x.account_id) : []));

    // response
    res.status(200).json({
      dataPlayersMatches,
      dataMatches,
      dataPlayers,
    });
  }
  res.status(500).json(connection);
}
