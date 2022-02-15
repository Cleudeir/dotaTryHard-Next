import StatusAverage from './math/StatusAverage';

async function request(id) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch(() => null);
    return result;
  }

  // Procurar partidas jogadas
  const matches = await pull(`/api/matches/${id}`);

  // Procurar informações do perfil
  const profile = await pull(`/api/profile/${id}`);

  // ler DataBase e filtrar novas partidas
  const readAndFilter = await pull(`/api/database/read&filter/${id}`, {
    method: 'POST',
    body: JSON.stringify(matches),
  });

  // Procurar status de cada partida
  const status = await pull(`/api/status/${id}`, {
    method: 'POST',
    body: JSON.stringify(readAndFilter.filter),
  });

  // escrever na data base
  if (status.length > 0) {
    const write = await pull(`/api/database/write/${id}`, {
      method: 'POST',
      body: JSON.stringify({ profile, status }),
    });
    console.log(write);
  }
  // Fazer media
  const statusAverage = StatusAverage(readAndFilter.read);
  //
  const player = { ...profile, ...statusAverage };
  //
  const ranking = await pull('/api/database/ranking');

  return { ranking, player };
}
export default request;
