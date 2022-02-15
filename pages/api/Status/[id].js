import GetMatchDetails from '../../../back_end/get/GetMatchDetails';
import StatusPlayers from '../../../back_end/math/StatusPlayers';

export default async function Details(req, res) {
  const { id } = req.query;
  const IdList = JSON.parse(req.body);
  const pull = await GetMatchDetails(
    IdList,
  );
  const calcStatus = StatusPlayers(pull).filter((x) => +x.account_id === +id);
  res.status(200).json(
    calcStatus,
  );
}
