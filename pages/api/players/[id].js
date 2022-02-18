/* eslint-disable camelcase */
import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListPlayers from '../../../back_end/math/ListPlayers';

export default async function Matchs(req, res) {
  const { id } = req.query;

  const pull = await GetMatchHistory(id);

  const result = await ListPlayers(pull);

  res.status(200).json(result);
}
