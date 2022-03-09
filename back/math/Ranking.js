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
          (+obj.assists / +average.assists) * 1
        + (+obj.denies / +average.denies) * 1
        + (+obj.kills / +average.kills) * 0.5
        + (+average.deaths / +obj.deaths) * 1
        + (+obj.gold_per_min / +average.gold_per_min) * 0.5
        + (+obj.hero_damage / +average.hero_damage) * 0.5
        + (+obj.last_hits / +average.last_hits) * 0.5
        + (+obj.hero_healing / +average.hero_healing) * 0.5
        + (+obj.net_worth / +average.net_worth) * 0.5
        + (+obj.tower_damage / +average.tower_damage) * 2
        + (+obj.xp_per_min / +average.xp_per_min) * 1
        + (+obj.winRate / +average.winRate) * 2
        )
        / (1 * 4 + 0.5 * 6 + 2 * 2))
        * 3000,
      10,
    );
    result.push(obj);
  }

  return result;
}
