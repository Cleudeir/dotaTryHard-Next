import connect from '../../../../back_end/data/Connect';

export default async function Matchs(req, res) {
  const { id } = req.query;
  const { status, profile } = JSON.parse(req.body);

  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }

  async function insertProfile(props) {
    const value = [
      props.account_id,
      props.personaname,
      props.avatarfull,
      props.loccountrycode];

    const insertInto = `INSERT INTO profile(          
    account_id,
    personaname,
    avatarfull,
    loccountrycode) VALUES (?,?,?,?);`;
    const result = await queryMySql(insertInto, value);
    return result;
  }

  async function insertPlayer(props) {
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

  if (connection) {
    const createTableStatus = `create table IF NOT EXISTS n_${id}  (
    match_id bigint unsigned not null,
    start_time int unsigned,
    assists int unsigned,
    deaths int unsigned,
    denies int unsigned,
    gold_per_min int unsigned,
    hero_damage int unsigned,
    hero_healing int unsigned,
    kills int unsigned,
    last_hits int unsigned,
    net_worth int unsigned,
    tower_damage int unsigned,
    xp_per_min int unsigned,
    win int unsigned,
    primary key(match_id)
  )`;
    await queryMySql(createTableStatus);

    const players = [];
    for (let i = 0; i < status.length; i += 1) {
      players.push(await insertPlayer(status[i]));
    }

    const createTableProfile = `create table IF NOT EXISTS profile  (
    account_id int unsigned,
    personaname varchar(25),
    avatarfull text,
    loccountrycode varchar(2),
    primary key(account_id)
  )`;
    await queryMySql(createTableProfile);

    const profiles = await insertProfile(profile);

    res.status(200).json(
      {
        players,
        profiles,
      },
    );
  }
  res.status(500).json('Erro connection');
}
