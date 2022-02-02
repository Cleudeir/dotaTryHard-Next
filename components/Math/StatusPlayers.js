/* eslint-disable camelcase */
export default function StatusPlayers(props) {
  const statusAllGames = [];
  for (let i = 0; i < props.length; i += 1) {
    const { players, radiant_win, match_id } = props[i];

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
      if (radiant_win) {
        if (player_slot < 5) {
          win = 1;
        }
      } else if (player_slot > 5) {
        win = 1;
      }
      statusAllGames.push({
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
  return statusAllGames;
}
