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
  const first = [
    [
      {
        account_id: parameter,
        steam_id: await new SteamID(`[U:1:${parameter}]`),
      },
    ],
  ];

  let first_get = await {
    matchHistory: await GetMatchHistory(first),
    profile: await GetPlayerSummaries(first),
  };
  let first_Match = await {
    players_gamed: await Math_players_single(first_get.matchHistory),
    matchs_gamed: await Math_matchs_single(first_get.matchHistory),
  };
  let first_Details = await {
    gamed_details: await GetMatchDetails(first_Match.matchs_gamed),
  };
/*      gamed_details: first_Details.gamed_details,
      players_gamed: first_Match.players_gamed,
  });*/
  res.status(200).json(
    JSON.stringify(
      {
        ...first_get,
        ...first_Match,
        ...first_Details,
      //  status_players,
      }
    )
  );
}
