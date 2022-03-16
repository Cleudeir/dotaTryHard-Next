/* eslint-disable camelcase */
import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListPlayers from '../../../back/math/ListPlayers';

export default async function Players(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  if (pull.data) {
    const list = await ListPlayers(pull.data);
    res.status(200).json(
      {
        status: pull.status,
        message: pull.message,
        data: list,
      },
    );
  } else {
    res.status(200).json(pull);
  }
}
