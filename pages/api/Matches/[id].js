import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import ListMatchs from '../../../back_end/math/ListMatchs';

export default async function Matches(req, res) {
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  const result = (await ListMatchs(pull)).splice(0, 25);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}
