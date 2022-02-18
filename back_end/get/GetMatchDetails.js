import API from '../../API';

export default async function GetMatchDetails(props) {
  const api = API();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    console.log(`${i + 1}/${props.length}`);
    const request = fetch(
      `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${api.key_api}`,
    )
      .then((response) => response.json())
      .then((data) => data.result)
      .catch((error) => error.massage);

    array.push(request);
  }
  const promise = await Promise.all(array).then((x) => x);
  const filter = await promise.filter((x) => x != null);
  return filter;
}
