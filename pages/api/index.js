/* eslint-disable react-hooks/rules-of-hooks */
const SteamID = require("steamid");
import { Players_found } from "../../src/components/Math_date";
import {
  GetMatchHistory,
  GetPlayerSummaries,
} from "../../src/components/Type_requests";

export default async function handler(req, res) {
  const first = {
    account_id: req.query.account_id,
    steam_id: await new SteamID(`[U:1:${req.query.account_id}]`),
  };
  let MatchHistory = await GetMatchHistory(first);
  let PlayerSummaries = await GetPlayerSummaries(first);
  let Players01 = Players_found(MatchHistory);
  let Players02 = [];
  for (let index = 0; index < Players01.length; index++) {
    const second = {
      account_id: Players01[index],
      steam_id: await new SteamID(`[U:1:${Players01[index]}]`),
    };
    Players02.push(await GetMatchHistory(second));
  }
  res.status(200).json(
    JSON.stringify({
      MatchHistory,
      PlayerSummaries,
      Players01,
      Players02,
    })
  );
}
