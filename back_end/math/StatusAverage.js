/* eslint-disable camelcase */
export default function StatusAverage(props) {
  const obj = {
    assists: 0,
    deaths: 0,
    denies: 0,
    gold_per_min: 0,
    hero_damage: 0,
    hero_healing: 0,
    kills: 0,
    last_hits: 0,
    net_worth: 0,
    tower_damage: 0,
    xp_per_min: 0,
    win: 0,
    matches: 0,
    winRate: 0,
    ranking: 0,
  };
  const average = {
    assists: 13,
    deaths: 5,
    denies: 7,
    gold_per_min: 490,
    hero_damage: 25880,
    hero_healing: 1413,
    kills: 7,
    last_hits: 173,
    net_worth: 17154,
    tower_damage: 3323,
    xp_per_min: 611,
    winRate: 50,
  };

  if (props) {
    for (let i = 0; i < props.length; i += 1) {
      if (props[i].win !== null) {
        obj.assists += props[i].assists;
        obj.deaths += props[i].deaths;
        obj.denies += props[i].denies;
        obj.gold_per_min += props[i].gold_per_min;
        obj.hero_damage += props[i].hero_damage;
        obj.hero_healing += props[i].hero_healing;
        obj.kills += props[i].kills;
        obj.last_hits += props[i].last_hits;
        obj.net_worth += props[i].net_worth;
        obj.tower_damage += props[i].tower_damage;
        obj.xp_per_min += props[i].xp_per_min;
        obj.win += props[i].win;
        obj.matches += 1;
      }
    }
    if (obj.matches !== 0) {
      obj.assists = parseInt(obj.assists / obj.matches, 10);
      obj.denies = parseInt(obj.denies / obj.matches, 10);
      obj.deaths = parseInt(obj.deaths / obj.matches, 10);
      obj.gold_per_min = parseInt(obj.gold_per_min / obj.matches, 10);
      obj.hero_damage = parseInt(obj.hero_damage / obj.matches, 10);
      obj.hero_healing = parseInt(obj.hero_healing / obj.matches, 10);
      obj.kills = parseInt(obj.kills / obj.matches, 10);
      obj.last_hits = parseInt(obj.last_hits / obj.matches, 10);
      obj.net_worth = parseInt(obj.net_worth / obj.matches, 10);
      obj.tower_damage = parseInt(obj.tower_damage / obj.matches, 10);
      obj.xp_per_min = parseInt(obj.xp_per_min / obj.matches, 10);
      obj.winRate = parseInt((obj.win / obj.matches) * 100, 10);
    }

    obj.ranking = parseInt(
      (
        (obj.assists / average.assists)
    + (obj.denies / average.denies)
    + (obj.deaths / average.deaths)
    + (obj.gold_per_min / average.gold_per_min)
    + (obj.hero_damage / average.hero_damage)
    + (obj.hero_healing / average.hero_healing)
    + (obj.kills / average.kills)
    + (obj.last_hits / average.last_hits)
    + (obj.net_worth / average.net_worth)
    + (obj.tower_damage / average.tower_damage)
    + (obj.xp_per_min / average.xp_per_min)
    + (obj.winRate / average.winRate)
    * 1000),
      10,
    );
  }
  return obj;
}
