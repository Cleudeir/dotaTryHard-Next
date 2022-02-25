import StatusMedia from './math/StatusAverage';

export default async function Request(id) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => [err.message]);
    return result;
  }
  // procurar dados salvos database

  const { dataMatches, dataPlayers, dataPlayersMatches } = await pull('/api/database/read',
  {
    method: 'GET',
  });
  console.log('dataMatches', dataMatches );
  console.log('dataPlayers', dataPlayers );
  console.log('dataPlayersMatches', dataPlayersMatches );
  //--------------------------------------------------

  // Procurar partidas jogadas recentemente
  const matches = await pull(`/api/matches/${id}`,
  {
    method: 'GET',
  });
  console.log('matches:', matches);
  //--------------------------------------------------

  // Procurar players das partidas jogadas recentemente
  const players = await pull(`/api/players/${id}`,
  {
    method: 'GET',
  });
  console.log('players:', players);

  //--------------------------------------------------

  // filtrar existentes
  const newMatches = matches.filter((x) => !dataMatches.includes(x));
  console.log('newMatches', newMatches);
  const newPlayers = players.filter((x) => !dataPlayers.includes(x));
  console.log('newPlayers', newPlayers);
  //--------------------------------------------------

  // Procurar status de cada partida
  const status = await pull('/api/status', {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  console.log('status', status);
  //--------------------------------------------------

  // Procurar informações do perfil
  const profiles = await pull('/api/profiles', {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  console.log('profiles', profiles);
  //--------------------------------------------------

  // escrever na data base

  const write = await pull('/api/database/write', {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  console.log('write', write);
  //--------------------------------------------------

  const statusPerPlayers = [];

  for (let i = 0; i < dataPlayers.length; i += 1) {
    statusPerPlayers.push(dataPlayersMatches.filter(
      (x) => +x.account_id === +dataPlayers[i],
    ));
  }
  const filter = statusPerPlayers.filter((x) => x.length >= 30);

  const AverageStatusPlayers = [];
  for (let i = 0; i < filter.length; i += 1) {
    AverageStatusPlayers.push({
      personaname: filter[i][0].personaname,
      avatarfull: filter[i][0].avatarfull,
      loccountrycode: filter[i][0].loccountrycode,
      account_id: filter[i][0].account_id,
      ...StatusMedia(filter[i]),
    });
  }

  const result = AverageStatusPlayers.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });

  // Media
  console.log('Media', StatusMedia(result));
  console.log('Result', [...result]);

  return result;
}
