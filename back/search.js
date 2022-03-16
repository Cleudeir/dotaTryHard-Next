export default async function Search({ id, country }) {
  const time = Date.now();
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
  // console.log('matches: ', matches.data);
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
  //  console.log('players: ', players.data);
  //--------------------------------------------------
  // procurar dados salvos database
  const { dataMatches } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify(`matches#${country}`),
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
      body: JSON.stringify(`players#${country}`),
    },
  );
  //--------------------------------------------------
  // console.log('dataPlayers', dataPlayers);
  // console.log('dataMatches: ', dataMatches);
  //--------------------------------------------------
  // filtrar existentes
  const newMatches = matches.data.filter((x) => !dataMatches.includes(x));
  console.log('newMatches: ', newMatches.length);
  const newPlayers = players.data.filter((x) => !dataPlayers.includes(x));
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
  console.log((-time + Date.now()) / 1000, 's');
  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: `
    writeProfiles:${writeProfiles.length}\n 
    writeMatches:${writeMatches.length}\n 
    writePlayersMatches:${writePlayersMatches.length}\n 
    `,
  };
}
