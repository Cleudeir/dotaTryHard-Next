/* eslint-disable camelcase */
import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import GetPlayerSummaries from '../../../back_end/get/GetPlayerSummaries';
import ListPlayers from '../../../back_end/math/ListPlayers';

export default async function Matchs(req, res) {
  const { id } = req.query;
  const accountId = await id;
  const pull = await GetMatchHistory(accountId);
  const players = await ListPlayers(pull);
  const result = [];

  const get = await GetPlayerSummaries(players);
  for (let i = 0; i < get.length; i += 1) {
    if (!get[i].loccountrycode) { get[i].loccountrycode = ''; }
    const {
      personaname, avatarfull, loccountrycode, account_id,
    } = get[i];

    if (personaname && avatarfull && account_id) {
      result.push({
        personaname,
        avatarfull,
        loccountrycode,
        account_id,
      });
    }
  }

  res.status(200).json(result);
}
