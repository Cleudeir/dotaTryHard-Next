export default function MatchsPlayers(props) {
  const matchsSingle = new Set();
  props.map((match) => {
    matchsSingle.add(match.match_id);
    return '';
  });
  const matchs = [...matchsSingle];
  return matchs;
}
