export default async function ListMatchs(props) {
  const matchesSingle = new Set();
  props.map((match) => {
    matchesSingle.add(match.match_id);
    return [];
  });
  const matches = [...matchesSingle].filter((x) => x > null);
  return matches;
}
