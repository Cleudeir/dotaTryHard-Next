export default async function Matchs(req, res) {
  // get the client
  const mysql = require('mysql2/promise');
  const infoMatches = JSON.parse(req.body);

  // get the promise implementation, we will use bluebird
  /* if (!localStorage.getItem('data')) {
    res.status(500).json('data undefined');
  } */

  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: 'localhost', user: 'root', database: 'dotaTryHard',
  });

  await connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

  async function insertMatches(customer) {
    const sql = 'INSERT INTO matches(account_id,match_id,start_time,assists,deaths,denies,gold_per_min,hero_damage,hero_healing,kills,last_hits,net_worth,tower_damage,xp_per_min,win) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [customer.account_id,
      customer.match_id,
      customer.start_time,
      customer.assists,
      customer.deaths,
      customer.denies,
      customer.gold_per_min,
      customer.hero_damage,
      customer.hero_healing,
      customer.kills,
      customer.last_hits,
      customer.net_worth,
      customer.tower_damage,
      customer.xp_per_min,
      customer.win];
    const insertValue = await connection.query(sql, values);
    return insertValue;
  }
  for (let i = 0; i < infoMatches.length; i += 1) {
    console.log(`${i}/${infoMatches.length}`);
    insertMatches(infoMatches[i]);
  }

  res.status(200).json(infoMatches);
}
