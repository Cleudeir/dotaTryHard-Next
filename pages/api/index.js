/* eslint-disable react-hooks/rules-of-hooks */
const SteamID = require("steamid");
import {
  Math_matchs_single,
  Math_status_players,
} from "../../src/components/Math_data";
import {
  GetMatchHistory,
  GetPlayerSummaries,
  GetMatchDetails,
} from "../../src/components/Type_requests";

export default async function handler(req, res) {
  const value = req.query.account_id;
  const details = req.query.details;

  console.log(value, details);
  const first = {
    account_id: value,
    steam_id: await new SteamID(`[U:1:${value}]`),
  };

  let matchHistory = await GetMatchHistory(first);

  if (!matchHistory) {
    return res
      .status(500)
      .json(JSON.stringify({ error: 500, details: "Partidas bloqueada" }));
  }

  if (details === "true") {
    console.log(value, details);
    let profile = await GetPlayerSummaries(first);
    if (!profile) {
      return res
        .status(500)
        .json(JSON.stringify({ error: 500, details: "Perfil bloqueado" }));
    }
    let matchs_gamed = await Math_matchs_single(matchHistory)
      .reverse()
      .splice(0, 50);
    let gamed_details = await GetMatchDetails(matchs_gamed);
    let status_players = await Math_status_players({
      gamed_details,
      value,
    });
    res.status(200).json(
      JSON.stringify({
        ...profile,
        matchHistory,
        status_players,
      })
    );
  } else {
    res.status(200).json(
      JSON.stringify({
        matchHistory,
      })
    );
  }
}
