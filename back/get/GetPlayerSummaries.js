import Api from './Api';

const SteamID = require('steamid');

export default async function GetPlayerSummaries(props) {
  const api = await Api();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const steamId = new SteamID(`[U:1:${props[i]}]`).getSteamID64();
    const request = fetch(`${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response.players.length > 0) {
          const x = data.response.players[0];
          return { ...x, account_id: props[i] };
        }
        return null;
      })
      .catch((error) => { console.log(error.message); return null; });
    array.push(request);
  }
  const promise = await Promise.all(array);

  return promise;
}
