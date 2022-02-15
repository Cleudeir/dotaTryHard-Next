import GetMatchHistory from '../../../back_end/get/GetMatchHistory';
import MatchesPlayers from '../../../back_end/math/MatchesPlayers';

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
