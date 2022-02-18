import API from './API';

export default async function GetPlayerSummaries(props) {
  const SteamID = require('steamid');
  const api = await API();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const steamId = new SteamID(`[U:1:${props[i]}]`).getSteamID64();

    console.log(`Profile : ${i}/${props.length}`);
    const request = fetch(
      `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.response.players.length > 0) {
          const x = data.response.players[0];
          return x;
        }
        return null;
      })
      .catch(() => null);
    array.push(request);
  }
  const promise = await Promise.all(array);

  const result = [];
  for (let j = 0; j < promise.length; j += 1) {
    const profile = promise[j];
    if (profile) {
      result.push({ ...profile, account_id: props[j] });
    } else {
      result.push({
        personaname: 'unknown',
        avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
        loccountrycode: '',
        account_id: props[j],
      });
    }
  }

  return result;
}
