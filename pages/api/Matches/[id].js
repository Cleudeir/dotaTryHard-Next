import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListMatchs from '../../../back_end/math/ListMatchs';

export default async function Matches(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  const result = ListMatchs(pull);
  res.status(200).json(result.splice(0, 25));
}
