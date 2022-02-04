import GetMatchDetails from '../../../components/get/GetMatchDetails';
import StatusPlayers from '../../../components/math/StatusPlayers';

export default async function Details(req, res) {
  const { id } = req.query;
  const convert = JSON.parse(id);
  const pull = await GetMatchDetails(
    convert,
  );
  const calcStatus = StatusPlayers(pull);
  res.status(200).json(
    calcStatus,
  );
}
