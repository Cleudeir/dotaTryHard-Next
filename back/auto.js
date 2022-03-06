/* eslint-disable no-use-before-define */
export default async function Auto(dataPlayers) {
  console.log('--------------------------');
  console.log('Auto request');
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }
  console.log(
    `%c dataPlayers: ${dataPlayers.length} `,
    'background: #ffff; color: black',
  );
  if (dataPlayers === undefined || dataPlayers.length < 1) {
    console.log('Error : Banco de dados offline');
    return null;
  }
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
    return null;
  }
  console.log(
    `%c dataMatches: ${dataMatches.length} `,
    'background: #ffff; color: black',
  );

  let count = 0;
  //--------------------------------------------------
  const setInt = setInterval(autoSearch, 10000);

  async function autoSearch() {
    console.log('--------------------------');
    // procurar dados salvos database
    const id = dataPlayers[count];
    console.log('id: ', id);
    console.log('loop:', count + 1, '/', dataPlayers.length);
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
    if (newMatches.length === 0 || newPlayers.length === 0) {
      console.log('Sem novas Partidas');
      console.log('--------------------------');
      count += 1;
      return null;
    }

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
    if (writeProfiles && writeMatches && writePlayersMatches) {
      console.log('writeProfiles: ', writeProfiles.length);
      console.log('writeMatches: ', writeMatches.length);
      console.log('writePlayersMatches: ', writePlayersMatches.length);
    }
    //--------------------------------------------------
    count += 1;
    if (count >= dataPlayers.length) { console.log('-------------End'); clearInterval(setInt); }
    return [];
  }
}
