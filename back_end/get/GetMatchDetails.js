import API from './API';

export default async function GetMatchDetails(props) {
  const api = await API();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const request = fetch(
      `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${api.key_api}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          return data.result;
        }
        return null;
      })
      .catch(() => null);

    array.push(request);
  }
  const promise = await Promise.all(array);
  const filter = await promise.filter((x) => x != null);
  return filter;
}
