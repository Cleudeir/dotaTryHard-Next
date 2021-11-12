/* eslint-disable react-hooks/rules-of-hooks */

import {
  Math_matchs_single,
  Math_players_single,
  Math_obj_ids,
} from "../../src/components/Math_data";
import {
  GetMatchHistory,
  GetPlayerSummaries,
  GetMatchDetails,
} from "../../src/components/Type_requests";

export default async function handler(req, res) {
  const first = Math_obj_ids([req.query.account_id]);

  let matchHistory_01 = await GetMatchHistory(first);
  let profile_01 = await GetPlayerSummaries(first);
  let players_gamed_01 = await Math_players_single(matchHistory_01);
  let matchs_gamed_01 = await Math_matchs_single(matchHistory_01);
  // let match_gamed_details_01 = await (GetMatchDetails(matchs_gamed));
  //---
  const second = Math_obj_ids(players_gamed_01)
  let matchHistory_02 = await GetMatchHistory(second);
  let profile_02 = await GetPlayerSummaries(second);
  let players_gamed_02 = await Math_players_single(matchHistory_01);
  let matchs_gamed_02 = await Math_matchs_single(matchHistory_01);
  // let match_gamed_details_02 = await (GetMatchDetails(matchs_gamed));
  res.status(200).json(
    JSON.stringify([
      {
        matchHistory_01,
        profile_01,
        players_gamed_01,
        matchs_gamed_01,
        // match_gamed_details_01,
      },
      {
        matchHistory_02,
        profile_02,
        players_gamed_02,
        matchs_gamed_02,
        // match_gamed_details_02,
      },
    ])
  );
}
