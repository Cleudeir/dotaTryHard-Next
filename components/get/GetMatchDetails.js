const api = {
  base_url: 'http://api.steampowered.com/',
  game_mode: 18,
  key_api: '048776627077105958873BA4C749CEFF',
};

export default async function GetMatchDetails(props) {
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const request = fetch(
      `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${api.key_api}`,
    )
      .then((response) => response.json())
      .then((data) => data.result)
      .catch(() => ({}));
    array.push(request);
  }
  return array;
}
