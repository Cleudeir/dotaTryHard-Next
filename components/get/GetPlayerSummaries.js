const api = {
  base_url: 'http://api.steampowered.com/',
  game_mode: 18,
  key_api: '048776627077105958873BA4C749CEFF',
};

export default async function GetPlayerSummaries(props) {
  const request = await fetch(
    `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${props.steam_id}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const x = data.response.players[0];
      return x;
    })
    .catch((error) => error.mensage);
  return request;
}
