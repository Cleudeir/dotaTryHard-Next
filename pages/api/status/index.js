import GetMatchDetails from '../../../back_end/get/GetMatchDetails';
import StatusPlayers from '../../../back_end/math/StatusPlayers';

export default async function Details(req, res) {
  const IdList = JSON.parse(req.body);
  const pull = await GetMatchDetails(
    IdList,
  );
  const result = StatusPlayers(pull);
  res.status(200).json(result);
}
