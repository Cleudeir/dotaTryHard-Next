/* eslint-disable no-await-in-loop */
/* eslint-disable brace-style */
import Connect from '../../../back/data/Connect';

export default async function Read(req, res) {
  const {
    body, country, accountId, min,
  } = JSON.parse(req.body);
  const region = [
    '"CHILE","BRAZIL","PERU","ARGENTINA","US WEST","US EAST","EUROPE","STOCKHOLM"',
    '"CHILE","BRAZIL","PERU","ARGENTINA"',
    '"US WEST","US EAST"',
    '"EUROPE","STOCKHOLM"',
  ];

  const connection = await Connect();
  async function queryMySql(request) {
    const result = await connection.query(request)
      .then((data) => data[0])
      .catch(() => []);
    return result;
  }

  const n = 5000;
  if (connection) {
    if (body === 'exist') {
      // matches
      const dataMatches = [];
      const [count01] = await queryMySql('SELECT COUNT(*) FROM MATCHES');
      const tableNumberRows01 = +count01['COUNT(*)'];

      for (let i = 0; i <= tableNumberRows01; i += n) {
        const select = `SELECT match_id FROM MATCHES LIMIT ${i},${n};`;
        dataMatches.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.match_id) : [])));
      }
      // players
      const dataPlayers = [];
      const [count02] = await queryMySql('SELECT COUNT(*) FROM PLAYERS');
      const tableNumberRows02 = +count02['COUNT(*)'];

      for (let i = 0; i <= tableNumberRows02; i += n) {
        const select = `SELECT account_id FROM PLAYERS LIMIT ${i},${n};`;
        dataPlayers.push(...await queryMySql(select)
          .then((data) => (data.length > 0 ? data.map((x) => x.account_id) : [])));
      }

      res.status(200).send({ dataMatches, dataPlayers });
    }

    else if (body === 'details') {
      const select01 = `
        select * from MATCHES
        where match_id
        in(
        (select match_id from
        (select
        account_id,match_id
        from PLAYERS_MATCHES
        where account_id = ${accountId}) as tabe)
        )
        order by start_time desc 
        LIMIT 0,5000;`;
      const dataDetailsMatch = await queryMySql(select01);

      const select02 = `
      select  * from 
      (
      select * from PLAYERS_MATCHES
      where match_id in(
      select match_id from
      (
      select
      account_id,match_id
      from PLAYERS_MATCHES
      where account_id = ${accountId}
      ) as tabe1
      ))as tab2 join PLAYERS on  tab2.account_id = PLAYERS.account_id 
      order by match_id,team LIMIT 0,5000;
      `;
      const dataDetailsStatus = await queryMySql(select02);
      res.status(200).send({ dataDetailsMatch, dataDetailsStatus });
    }

    else if (body === 'avg') {
      const avg = `
      SELECT * FROM PLAYERS JOIN
      (SELECT account_id,
      match_id,
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
      HAVING matches > ${min} 
      and account_id != 5 and account_id != 1 and account_id != 2 and account_id != 3 and account_id != 4
      and account_id != 133 and account_id != 129 and account_id != 130 and account_id != 131 and account_id != 132
      ORDER BY matches desc
      ) as tabela      
      on tabela.account_id = PLAYERS.account_id
      join (select match_id, cluster from MATCHES) 
      as tab on tab.match_id = tabela.match_id
      where cluster in(${region[country]});
      `;

      const avgAll = `
      SELECT 
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
      SUM(matches) AS matches
      FROM 
      (SELECT account_id,
      match_id,
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
      HAVING matches > ${min}
      and account_id != 0 and account_id != 1 and account_id != 2 and account_id != 3 and account_id != 4
      and account_id != 128 and account_id != 129 and account_id != 130 and account_id != 131 and account_id != 132
      ORDER BY matches desc
      ) as tabela
      join (select match_id, cluster from MATCHES) 
      as tab on tab.match_id = tabela.match_id
      where cluster in(${region[country]});
      `;
      const dataAvg = await queryMySql(avg);
      const [dataAvgAll] = (await queryMySql(avgAll));

      res.status(200).send({ dataAvg, dataAvgAll });
    }
    else {
      res.status(500).json('error parameter');
    }
  } else {
    res.status(500).json(connection);
  }
}
