/* eslint-disable camelcase */
import GetPlayerSummaries from '../../../back_end/get/GetPlayerSummaries';

export default async function Matchs(req, res) {
  const players = await JSON.parse(req.body);
  const get = await GetPlayerSummaries(players);

  async function filter() {
    const result = [];
    for (let i = 0; i < get.length; i += 1) {
      if (!get[i].loccountrycode) { get[i].loccountrycode = ''; }
      const {
        personaname, avatarfull, loccountrycode, account_id,
      } = get[i];

      if (personaname && avatarfull && account_id) {
        result.push({
          personaname: personaname.replace('\'', '').replace(' ', ''),
          avatarfull,
          loccountrycode,
          account_id,
        });
      }
    }
    return result;
  }
  const result = await filter();
  res.status(200).json(result);
}
