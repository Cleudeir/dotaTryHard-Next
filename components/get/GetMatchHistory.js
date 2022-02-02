const api = {
  base_url: 'http://api.steampowered.com/',
  game_mode: 18,
  key_api: '048776627077105958873BA4C749CEFF',
};

export default async function GetMatchHistory(props) {
  const request = await fetch(
    `${api.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props.account_id}&game_mode=${api.game_mode}&key=${api.key_api}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const x = data.result.matches;
      return x;
    })
    .catch((error) => error.message);

  return request;
}
