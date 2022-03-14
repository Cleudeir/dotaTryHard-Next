/* eslint-disable no-await-in-loop */
import Api from './Api';

const SteamID = require('steamid');

export default async function GetPlayerSummaries(props) {
  const api = await Api();
  const array = [];
  for (let i = 0; i < props.length; i += 1) {
    const steamId = new SteamID(`[U:1:${props[i]}]`).getSteamID64();
    const request = await fetch(`${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response.players.length > 0) {
          const x = data.response.players[0];
          return { ...x, account_id: props[i] };
        }
        return {
          account_id: props[i],
          personaname: 'unknown',
          avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
          loccountrycode: '',
        };
      })
      .catch((error) => { console.log(error); return null; });
    array.push(request);
  }
  const promise = await Promise.all(array);
  const result = promise.filter((x) => x != null);

  return result;
}
