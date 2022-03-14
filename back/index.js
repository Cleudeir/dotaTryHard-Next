import Ranking from './math/Ranking';

export default async function Request({ id, country }) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // Procurar partidas jogadas recentemente
  const matches = await pull(
    `/api/matches/${id}`,
    {
      method: 'GET',
    },
  );
  if (!matches.data) {
    return {
      status: matches.status,
      message: matches.message,
      data: null,
    };
  }
  console.log('matches: ', matches.data.length);
  //--------------------------------------------------
  // Procurar players das partidas jogadas recentemente
  const players = await pull(
    `/api/players/${id}`,
    {
      method: 'GET',
    },
  );
  if (!players.data) {
    return {
      status: players.status,
      message: players.message,
      data: null,
    };
  }
  console.log('players: ', players.data.length);
  //--------------------------------------------------
  // filtrar existentes
  const newMatches = matches.data;
  console.log('newMatches: ', newMatches.length);
  const newPlayers = players.data;
  console.log('newPlayers: ', newPlayers.length);
  //--------------------------------------------------
  // Procurar status de cada partida
  const status = await pull('/api/status', {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  console.log('status: ', status.length);
  //--------------------------------------------------
  // Procurar informações do perfil
  const profiles = await pull('/api/profiles', {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  console.log('profiles: ', profiles.length);
  //--------------------------------------------------
  // escrever na data base
  const { writeProfiles, writeMatches, writePlayersMatches } = await pull('/api/database/write', {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  if (writeProfiles && writeMatches && writePlayersMatches) {
    console.log('writeProfiles: ', writeProfiles.length);
    console.log('writeMatches: ', writeMatches.length);
    console.log('writePlayersMatches: ', writePlayersMatches.length);
  }
  //--------------------------------------------------
  // Media
  const { dataAvg, dataAvgAll } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify(`avg#${country}`),
    },
  );
  if (dataAvg.length === 0) {
    return {
      status: 'Error',
      message: 'INSUFFICIENT INFORMATION',
      data: null,
    };
  }
  console.log('dataAvg: ', dataAvg.length);
  console.log('dataAvgAll: ', ((dataAvgAll.win / dataAvgAll.matches) * 100).toFixed(2), '%');
  //---------------------------------------------------
  const ranked = await Ranking({ dataAvg, dataAvgAll });
  //---------------------------------------------------
  const order = ranked.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });
  const result = order.map(
    (x, i) => { const obj = { ...x, id: (i + 1) }; return obj; },
  );
  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: result,
  };
}
