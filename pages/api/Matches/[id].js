import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListMatchs from '../../../back_end/math/ListMatchs';

export default async function Matchs(req, res) {
  const { id } = req.query;
  const accountId = id;

  const pull = await GetMatchHistory(accountId);
  const player = ListMatchs(pull);
  res.status(200).json(
    player,
  );
}
