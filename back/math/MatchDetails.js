import infos from './infos';

/* eslint-disable camelcase */
export default async function MatchDetails(props) {
  const arrayProps = props;
  const statusAllGames = [];

  for (let i = 0; i < arrayProps.length; i += 1) {
    const {
      game_mode, players, radiant_win, match_id, start_time, duration, radiant_score, dire_score,
    } = arrayProps[i];
    let { cluster } = arrayProps[i];
    if (!cluster) {
      continue;
    }
    if (+game_mode !== 18) {
      continue;
    }

    const clusterLocal = infos();
    Object.keys(clusterLocal).forEach((type) => {
      if (+type === +cluster) {
        cluster = clusterLocal[type];
      }
    });
    if (typeof cluster === 'number') {
      cluster = 'unknown';
    }
    const m = {
      radiant_score,
      dire_score,
      duration,
      start_time,
      match_id,
      cluster,
    };
    const mp = [];

    for (let n = 0; n < players.length; n += 1) {
      const {
        assists,
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
        hero_id,
        item_0,
        item_1,
        item_2,
        item_3,
        item_4,
        item_5,
        backpack_0,
        backpack_1,
        backpack_2,
        item_neutral,
        leaver_status,
        aghanims_scepter,
        aghanims_shard,
        moonshard,
        level,
      } = players[n];

      let { ability_upgrades, account_id } = players[n];
      if (account_id === 4294967295) {
        account_id = player_slot + 1;
      }
      if (!ability_upgrades || ability_upgrades.length < 1) {
        ability_upgrades = [
          { ability: -1 },
          { ability: -2 },
          { ability: -3 },
          { ability: -4 }];
      }
      const uniqueAbility = new Set();
      for (let j = 0; j < ability_upgrades.length; j += 1) {
        uniqueAbility.add(ability_upgrades[j].ability);
      }
      const [ability_0, ability_1, ability_2, ability_3] = [...uniqueAbility];
      const ability = {
        ability_0,
        ability_1,
        ability_2,
        ability_3,
      };
      const item = {
        item_0,
        item_1,
        item_2,
        item_3,
        item_4,
        item_5,
        backpack_0,
        backpack_1,
        backpack_2,
        item_neutral,
        aghanims_scepter,
        aghanims_shard,
        moonshard,
      };
      let win = 0;
      let team = '';
      if (player_slot < 5) {
        team = 0;
      } else {
        team = 1;
      }
      if (radiant_win) {
        if (player_slot < 5) {
          win = 1;
        }
      } else if (player_slot > 5) {
        win = 1;
      }
      mp.push({
        account_id,
        match_id,
        level,
        team,
        leaver_status,
        assists,
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
        item,
        ability,
        hero_id,
        player_slot,
      });
    }
    statusAllGames.push({ m, mp });
  }
  return statusAllGames;
}
