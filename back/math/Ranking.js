export default async function Ranking({ dataAvg, dataAvgAll }) {
  const result = [];
  const average = dataAvgAll;

  average.winRate = parseFloat((+average.win / +average.matches) * 100, 2).toFixed(0);

  for (let i = 0; i < dataAvg.length; i += 1) {
    const obj = dataAvg[i];

    obj.assists = +obj.assists;
    obj.denies = +obj.denies;
    obj.deaths = +obj.deaths;
    obj.gold_per_min = +obj.gold_per_min;
    obj.hero_damage = +obj.hero_damage;
    obj.hero_healing = +obj.hero_healing;
    obj.kills = +obj.kills;
    obj.last_hits = +obj.last_hits;
    obj.net_worth = +obj.net_worth;
    obj.tower_damage = +obj.tower_damage;
    obj.xp_per_min = +obj.xp_per_min;
    obj.win = +obj.win;

    obj.winRate = parseFloat((+obj.win / +obj.matches) * 100, 2).toFixed(0);

    obj.ranking = parseInt(
      (
        (
          (+obj.assists / +average.assists) * 10
        + (+obj.denies / +average.denies) * 10
        + (+average.deaths / +obj.deaths) * 10
        + (+obj.gold_per_min / +average.gold_per_min) * 10
        + (+obj.hero_damage / +average.hero_damage) * 10
        + (+obj.hero_healing / +average.hero_healing) * 3
        + (+obj.kills / +average.kills) * 10
        + (+obj.last_hits / +average.last_hits) * 10
        + (+obj.net_worth / +average.net_worth) * 10
        + (+obj.tower_damage / +average.tower_damage) * 10
        + (+obj.xp_per_min / +average.xp_per_min) * 10
        + (+obj.winRate / +average.winRate) * 20
        )
        / (10 * 10 + 3 + 20))
        * 3000,
      10,
    );
    result.push(obj);
  }

  return result;
}
