const api = {
  base_url: "http://api.steampowered.com/",
  game_mode: 18,
  key_api: "048776627077105958873BA4C749CEFF",
};

export async function GetMatchHistory(props) {
  let request = await fetch(
    `${api.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props.account_id}&game_mode=${api.game_mode}&key=${api.key_api}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result.status !== 15) {
        let x = data.result.matches;
        return x;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });

  return request;
}
export async function GetMatchDetails(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    let request = await fetch(
      `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${api.key_api}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.result;
      })
      .catch(() => {
        return false;
      });
    array.push(request);
  }
  return array;
}
export async function GetPlayerSummaries(props) {
  let request = await fetch(
    `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${props.steam_id}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let x = data.response.players[0];
      return x;
    })
    .catch(() => {
      return false;
    });
  return request;
}
