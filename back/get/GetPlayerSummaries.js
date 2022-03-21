/* eslint-disable no-await-in-loop */
import Api from './Api';

const SteamID = require('steamid');

export default async function GetPlayerSummaries(props) {
  console.log('profile:');
  const players = props;
  const api = await Api();
  function sleep(ms) {
    return new Promise(
      (resolve) => setTimeout(resolve, ms),
    );
  }
  const time = Date.now();
  const array = [];
  for (let n = 0; n < players.length; n += 1) {
    const accountId = players[n];
    const steamId = new SteamID(`[U:1:${accountId}]`).getSteamID64();
    await sleep(50);
    let request = {};
    if (accountId < 200) {
      request = {
        account_id: accountId,
        personaname: 'unknown',
        avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
        loccountrycode: '',
      };
    } else {
      request = fetch(`${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${steamId}`)
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
        .catch((error) => { console.log('error Profile:', error.message); return null; });
    }
    array.push(request);
  }
  console.log((-time + Date.now()) / 1000, 's');
  const promise = await Promise.all(array);
  const result = promise.filter((x) => x != null);

  return result;
}
