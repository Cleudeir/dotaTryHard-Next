const SteamID = require("steamid");
export async function Math_players_single(props) {
  let array = [];
  let players_single = new Set();
  for (let i = 0; i < props.length; i++) {
    props[i].map((match) => {
      match.players.map((player, id) => players_single.add(player.account_id));
    });
  }
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
  let array = [];
  let matchs_single = new Set();
  for (let i = 0; i < props.length; i++) {
    props[i].map((match) => {
      matchs_single.add(match.match_id);
    });
  }
  let matchs = [...matchs_single];
  array.push(matchs);
  return array;
}

export function Math_status_players(props) {
  let array = [];

  for (let i = 0; i < props.players_gamed.length; i++) {
    let a = props.gamed_details[i].players;
    //.filter((x) => x.account_id === props.players_gamed[i]);
    if (a.length > 0) {
      array.push(a);
    }
  }
  return array;
}
