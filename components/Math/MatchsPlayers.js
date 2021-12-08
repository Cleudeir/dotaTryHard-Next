export function MatchsPlayers(props) {
  let matchs_single = new Set();
  props.map((match) => {
    matchs_single.add(match.match_id);
  });
  let matchs = [...matchs_single];
  return matchs;
}
