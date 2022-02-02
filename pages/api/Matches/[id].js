import GetMatchHistory from '../../../components/get/GetMatchHistory';
import MatchesPlayers from '../../../components/math/MatchesPlayers';

export default async function Matchs(req, res) {
  const { id } = req.query;

  const pull = await GetMatchHistory(
    { account_id: id },
  );
  const player = MatchesPlayers(pull);
  res.status(200).json(
    player,
  );
}
