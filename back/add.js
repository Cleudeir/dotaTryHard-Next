export default async function Add({ accountId }) {
  console.log(accountId);
  if (accountId < 200) {
    return {
      status: 500,
      message: 'ERROR, INSERT YOUR ACCOUNT_ID',
      data: null,
    };
  }
  const time = Date.now();
  console.log('--------------------------');
  console.log('Add');
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // Procurar partidas jogadas recentemente
  const qnt = 30;
  const matches = await pull(
    `${process.env.url}/api/matches/${accountId}/${qnt}`,
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
    `${process.env.url}/api/players/${accountId}/${qnt}`,
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
  const { dataMatches, dataPlayers } = await pull(
    `${process.env.url}/api/database/read`,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          body: 'exist', accountId,
        },
      ),
    },
  );
  if (dataMatches === undefined) {
    return {
      status: 'ERROR',
      message: 'OFFLINE DATABASE SERVER, PLEASE TRY LATER!',
      data: null,
    };
  }
  //--------------------------------------------------
  console.log('dataPlayers', dataPlayers.length);
  console.log('dataMatches: ', dataMatches.length);
  //--------------------------------------------------
  // filtrar existentes
  const newMatches = matches.data.filter((x) => !dataMatches.includes(x));
  console.log('newMatches: ', newMatches.length);
  const newPlayers = players.data.filter((x) => !dataPlayers.includes(x));
  console.log('newPlayers: ', newPlayers.length);
  //--------------------------------------------------
  // Procurar status de cada partida
  const status = await pull(`${process.env.url}/api/status`, {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  console.log('status: ', status.length);
  //--------------------------------------------------
  // Procurar informações do perfil
  const profiles = await pull(`${process.env.url}/api/profiles`, {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  console.log('profiles: ', profiles.length);
  //--------------------------------------------------
  // escrever na data base
  const write = await pull(`${process.env.url}/api/database/write`, {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  console.log(write);
  //--------------------------------------------------
  console.log((-time + Date.now()) / 1000, 's');
  console.log('--------------------------');
  return {
    status: 'OK',
    message: 'SUCCESSFULLY, PLEASE WAIT 30MIN TO APPEAR IN THE RANKING',
  };
}
