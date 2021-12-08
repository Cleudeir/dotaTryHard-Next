const api = {
  base_url: "http://api.steampowered.com/",
  game_mode: 18,
  key_api: "048776627077105958873BA4C749CEFF",
};

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
        return {};
      });
    array.push(request);
  }
  return array;
}
