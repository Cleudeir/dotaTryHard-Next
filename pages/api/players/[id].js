/* eslint-disable camelcase */
import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListPlayers from '../../../back/math/ListPlayers';

export default async function Players(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  const result = (await ListPlayers(pull)).splice(0, 25);

  res.status(200).send(result);
}
