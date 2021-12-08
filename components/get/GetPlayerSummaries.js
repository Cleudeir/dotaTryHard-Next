const api = {
  base_url: "http://api.steampowered.com/",
  game_mode: 18,
  key_api: "048776627077105958873BA4C749CEFF",
};

export async function GetPlayerSummaries(props) {
  let request = await fetch(
    `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${props.steam_id}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let x = data.response.players[0];
      return x;
    })
    .catch(() => {
      return error.mensage;
    });
  return request;
}
