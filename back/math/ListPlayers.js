export default async function ListPlayers(props) {
  const playersSingle = new Set();
  props.map((match) => {
    match.players.map(
      (player) => {
        if (+player.account_id === 4294967295) {
          playersSingle.add(player.player_slot + 1);
        } else {
          playersSingle.add(player.account_id);
        }
        return null;
      },
    );
    return null;
  });
  const players = [...playersSingle];
  const result = players.filter((x) => x > 0);

  return result;
}
