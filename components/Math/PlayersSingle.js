const SteamID = require("steamid");
export async function PlayersSingle(props) {
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
