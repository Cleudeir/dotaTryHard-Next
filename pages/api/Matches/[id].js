import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListMatchs from '../../../back/math/ListMatchs';

export default async function Matches(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  const result = (await ListMatchs(pull)).splice(0, 25);

  res.status(200).json(result);
}
