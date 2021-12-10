/* eslint-disable camelcase */
export default function StatusPlayers(props) {
  const array = [];
  for (let i = 0; i < props.gamed_details.length; i += 1) {
    const { players, radiant_win, match_id } = props.gamed_details[i];
    const arryIndex = [];
    for (let index = 0; index < players.length; index += 1) {
      const {
        assists,
        account_id,
        deaths,
        denies,
        gold_per_min,
        hero_damage,
        hero_healing,
        kills,
        last_hits,
        net_worth,
        player_slot,
        tower_damage,
        xp_per_min,
      } = players[index];

      let win = 0;
      if (radiant_win) {
        if (player_slot < 5) {
          win = 1;
        }
      // eslint-disable-next-line camelcase
      } else if (player_slot > 5) {
        win = 1;
      }
      arryIndex.push({
        assists,
        account_id,
        deaths,
        denies,
        gold_per_min,
        hero_damage,
        hero_healing,
        kills,
        last_hits,
        net_worth,
        tower_damage,
        xp_per_min,
        win,
        match_id,
      });
    }
    array.push(arryIndex);
  }
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
    matchs: 0,
  };
  array
    .map((x) => x.filter((y) => y.account_id === props.parameter))
    .map((z) => z[0])
    .map((w) => {
      obj.assists += w.assists;
      obj.deaths += w.deaths;
      obj.denies += w.denies;
      obj.gold_per_min += w.gold_per_min;
      obj.hero_damage += w.hero_damage;
      obj.hero_healing += w.hero_healing;
      obj.kills += w.kills;
      obj.last_hits += w.last_hits;
      obj.net_worth += w.net_worth;
      obj.tower_damage += w.tower_damage;
      obj.xp_per_min += w.xp_per_min;
      obj.win += w.win;
      obj.matchs += 1;
      return '';
    });
  if (obj.matchs !== 0) {
    obj.assists = parseInt(obj.assists / obj.matchs, 10);
    obj.denies = parseInt(obj.denies / obj.matchs, 10);
    obj.deaths = parseInt(obj.deaths / obj.matchs, 10);
    obj.gold_per_min = parseInt(obj.gold_per_min / obj.matchs, 10);
    obj.hero_damage = parseInt(obj.hero_damage / obj.matchs, 10);
    obj.hero_healing = parseInt(obj.hero_healing / obj.matchs, 10);
    obj.kills = parseInt(obj.kills / obj.matchs, 10);
    obj.last_hits = parseInt(obj.last_hits / obj.matchs, 10);
    obj.net_worth = parseInt(obj.net_worth / obj.matchs, 10);
    obj.tower_damage = parseInt(obj.tower_damage / obj.matchs, 10);
    obj.xp_per_min = parseInt(obj.xp_per_min / obj.matchs, 10);
    obj.win = parseInt((obj.win / obj.matchs) * 100, 10);
  }

  return obj;
}
