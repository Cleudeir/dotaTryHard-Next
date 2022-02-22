/* eslint-disable camelcase */
import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListPlayers from '../../../back_end/math/ListPlayers';

export default async function Players(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  const result = (await ListPlayers(pull)).splice(0, 25);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}
