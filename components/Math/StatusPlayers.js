/* eslint-disable no-const-assign */
/* eslint-disable camelcase */
export default function StatusPlayers(props) {
  const statusAllGames = [];
  for (let i = 0; i < props.length; i += 1) {
    const {
      players, radiant_win, match_id, start_time,
    } = props[i];

    for (let n = 0; n < players.length; n += 1) {
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
      } = players[n];

      let win = 0;
      if (player_slot >= 0
        && account_id >= 0
        && assists >= 0
        && account_id >= 0
        && deaths >= 0
        && denies >= 0
        && gold_per_min >= 0
        && hero_damage >= 0
        && hero_healing >= 0
        && kills >= 0
        && last_hits >= 0
        && net_worth >= 0
        && player_slot >= 0
        && tower_damage >= 0
        && xp_per_min >= 0
      ) {
        if (radiant_win) {
          if (player_slot < 5) {
            win = 1;
          }
        } else if (player_slot > 5) {
          win = 1;
        }
        statusAllGames.push({
          start_time,
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
    }
  }

  return statusAllGames;
}
