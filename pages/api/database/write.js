/* eslint-disable camelcase */
import Connect from '../../../back/data/Connect';

export default async function Write(req, res) {
  console.log('Write');
  const { status, profiles } = JSON.parse(req.body);
  const connection = await Connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err.message);
    return result;
  }
  async function playersInsert(props) {
    const players = `insert into PLAYERS (
    account_id,
    personaname,
    avatarfull,
    loccountrycode) 
    values (
      '${props.account_id}',
      '${props.personaname}',
      '${props.avatarfull}',
      '${props.loccountrycode}');`;
    const queryPlayers = await queryMySql(players);
    return queryPlayers;
  }
  async function matchesInsert(props) {
    const matches = `insert into MATCHES (
      match_id,
      start_time) 
      values (
        ${props.match_id},
        ${props.start_time}
        );`;
    const queryMatches = await queryMySql(matches);
    return queryMatches;
  }
  async function playersMatchesInsert(props) {
    const playersMatches = ` 
     insert into PLAYERS_MATCHES  (
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
    const queryPlayersMatches = await queryMySql(playersMatches);
    return queryPlayersMatches;
  }

  if (connection) {
    const writeProfiles = [];
    const writeMatches = [];
    const writePlayersMatches = [];

    // filter unique matches
    const uniqueMatches = new Set();
    for (let i = 0; i < status.length; i += 1) {
      uniqueMatches.add(status[i].match_id);
    }
    const transformArrayUniqueMatches = [...uniqueMatches];
    const arrayUniqueMatches = [];
    for (let i = 0; i < transformArrayUniqueMatches.length; i += 1) {
      const { match_id, start_time } = status.filter(
        (x) => x.match_id === transformArrayUniqueMatches[i],
      )[0];
      arrayUniqueMatches.push({ match_id, start_time });
    }
    //-------------------------------

    for (let i = 0; i < profiles.length; i += 1) {
      writeProfiles.push(playersInsert(profiles[i]));
    }

    for (let i = 0; i < arrayUniqueMatches.length; i += 1) {
      writeMatches.push(matchesInsert(arrayUniqueMatches[i]));
    }
    for (let i = 0; i < status.length; i += 1) {
      writePlayersMatches.push(playersMatchesInsert(status[i]));
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      writeProfiles,
      writeMatches,
      writePlayersMatches,
    });
  } else {
    res.status(500).send('Error');
  }
}
