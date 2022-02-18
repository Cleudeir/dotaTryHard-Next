import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListMatchs from '../../../back_end/math/ListMatchs';

export default async function Matchs(req, res) {
  const { id } = req.query;
  console.log(id);
  const pull = await GetMatchHistory(id);
  const result = ListMatchs(pull);
  res.status(200).json(result.splice(0, 25));
}
