import API from '../../API';

export default async function GetMatchHistory(props) {
  const api = API();
  const request = await fetch(
    `${api.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props}&game_mode=${api.game_mode}&key=${api.key_api}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const x = data.result.matches;
      return x;
    })
    .catch((error) => error.message);

  return request;
}
