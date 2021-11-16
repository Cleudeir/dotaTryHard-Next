const SteamID = require("steamid");
export async function Math_players_single(props) {
  let array = [];
  let players_single = new Set();
  props.map((match) => {
    match.players.map((player) => players_single.add(player.account_id));
  });
  let players = [...players_single];
  
  for (let i = 0; i < players.length; i++) {
    array.push({
      account_id: players[i],
      steam_id: await new SteamID(`[U:1:${players[i]}]`),
    });
  }
  return array;
}

export function Math_matchs_single(props) {
  let matchs_single = new Set();
  props.map((match) => {
    matchs_single.add(match.match_id);
  });
  let matchs = [...matchs_single];
  return matchs;
}

export function Math_status_players(props) {
  let array = [];
  for (let i = 0; i < props.gamed_details.length; i++) {
    let { players, radiant_win, match_id } = props.gamed_details[i];
    let arry_index = [];
    for (let index = 0; index < players.length; index++) {
      let {
        assists,
        account_id,
        deaths,
        denies,
        gold_per_min,
        hero_damage,
        hero_healing,
        kills,
        last_hits,
        net_worth,
        player_slot,
        tower_damage,
        xp_per_min,
      } = players[index];

      let win = 0;
      if (radiant_win) {
        if (player_slot < 5) {
          win = 1;
        }
      } else {
        if (player_slot > 5) {
          win = 1;
        }
      }

      arry_index.push({
        assists,
        account_id,
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
        match_id,
      });
    }
    array.push(arry_index);
  }
  let obj = {
    assists: 0,
    deaths: 0,
    denies: 0,
    gold_per_min: 0,
    hero_damage: 0,
    hero_healing: 0,
    kills: 0,
    last_hits: 0,
    net_worth: 0,
    tower_damage: 0,
    xp_per_min: 0,
    win: 0,
    matchs: 0,
  };

  array
    .map((x) => x.filter((y) => y.account_id == props.parameter))
    .map((z) => z[0])
    .map((w) => {
      obj.assists += w.assists;
      obj.deaths += w.deaths;
      obj.denies += w.denies;
      obj.gold_per_min += w.gold_per_min;
      obj.hero_damage += w.hero_damage;
      obj.hero_healing += w.hero_healing;
      obj.kills += w.kills;
      obj.last_hits += w.last_hits;
      obj.net_worth += w.net_worth;
      obj.tower_damage += w.tower_damage;
      obj.xp_per_min += w.xp_per_min;
      obj.win += w.win;
      obj.matchs += 1;
    });

  if (obj.matchs !== 0) {
    obj.assists = parseInt(obj.assists / obj.matchs);
    obj.denies = parseInt(obj.denies / obj.matchs);
    obj.deaths = parseInt(obj.deaths / obj.matchs);
    obj.gold_per_min = parseInt(obj.gold_per_min / obj.matchs);
    obj.hero_damage = parseInt(obj.hero_damage / obj.matchs);
    obj.hero_healing = parseInt(obj.hero_healing / obj.matchs);
    obj.kills = parseInt(obj.kills / obj.matchs);
    obj.last_hits = parseInt(obj.last_hits / obj.matchs);
    obj.net_worth = parseInt(obj.net_worth / obj.matchs);
    obj.tower_damage = parseInt(obj.tower_damage / obj.matchs);
    obj.xp_per_min = parseInt(obj.xp_per_min / obj.matchs);
    obj.win = parseInt((obj.win / obj.matchs) * 100);
  }

  return obj;
}
