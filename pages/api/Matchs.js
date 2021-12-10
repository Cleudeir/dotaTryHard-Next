import GetMatchHistory from '../../components/get/GetMatchHistory';
import MatchsPlayers from '../../components/math/MatchsPlayers';
import PlayersSingle from '../../components/math/PlayersSingle';

export default async function Matchs(req, res) {
  const pull = await GetMatchHistory(
    { account_id: 87683422 },
  );
  const matchs = await MatchsPlayers(pull);
  const players = await PlayersSingle(pull);
  res.status(200).json(
    {
      players,
      matchs,
    },
  );
}
