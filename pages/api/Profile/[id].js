import GetPlayerSummaries from '../../../back_end/get/GetPlayerSummaries';

const SteamID = require('steamid');

export default async function Matchs(req, res) {
  const { id } = req.query;
  const steam = new SteamID(`[U:1:${id}]`).getSteamID64();
  const pull = await GetPlayerSummaries(
    { steam_id: steam },
  );
  const { personaname, avatarfull, loccountrycode } = pull;
  res.status(200).json(
    {
      personaname, avatarfull, loccountrycode, account_id: +id,
    },
  );
}
