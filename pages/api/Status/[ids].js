import GetMatchDetails from '../../../components/get/GetMatchDetails';
import StatusPlayers from '../../../components/math/StatusPlayers';

export default async function Details(req, res) {
  const { ids } = req.query;
  const convert = JSON.parse(ids).slice(0, 10);
  const pull = await GetMatchDetails(
    convert,
  );
  const calcStatus = StatusPlayers(pull);
  res.status(200).json(
    calcStatus,
  );
}
