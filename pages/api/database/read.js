/* eslint-disable brace-style */
import Connect from '../../../back/data/Connect';

export default async function Read(req, res) {
  console.log('Read');
  const body = JSON.parse(req.body);
  const connection = await Connect();

  async function queryMySql(request) {
    const result = await connection.query(request)
      .then((data) => data[0])
      .catch(() => []);
    return result;
  }

  if (connection) {
    if(body === "playersMatches" ){
    const [count] = await queryMySql('SELECT COUNT(*) FROM PLAYERS_MATCHES');
    const tableNumberRows = +count['COUNT(*)']
    console.log('tableNumberRows', tableNumberRows);
    // playersMatches
    const dataPlayersMatches = []
    const n = 1000; 
    for (let i = 1; i < tableNumberRows; i += n) {
      dataPlayersMatches.push(...await queryMySql(`SELECT * FROM PLAYERS_MATCHES join PLAYERS on PLAYERS_MATCHES.account_id = PLAYERS.account_id LIMIT ${i},${n} ;`))
    }
    res.status(200).send({ dataPlayersMatches });
  } else if(body === "matches" ){
   // matches
  const [count] = await queryMySql('SELECT COUNT(*) FROM MATCHES');
  const tableNumberRows = +count['COUNT(*)']
  console.log('tableNumberRows', tableNumberRows);
  const dataMatches = [];
  const n = 1000; 
    for (let i = 1; i < tableNumberRows; i += n) {
      dataMatches.push(...await queryMySql(`SELECT match_id FROM MATCHES LIMIT ${i},${n};`).then((data) => (data.length > 0 ? data.map((x) => x.match_id) : [])))
    }
  res.status(200).send({ dataMatches });
    } else if(body === "players" ){
    // players
    const [count] = await queryMySql('SELECT COUNT(*) FROM PLAYERS');
  const tableNumberRows = +count['COUNT(*)']
  console.log('tableNumberRows', tableNumberRows);
  const dataPlayers = [];
  const n = 1000; 
  for (let i = 1; i < tableNumberRows; i += n) {
    dataPlayers.push( ... await queryMySql(`SELECT account_id FROM PLAYERS LIMIT ${i},${n};`).then((data) => (data.length > 0 ? data.map((x) => x.account_id) : [])))
  }
    res.status(200).send({ dataPlayers });
    } else{
      res.status(500).json("error parameter");
    }
  } else {
    res.status(500).json(connection);
  }
}
