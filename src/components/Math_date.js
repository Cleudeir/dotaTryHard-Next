export function Players_found(props) {
    console.log(props)
  let players_unicos = new Set();
  props.map((match) => {
    match.players.map((player) => players_unicos.add(player.account_id));
  });
  
  let player = [...players_unicos].sort()
  return player;
}
