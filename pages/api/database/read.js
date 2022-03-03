/* eslint-disable no-await-in-loop */
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
    if (body === 'matches') {
      // matches
      const [count] = await queryMySql('SELECT COUNT(*) FROM MATCHES');
      const tableNumberRows = +count['COUNT(*)'];
      console.log('tableNumberRows', tableNumberRows);
      const dataMatches = [];
      const n = 1000;
      for (let i = 1; i < tableNumberRows; i += n) {
        const select = `SELECT match_id FROM MATCHES LIMIT ${i},${n};`;
        dataMatches.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.match_id) : [])));
      }
      res.status(200).send({ dataMatches }); }

    else if (body === 'players') {
      // players
      const [count] = await queryMySql('SELECT COUNT(*) FROM PLAYERS');
      const tableNumberRows = +count['COUNT(*)'];
      console.log('tableNumberRows', tableNumberRows);
      const dataPlayers = [];
      const n = 1000;
      for (let i = 1; i < tableNumberRows; i += n) {
        const select = `SELECT account_id FROM PLAYERS LIMIT ${i},${n};`;
        dataPlayers.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.account_id) : [])));
      }
      res.status(200).send({ dataPlayers });
    }

    else if (body === 'avg') {
      const avg = `SELECT * FROM PLAYERS JOIN
      (SELECT account_id,
            ROUND(AVG(assists),0) AS assists, 
            ROUND(AVG(kills),0) AS kills,
            ROUND(AVG(deaths),0) AS deaths,
            ROUND(AVG(denies),0) AS denies,
            ROUND(AVG(gold_per_min),0) AS gold_per_min,
            ROUND(AVG(hero_damage),0) AS hero_damage,
            ROUND(AVG(hero_healing),0) AS hero_healing,
            ROUND(AVG(last_hits),0) AS last_hits,
            ROUND(AVG(net_worth),0) AS net_worth,
            ROUND(AVG(tower_damage),0) AS tower_damage,
            ROUND(AVG(xp_per_min),0) AS xp_per_min,
            SUM(win) AS win,
            COUNT(account_id) AS matches
           FROM PLAYERS_MATCHES      
           GROUP BY account_id
           ) as tabela      
           on tabela.account_id = PLAYERS.account_id;`;

      const dataAvg = (await queryMySql(avg)).filter((x) => x.matches >= 20);

      const avgAll = `SELECT 
      ROUND(AVG(assists),0) AS assists, 
      ROUND(AVG(kills),0) AS kills,
      ROUND(AVG(deaths),0) AS deaths,
      ROUND(AVG(denies),0) AS denies,
      ROUND(AVG(gold_per_min),0) AS gold_per_min,
      ROUND(AVG(hero_damage),0) AS hero_damage,
      ROUND(AVG(hero_healing),0) AS hero_healing,
      ROUND(AVG(last_hits),0) AS last_hits,
      ROUND(AVG(net_worth),0) AS net_worth,
      ROUND(AVG(tower_damage),0) AS tower_damage,
      ROUND(AVG(xp_per_min),0) AS xp_per_min,
      SUM(win) AS win,
      COUNT(account_id) AS matches
      FROM PLAYERS_MATCHES;`;

      const dataAvgAll = (await queryMySql(avgAll))[0];

      res.status(200).send({ dataAvg, dataAvgAll });
    }
    else {
      res.status(500).json('error parameter');
    }
  } else {
    res.status(500).json(connection);
  }
}
