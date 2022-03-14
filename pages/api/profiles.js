/* eslint-disable camelcase */
import GetPlayerSummaries from '../../back/get/GetPlayerSummaries';

export default async function Profiles(req, res) {
  console.log('Profiles');
  const body = JSON.parse(req.body);
  const get = await GetPlayerSummaries(body);
  async function filter() {
    const result = [];
    for (let i = 0; i < get.length; i += 1) {
      if (!get[i].personaname) { continue; }
      if (!get[i].avatarfull) { get[i].avatarfull = 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/'; }
      if (!get[i].loccountrycode) { get[i].loccountrycode = ''; }

      const {
        personaname, avatarfull, loccountrycode, account_id,
      } = get[i];

      result.push({
        personaname: personaname.replace(/'/g, '').replace(/"/g, ''),
        avatarfull,
        loccountrycode,
        account_id,
      });
    }
    return result;
  }
  const result = await filter();
  res.status(200).json(result);
}
