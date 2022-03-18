/* eslint-disable no-param-reassign */
const abilityID = require('./math/ability_id.json');

export default async function Request({ id }) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // procurar dados salvos database
  const { dataDetailsMatch, dataDetailsStatus } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify(
        {
          body: 'details', accountId: id,
        },
      ),
    },
  );
  if (dataDetailsMatch === undefined) {
    return {
      status: 'Error',
      message: 'SERVIDOR DATABASE OFFLINE, FAVOR TENTAR MAIS TARDE!',
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
    personaname: 'undefined',
    avatarfull: 'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/',
    loccountrycode: '',
  };

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

  const result = [];
  for (let i = 0; i < dataDetailsMatch.length; i += 1) {
    const match = dataDetailsMatch[i];

    const status = dataDetailsStatus
      .filter((x) => x.match_id === match.match_id);

    for (let j = status.length; j < 10; j += 1) {
      status.push({ ...obj, account_id: j * -1 });
    }
    result.push({ match, status });
  }
  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: result,
  };
}
