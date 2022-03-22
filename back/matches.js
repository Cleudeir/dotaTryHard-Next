/* eslint-disable no-param-reassign */
const abilityID = require('./math/ability_id.json');
const heroId = require('./math/hero_id.json');

export default async function MatchesData({ accountId }) {
  if (accountId === '' || !accountId) {
    return {
      status: 500,
      message: 'ERROR, INSERT YOUR ACCOUNT_ID',
      data: null,
    };
  }
  console.log('matches', accountId);
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // procurar dados salvos database
  const { dataDetailsMatch, dataDetailsStatus } = await pull(
    `${process.env.url}/api/database/read`,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          body: 'details', accountId,
        },
      ),
    },
  );
  if (dataDetailsMatch === undefined) {
    return {
      status: 500,
      message: 'OFFLINE DATABASE SERVER, PLEASE TRY LATER!',
      data: null,
    };
  }
  const obj = {
    match_id: '-',
    assists: '-',
    deaths: '-',
    denies: '-',
    gold_per_min: '-',
    hero_damage: '-',
    hero_healing: '-',
    kills: '-',
    last_hits: '-',
    net_worth: '-',
    tower_damage: '-',
    xp_per_min: '-',
    win: '-',
    ability_0: '-',
    ability_1: '-',
    ability_2: '-',
    ability_3: '-',
    Hero_level: '-',
    team: '-',
    leaver_status: 0,
    aghanims_scepter: '-',
    aghanims_shard: '-',
    backpack_0: '-',
    backpack_1: '-',
    backpack_2: '-',
    item_0: '-',
    item_1: '-',
    item_2: '-',
    item_3: '-',
    item_4: '-',
    item_5: '-',
    item_neutral: '-',
    moonshard: '-',
    player_slot: '-',
    personaname: '-',
    avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
    loccountrycode: '',
  };
  console.log(dataDetailsStatus.length);
  dataDetailsStatus.forEach((x) => {
    Object.keys(abilityID).forEach((key) => {
      if (+key === +x.ability_0) {
        x.ability_0 = `https://cdn.datdota.com/images/ability/${abilityID[key]}.png`;
      } else if (+key === +x.ability_1) {
        x.ability_1 = `https://cdn.datdota.com/images/ability/${abilityID[key]}.png`;
      } else if (+key === +x.ability_2) {
        x.ability_2 = `https://cdn.datdota.com/images/ability/${abilityID[key]}.png`;
      } else if (+key === +x.ability_3) {
        x.ability_3 = `https://cdn.datdota.com/images/ability/${abilityID[key]}.png`;
      }
    });
  });

  dataDetailsStatus.forEach((x) => {
    Object.keys(heroId).forEach((key) => {
      const name = heroId[key].name.replace('npc_dota_hero_', '').toLowerCase();
      if (heroId[key].id === +x.hero_id) {
        x.hero_id = `https://cdn.datdota.com/images/heroes/${name}_full.png`;
      }
    });
  });

  // https://cdn.datdota.com/images/heroes/primal_beast_full.png

  const result = [];
  for (let i = 0; i < dataDetailsMatch.length; i += 1) {
    const match = dataDetailsMatch[i];

    const status = dataDetailsStatus
      .filter((x) => x.match_id === match.match_id);

    const slots = [0, 1, 2, 3, 4, 128, 129, 130, 131, 132];
    const slotsExit = [];
    let winRadiant;
    let winDire;

    for (let j = 0; j < status.length; j += 1) {
      const playerSlot = status[j].player_slot;
      const playerWin = status[j].win;
      slotsExit.push(playerSlot);
      if (playerSlot < 5) {
        winRadiant = playerWin;
      } else {
        winDire = playerWin;
      }
    }

    const slotsDeficient = slots.filter((a1) => !slotsExit.filter((a2) => a1 === a2).length);

    for (let n = 0; n < slotsDeficient.length; n += 1) {
      const playerSlot = slotsDeficient[n];
      let playerTeam;
      let win;
      if (playerSlot < 5) {
        playerTeam = 0;
        win = winRadiant;
      } else {
        playerTeam = 1;
        win = winDire;
      }
      status.push({
        ...obj, player_slot: playerSlot, team: playerTeam, win,
      });
    }
    status.sort((a, b) => {
      if (a.player_slot < b.player_slot) return -1;
      return a.player_slot > b.player_slot ? 1 : 0;
    });

    result.push({ match, status });
  }
  console.log();
  if (result.length > 0) {
    return {
      status: 200,
      message: 'ALL RIGHT',
      data: result,
    };
  }
  return {
    status: 500,
    message: 'ACCOUNT_ID NOT FOUND',
    data: null,
  };
}
