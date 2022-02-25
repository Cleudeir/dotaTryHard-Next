/* eslint-disable brace-style */
import Connect from '../../../back/data/Connect';

export default async function Read(req, res) {
  console.log('Read');
  const connection = await Connect();

  async function queryMySql(request) {
    const result = await connection.query(request)
      .then((data) => data[0])
      .catch(() => []);
    return result;
  }

  if (connection) {    
    // SELECT COUNT(*) FROM nome_da_tabela;
    // playersMatches
    const dataPlayersMatches = await queryMySql('SELECT * FROM PLAYERS_MATCHES join PLAYERS on PLAYERS_MATCHES.account_id = PLAYERS.account_id;');

    // matches
    const dataMatches = await queryMySql('SELECT match_id FROM MATCHES;').then((data) => (data.length > 0 ? data.map((x) => x.match_id) : []));

    // players
    const dataPlayers = await queryMySql('SELECT account_id FROM PLAYERS;').then((data) => (data.length > 0 ? data.map((x) => x.account_id) : []));

    // response    
    res.status(200).send({
      dataPlayersMatches,
      dataMatches,
      dataPlayers,
    });
  } else {
    res.status(500).json('Error');
  }
}
