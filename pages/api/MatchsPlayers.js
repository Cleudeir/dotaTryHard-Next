import GetMatchHistory from '../../components/get/GetMatchHistory';

export default async function MatchsPlayers(req, res) {
  const pull = await GetMatchHistory(
    { account_id: 87683422 },
  );
  res.status(200).json({
    ola: 'ola',
    pull,
  });
}
