import GetMatchDetails from '../../back/get/GetMatchDetails';
import MatchDetails from '../../back/math/MatchDetails';

export default async function Status(req, res) {
  const body = JSON.parse(req.body);
  const pull = await GetMatchDetails(body);
  const result = await MatchDetails(pull);
  res.status(200).json(result);
}
