export default async function Matchs(req, res) {
  const mysql = require('mysql2/promise');
  const { id } = req.query;
  const infoMatches = JSON.parse(req.body);

  const connection = await mysql.createConnection(
    {
      host: 'localhost', user: 'root', database: 'dotaTryHard',
    },
  )
    .catch(() => console.log('error connection'));

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }

  const createTable = `create table IF NOT EXISTS n_${id}  (
    match_id bigint unsigned,
    start_time int unsigned,
    assists int unsigned,
    deaths int unsigned,
    denies int unsigned,
    gold_per_min int unsigned,
    hero_damage int unsigned,
    hero_healing int unsigned,
    kills int unsigned,
    last_hits int unsigned not null ,
    net_worth int unsigned,
    tower_damage int unsigned,
    xp_per_min int unsigned,
    win int unsigned,
    primary key(match_id)
  )`;
  await queryMySql(createTable);

  async function insert(props) {
    const value = [
      props.match_id,
      props.start_time,
      props.assists,
      props.deaths,
      props.denies,
      props.gold_per_min,
      props.hero_damage,
      props.hero_healing,
      props.kills,
      props.last_hits,
      props.net_worth,
      props.tower_damage,
      props.xp_per_min,
      props.win];

    const insertInto = `INSERT INTO n_${id}(          
            match_id,
            start_time,
            assists,
            deaths,
            denies,
            gold_per_min,
            hero_damage,
            hero_healing,
            kills,
            last_hits,
            net_worth,
            tower_damage,
            xp_per_min,
            win) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ;`;
    const result = await queryMySql(insertInto, value);
    return result;
  }
  const InsertArray = [];
  for (let i = 0; i < infoMatches.length; i += 1) {
    InsertArray.push(await insert(infoMatches[i]));
  }

  res.status(200).json(
    InsertArray,
  );
}
