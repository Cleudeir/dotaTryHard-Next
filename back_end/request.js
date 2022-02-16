// import StatusAverage from './math/StatusAverage';

async function request(id) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch(() => null);
    return result;
  }
  // procurar dados salvos database
  const read = await pull('/api/database/read');
  const dataMatches = await read.matches;
  console.log({ dataMatches });
  const dataPlayers = await read.players;
  console.log({ dataPlayers });
  const dataPlayersMatches = await read.playersMatches;
  console.log({ dataPlayersMatches });

  // Procurar partidas jogadas recentemente
  const matches = await pull(`/api/matches/${id}`);

  // Procurar players das partidas jogadas recentemente
  const players = await pull(`/api/players/${id}`);

  // filtrar existentes
  const newMatches = matches.filter((x) => !dataMatches.includes(x));
  console.log('newMatches', newMatches);
  const newPlayers = players.filter((x) => !dataPlayers.includes(x));
  console.log('newProfiles', newPlayers);

  // Procurar status de cada partida
  const status = await pull('/api/status', {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  console.log({ status });

  // Procurar informações do perfil
  const profiles = await pull('/api/profiles', {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  console.log({ profiles });
  // escrever na data base

  const write = await pull('/api/database/write', {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  console.log({ write });
  /*
  // Fazer media
  const statusAverage = StatusAverage(readAndFilter.read);
  //
  const player = { ...profile, ...statusAverage };
  //
  const ranking = await pull('/api/database/ranking');
*/
  return dataPlayersMatches;
}
export default request;
