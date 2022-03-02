import Ranking from './math/Ranking';

export default async function Request(id) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }
  // procurar dados salvos database

  const { dataMatches } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify('matches'),
    },
  );

  if (dataMatches === undefined) {
    return {
      status: 'Error',
      message: 'SERVIDOR DATABASE OFFLINE, FAVOR TENTAR MAIS TARDE!',
      data: null,
    };
  }
  //-------------------------------------------------
  const { dataPlayers } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify('players'),
    },
  );

  //--------------------------------------------------
  console.log('--------------------------');
  //--------------------------------------------------

  console.log('dataPlayers', dataPlayers.length);
  console.log('dataMatches: ', dataMatches.length);

  //--------------------------------------------------
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

  console.log('matches: ', matches.message);
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

  console.log('players: ', players.message);

  //--------------------------------------------------
  console.log('--------------------------');
  // filtrar existentes
  const newMatches = matches.data.filter((x) => !dataMatches.includes(x));
  console.log('newMatches: ', newMatches.length);
  const newPlayers = players.data.filter((x) => !dataPlayers.includes(x));
  console.log('newPlayers: ', newPlayers.length);
  //--------------------------------------------------
  console.log('--------------------------');
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
  console.log('--------------------------');
  // escrever na data base

  const { writeProfiles, writeMatches, writePlayersMatches } = await pull('/api/database/write', {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });

  console.log('writeProfiles: ', writeProfiles.length);
  console.log('writeMatches: ', writeMatches.length);
  console.log('writePlayersMatches: ', writePlayersMatches.length);
  //--------------------------------------------------

  // Media
  const { dataAvg, dataAvgAll } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify('avg'),
    },
  );
  console.log('dataAvg: ', dataAvg.length);
  console.log('dataAvgAll: ', dataAvgAll.length);

  //---------------------------------------------------

  const ranked = await Ranking({ dataAvg, dataAvgAll });

  //---------------------------------------------------

  const result = ranked.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });
  console.log('--------------------------');

  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: result,
  };
}
