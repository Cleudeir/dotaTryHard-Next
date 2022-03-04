/* eslint-disable no-await-in-loop */
import api from './Api';

export default async function GetMatchDetails(props) {
  const infoApi = await api();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const request = await fetch(`${infoApi.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${infoApi.key_api}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          return data.result;
        }
        return null;
      })
      .catch((error) => {
        console.log(error.message); return null;
      });
    array.push(request);
  }
  const promise = await Promise.all(array);
  const filter = promise.filter((x) => x != null);
  return filter;
}
