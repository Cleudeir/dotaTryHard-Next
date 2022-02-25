export default function ListMatchs(props) {
  const matchesSingle = new Set();
  props.map((match) => {
    matchesSingle.add(match.match_id);
    return [];
  });
  const matches = [...matchesSingle];
  return matches;
}
