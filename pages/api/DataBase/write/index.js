import connect from '../../../../back_end/data/Connect';

export default async function Matchs(req, res) {
  const { status, profiles } = JSON.parse(req.body);
  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err.message);
    return result;
  }

  async function insert01(props) {
    const players = `insert into players (
    account_id,
    personaname,
    avatarfull,
    loccountrycode) 
    values (
      '${props.account_id}',
      '${props.personaname}',
      '${props.avatarfull}',
      '${props.loccountrycode}');`;
    const a = await queryMySql(players);
    return { a };
  }

  async function insert02(props) {
    const matches = `insert into matches (
      match_id,
      start_time) 
      values (
        ${props.match_id},
        ${props.start_time}
        );`;

    const playersMatches = ` 
     insert into players_matches  (
      id,
      account_id,
      match_id,
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
      win) 
      VALUES (
      ${props.account_id + props.match_id},
      ${props.account_id},
      ${props.match_id},
      ${props.assists},    
      ${props.deaths},
      ${props.denies},
      ${props.gold_per_min},
      ${props.hero_damage},    
      ${props.hero_healing},
      ${props.kills},
      ${props.last_hits},
      ${props.net_worth},
      ${props.tower_damage},
      ${props.xp_per_min},
      ${props.win});`;

    const a = await queryMySql(matches);
    const b = await queryMySql(playersMatches);

    return { a, b };
  }

  if (connection) {
    const array01 = [];
    const array02 = [];
    for (let i = 0; i < profiles.length; i += 1) {
      array02.push(await insert01(profiles[i]));
    }

    for (let i = 0; i < status.length; i += 1) {
      array01.push(await insert02(status[i]));
    }
    const select = 'select * from players_matches;';

    res.status(200).json(
      await queryMySql(select),
    );
  }
  res.status(500).json('Erro connection');
}
