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
    return queryMatches;
  }
  async function playersMatchesInsert(props) {
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
moonshard
) VALUES (
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
${props.win},
${props.ability.ability_0},
${props.ability.ability_1},
${props.ability.ability_2},
${props.ability.ability_3},
${props.level},
${props.team},
${props.leaver_status},
${props.item.aghanims_scepter},
${props.item.aghanims_shard},
${props.item.backpack_0},
${props.item.backpack_1},
${props.item.backpack_2},
${props.item.item_0},
${props.item.item_1},
${props.item.item_2},
${props.item.item_3},
${props.item.item_4},
${props.item.item_5},
${props.item.item_neutral},
${props.item.moonshard}
);`;
    const queryPlayersMatches = await queryMySql(playersMatches);
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
