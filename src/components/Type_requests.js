const api = {
  base_url: "http://api.steampowered.com/",
  game_mode: 18,
  key_api: "048776627077105958873BA4C749CEFF",
};

export async function GetMatchHistory(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    for (let k = 0; k < props[i].length; k++) {
      let request = await fetch(
        `${api.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props[i][k].account_id}&game_mode=${api.game_mode}&key=${api.key_api}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let x = data.result.matches;
          return x;
        })
        .catch((error) => {
          return error.mensage;
        });
      array.push(request);
    }
  }
  return array;
}
export async function GetMatchDetails(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    for (let k = 0; k < props[i].length; k++) {
      let request = await fetch(
        `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i][k]}&key=${api.key_api}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data.result;
        })
        .catch(() => {
          return {};
        });
      array.push(request);
    }
  }
  return array;
}
export async function GetPlayerSummaries(props) {
  let array = [];
  for (let i = 0; i < props.length; i++) {
    for (let k = 0; k < props[i].length; k++) {
      let request = await fetch(
        `${api.base_url}ISteamUser/GetPlayerSummaries/v0002/?key=${api.key_api}&steamids=${props[i][k].steam_id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let x = data.response.players[0];
          return x;
        })
        .catch(() => {
          return error.mensage;
        });
      array.push(request);
    }
  }
  return array;
}
