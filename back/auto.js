export default async function Auto() {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  const { dataPlayers } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify('players'),
    },
  );
  if (dataPlayers === undefined) {
    console.log('Error : Banco de dados offline');
    return null;
  }

  let count = 0;
  async function autoSearch() {
    console.log('--------------------------');
    // procurar dados salvos database
    const id = dataPlayers[count];
    console.log('id: ', id);
    // Procurar partidas jogadas recentemente
    const matches = await pull(
      `/api/matches/${id}`,
      {
        method: 'GET',
      },
    );
    if (!matches.data) {
      console.log('Error :', matches.message);
      count += 1;
      return null;
    }
    console.log('matches: ', matches.data.length);
    //--------------------------------------------------
    const { dataMatches } = await pull(
      '/api/database/read',
      {
        method: 'POST',
        body: JSON.stringify('matches'),
      },
    );
    if (dataMatches === undefined) {
      console.log('Error : Banco de dados offline');
      count += 1;
      return null;
    }
    console.log('dataMatches: ', dataMatches.length);
    //--------------------------------------------------

    // Procurar players das partidas jogadas recentemente
    const players = await pull(
      `/api/players/${id}`,
      {
        method: 'GET',
      },
    );
    if (!players.data) {
      console.log('Error :', players.message);
      count += 1;
      return null;
    }

    console.log('players: ', players.data.length);
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

    if (!status) {
      console.log('Error : Status');
      count += 1;
      return null;
    }
    console.log('status: ', status.length);

    //--------------------------------------------------

    // Procurar informações do perfil
    const profiles = await pull('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(newPlayers),
    });

    console.log('profiles: ', profiles.length);

    if (!profiles) {
      console.log('Error : Status');
      count += 1;
      return null;
    }
    //--------------------------------------------------
    // escrever na data base
    const { writeProfiles, writeMatches, writePlayersMatches } = await pull('/api/database/write', {
      method: 'POST',
      body: JSON.stringify({ profiles, status }),
    });

    console.log('writeProfiles: ', writeProfiles.length);
    console.log('writeMatches: ', writeMatches.length);
    console.log('writePlayersMatches: ', writePlayersMatches.length);
    //--------------------------------------------------
    count += 1;
    return [];
  }

  setInterval(autoSearch, 10000);
}
