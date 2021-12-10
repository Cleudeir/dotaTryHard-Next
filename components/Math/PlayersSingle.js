const SteamID = require('steamid');

export default async function PlayersSingle(props) {
  const array = [];
  const playersSingle = new Set();
  props.map((match) => {
    match.players.map((player) => playersSingle.add(player.account_id));
    return '';
  });
  const players = [...playersSingle];

  for (let i = 0; i < players.length; i += 1) {
    array.push({
      account_id: players[i],
      steam_id: new SteamID(`[U:1:${players[i]}]`),
    });
  }
  return array;
}
