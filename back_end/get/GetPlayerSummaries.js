export default async function GetPlayerSummaries(props) {
  const SteamID = require('steamid');

  const api = {
    base_url: 'http://api.steampowered.com/',
    game_mode: 18,
    key_api: '048776627077105958873BA4C749CEFF',
  };
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const steamId = new SteamID(`[U:1:${props[i]}]`).getSteamID64();
    console.log(`${i}/${props.length}`);
    const request = fetch(
      `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const x = data.response.players[0];
        return x;
      })
      .catch((error) => error.message);
    array.push(request);
  }
  const promise = await Promise.all(array).then((x) => x);

  const result = [];
  for (let j = 0; j < promise.length; j += 1) {
    if (promise[j]) {
      result.push({ ...promise[j], account_id: props[j] });
    }
  }

  return result;
}
