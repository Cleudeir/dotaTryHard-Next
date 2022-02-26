import Api from './Api';

export default async function GetPlayerSummaries(props) {
  const SteamID = require('steamid');
 


  const api = await Api();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const steamId = new SteamID(`[U:1:${props[i]}]`).getSteamID64();
    const request = fetch(`${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`,)
      .then((response) => response.json())
      .then((data) => {
        if (data.response.players.length > 0) {
          const x = data.response.players[0];
          return x;
        }
        return null;
      })
      .catch((error) => {console.log(error.message); return null});
    array.push(request);
  }
  const promise = await Promise.all(array);
  
  const result = [];
  for (let j = 0; j < promise.length; j += 1) {    
    const profile = promise[j];
    let steam_id = new SteamID(`${profile.steamid}`);
    let unfilteredAccountId = steam_id.getSteam3RenderedID();
    let account_id = unfilteredAccountId.slice(5,50).replace(']', "");
    result.push({ ...profile, account_id });
  }

  const filter = result.filter((x) => x.personaname != null);

  return filter;
}
