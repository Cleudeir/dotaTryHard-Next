/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import Connect from '../../../back/data/Connect';

export default async function Write(req, res) {
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
    if (!queryPlayers.affectedRows) { console.log('queryPlayers', queryPlayers); }
    return queryPlayers;
  }
  async function matchesInsert(props) {
    const matches = `insert into MATCHES (
      match_id,
      start_time,
      cluster,
      dire_score ,
      radiant_score ,
      duration
      ) values (
        ${props.match_id},
        ${props.start_time},
        '${props.cluster}',
        ${props.dire_score},
        ${props.radiant_score},
        ${props.duration}          
        );`;
    const queryMatches = await queryMySql(matches);
    if (!queryMatches.affectedRows) { console.log('queryMatches', queryMatches); }
    return queryMatches;
  }
  async function playersMatchesInsert(data) {
    const playersMatches = ` 
    insert into PLAYERS_MATCHES  (
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
    win,
    ability_0,
    ability_1,
    ability_2,
    ability_3,
    Hero_level,
    team,
    leaver_status,
    aghanims_scepter,
    aghanims_shard,
    backpack_0,
    backpack_1,
    backpack_2,
    item_0,
    item_1,
    item_2,
    item_3,
    item_4,
    item_5,
    item_neutral,
    moonshard,
    hero_id,
    player_slot
    ) VALUES (
      '${data.account_id}',
      '${data.match_id}',
      '${data.assists}',    
      '${data.deaths}',
      '${data.denies}',
      '${data.gold_per_min}',
      '${data.hero_damage}',    
      '${data.hero_healing}',
      '${data.kills}',
      '${data.last_hits}',
      '${data.net_worth}',
      '${data.tower_damage}',
      '${data.xp_per_min}',
      '${data.win}',
      '${data.ability.ability_0}',
      '${data.ability.ability_1}',
      '${data.ability.ability_2}',
      '${data.ability.ability_3}',
      '${data.level}',
      '${data.team}',
      '${data.leaver_status}',
      '${data.item.aghanims_scepter}',
      '${data.item.aghanims_shard}',
      '${data.item.backpack_0}',
      '${data.item.backpack_1}',
      '${data.item.backpack_2}',
      '${data.item.item_0}',
      '${data.item.item_1}',
      '${data.item.item_2}',
      '${data.item.item_3}',
      '${data.item.item_4}',
      '${data.item.item_5}',
      '${data.item.item_neutral}',
      '${data.item.moonshard}',
      '${data.hero_id}',
      '${data.player_slot}');`;
    const queryPlayersMatches = await queryMySql(playersMatches);
    if (!queryPlayersMatches.affectedRows) { console.log('queryPlayersMatches', queryPlayersMatches); }
    return queryPlayersMatches;
  }

  if (connection) {
    const writeProfiles = [];
    const writeMatches = [];
    const writePlayersMatches = [];

    for (let i = 0; i < profiles.length; i += 1) {
      writeProfiles.push(playersInsert(profiles[i]));
    }

    for (let i = 0; i < status.length; i += 1) {
      writeMatches.push(matchesInsert(status[i].m));

      for (let j = 0; j < status[i].mp.length; j += 1) {
        writePlayersMatches.push(playersMatchesInsert(status[i].mp[j]));
      }
    }

    res.status(200).json(
      {
        writeProfiles,
        writeMatches,
        writePlayersMatches,
      },
    );
  } else {
    res.status(500).send(connection);
  }
}
