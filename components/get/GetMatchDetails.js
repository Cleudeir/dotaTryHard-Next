const api = {
  base_url: 'http://api.steampowered.com/',
  game_mode: 18,
  key_api: '048776627077105958873BA4C749CEFF',
};

export default async function GetMatchDetails(props) {
  async function pullDetails() {
    const array = [];
    for (let i = 0; i < props.length; i += 1) {
      const request = await fetch(
        `${api.base_url}/IDOTA2Match_570/GetMatchDetails/v1?match_id=${props[i]}&key=${api.key_api}`,
      )
        .then((response) => response.json())
        .then((data) => data.result)
        .catch((error) => error.status);
      console.log(i);
      array.push(request);
    }
    const promise = await Promise.all(array).then((x) => x);
    const filter = await promise.filter((x) => x !== false);
    return filter;
  }
  const result = await pullDetails();
  return result;
}
