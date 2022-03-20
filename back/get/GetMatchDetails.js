/* eslint-disable no-await-in-loop */
import api from './Api';

export default async function GetMatchDetails(props) {
  console.log('matches');
  const matches = props;
  const infoApi = await api();
  const array = [];
  function sleep(ms) {
    return new Promise(
      (resolve) => setTimeout(resolve, ms),
    );
  }
  const time = Date.now();
  for (let i = 0; i < matches.length; i += 1) {
    await sleep(50);
    const request = fetch(`${infoApi.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${matches[i]}&key=${infoApi.key_api}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          return data.result;
        }
        return null;
      })
      .catch((error) => {
        console.log('error Datails:', error.message); return null;
      });
    array.push(request);
  }
  console.log((-time + Date.now()) / 1000, 's');
  const promise = await Promise.all(array);
  const result = promise.filter((x) => x != null);
  return result;
}
