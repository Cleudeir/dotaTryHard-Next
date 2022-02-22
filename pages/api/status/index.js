import GetMatchDetails from '../../../back_end/get/GetMatchDetails';
import StatusPlayers from '../../../back_end/math/StatusPlayers';

export default async function Status(req, res) {
  const body = JSON.parse(req.body);
  const pull = await GetMatchDetails(body);
  const result = await StatusPlayers(pull);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}
