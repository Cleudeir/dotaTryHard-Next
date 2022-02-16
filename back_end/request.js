// import StatusAverage from './math/StatusAverage';

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
  console.log({ matches });

  // Procurar informações do perfil
  const profiles = await pull(`/api/profiles/${id}`);
  console.log({ profiles });

  // Procurar status de cada partida
  const status = await pull('/api/status', {
    method: 'POST',
    body: JSON.stringify(matches),
  });
  console.log({ status });
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
  return { write };
}
export default request;
