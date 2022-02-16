export default async function PlayersSingle(props) {
  const playersSingle = new Set();
  props.map((match) => {
    match.players.map(
      (player) => {
        playersSingle.add(player.account_id);
        return null;
      },
    );
    return null;
  });
  const players = [...playersSingle];

  return players;
}
