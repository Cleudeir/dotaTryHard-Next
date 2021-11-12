const SteamID = require("steamid");
export function Math_players_single(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    let players_single = new Set();
    props[i].map((match) => {
      match.players.map((player) => players_single.add(player.account_id));
    });

    let players = [...players_single];
    array.push(players);
  }
  return array;
}

export function Math_matchs_single(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    let matchs_single = new Set();
    props[i].map((match) => {
      matchs_single.add(match.match_id);
    });
    let matchs = [...matchs_single];
    array.push(matchs);
  }
  return array;
}

export async function Math_obj_ids(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    let obj_id = new Set();

    obj_id.add({
      account_id: props[i],
      steam_id: await new SteamID(`[U:1:${props[i]}]`),
    });

    let obj = [...obj_id];
    array.push(obj);
  }
  return array;
}
