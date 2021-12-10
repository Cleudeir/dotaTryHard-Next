/* eslint-disable array-callback-return */
export default function MatchsPlayers(props) {
  const matchsSingle = new Set();
  props.map((match) => {
    matchsSingle.add(match.match_id);
  });
  const matchs = [...matchsSingle];
  return matchs;
}
