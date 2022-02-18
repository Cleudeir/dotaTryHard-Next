import StatusAverage from './math/StatusAverage';

async function request(id) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch(() => []);
    return result;
  }

  // procurar dados salvos database
  const dataMatches = await pull('/api/database/read', {
    method: 'POST',
    body: JSON.stringify('matches'),
  });

  console.log('dataMatches', dataMatches);
  //--------------------------------------------------
  const dataPlayers = await pull('/api/database/read', {
    method: 'POST',
    body: JSON.stringify('players'),
  });

  console.log('dataPlayers', dataPlayers);
  //--------------------------------------------------

  // Procurar partidas jogadas recentemente
  const matches = await pull(`/api/matches/${id}`);

  //--------------------------------------------------

  // Procurar players das partidas jogadas recentemente
  const players = await pull(`/api/players/${id}`);

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

  const dataPlayersMatches = await pull('/api/database/read', {
    method: 'POST',
    body: JSON.stringify('playersMatches'),
  });
  //--------------------------------------------------

  const orderStatusPerPlayer = [];
  const AverageStatusPlayers = [];

  for (let i = 0; i < dataPlayers.length; i += 1) {
    orderStatusPerPlayer.push(dataPlayersMatches.filter(
      (x) => +x.account_id === +dataPlayers[i],
    ));
  }
  const StatusPerPlayers = orderStatusPerPlayer.filter((x) => x.length >= 10);

  for (let i = 0; i < StatusPerPlayers.length; i += 1) {
    AverageStatusPlayers.push(StatusAverage(StatusPerPlayers[i]));
  }

  const result = AverageStatusPlayers.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });

  // media
  console.log('media', StatusAverage(result));

  return result;
}
export default request;
