import Api from './api';

export default async function GetMatchHistory(props) {
  const api = await Api();
  const request = await fetch(
    `${api.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props}&game_mode=${api.game_mode}&key=${api.key_api}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const x = data.result.matches;
      return x;
    })
    .catch((error) => {console.log(error.message); return null});

  return request;
}
