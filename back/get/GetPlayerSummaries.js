/* eslint-disable no-await-in-loop */
import Api from './Api';

const SteamID = require('steamid');

export default async function GetPlayerSummaries(props) {
  const arrayPlayers = props;
  const api = await Api();
  const array = [];
  for (let n = 0; n < arrayPlayers.length; n += 1) {
    const accountId = arrayPlayers[n];
    console.log('account_id', accountId);
    const steamId = new SteamID(`[U:1:${accountId}]`).getSteamID64();
    console.log('steam_id', steamId);

    const request = await fetch(`${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response.players.length > 0) {
          const x = data.response.players[0];
          return { ...x, account_id: accountId };
        }
        return {
          account_id: accountId,
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
