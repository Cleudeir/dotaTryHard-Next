/* eslint-disable array-callback-return */
export default function MatchesPlayers(props) {
  const matchesSingle = new Set();
  props.map((match) => {
    matchesSingle.add(match.match_id);
  });
  const matches = [...matchesSingle];
  return matches;
}
