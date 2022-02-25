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
    const [count] = await queryMySql('SELECT COUNT(*) FROM PLAYERS_MATCHES');
    const tableNumberRows = +count['COUNT(*)']
    console.log('tableNumberRows', tableNumberRows);
    // playersMatches

    const dataPlayersMatches = []
    const n = 1000; 
    for (let i = 1; i < tableNumberRows; i += n) {
      dataPlayersMatches.push(...await queryMySql(`SELECT * FROM PLAYERS_MATCHES join PLAYERS on PLAYERS_MATCHES.account_id = PLAYERS.account_id LIMIT ${i},${n} ;`))
    }
    

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
    res.status(500).json(connection);
  }
}
