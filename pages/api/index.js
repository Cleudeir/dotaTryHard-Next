/* eslint-disable react-hooks/rules-of-hooks */
const SteamID = require("steamid");
import {
  Math_matchs_single,
  Math_players_single,
  Math_status_players,
} from "../../src/components/Math_data";
import {
  GetMatchHistory,
  GetPlayerSummaries,
  GetMatchDetails,
} from "../../src/components/Type_requests";

export default async function handler(req, res) {
  const parameter = req.query.account_id;
  const first = {
    account_id: parameter,
    steam_id: await new SteamID(`[U:1:${parameter}]`),
  };

  let matchHistory = await GetMatchHistory(first);
  let profile = await GetPlayerSummaries(first);
  let players_gamed = await Math_players_single(matchHistory);
  let matchs_gamed = await Math_matchs_single(matchHistory);
  let gamed_details = await GetMatchDetails(matchs_gamed);
  let status_players = await Math_status_players({
    gamed_details,
    parameter,
  });

  res.status(200).json(
    JSON.stringify({
      ...profile,
      players_gamed,
      status_players,
    })
  );
}
