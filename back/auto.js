/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
export default async function Auto(props) {
  const accountId = props;
  if (!accountId) {
    return null;
  }
  console.log('--------------------------');
  console.log('Auto request', accountId);
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }
  //--------------------------------------------------

  // Quantidade de partida que serão buscadas
  const qnt = 20;
  // --------------------------------------
  const matches = await pull(
    `${process.env.url}/api/matches/${accountId}/${qnt}`,
    {
      method: 'GET',
    },
  );
  if (!matches.data) {
    return null;
  }
  console.log('matches: ', matches.data.length);

  const players = await pull(
    `${process.env.url}/api/players/${accountId}/${qnt}`,
    {
      method: 'GET',
    },
  );
  if (!players.data) {
    console.log('Error :', players.message); return null;
  }
  console.log('players: ', players.data.length);

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
    console.log('Error :', dataMatches); return null;
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

  const status = await pull(`${process.env.url}/api/status`, {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  if (!status) {
    console.log('Error : Status'); return null;
  }
  console.log('status: ', status.length);

  const profiles = await pull(`${process.env.url}/api/profiles`, {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  if (!profiles) {
    console.log('Error : Status'); return null;
  }
  console.log('profiles: ', profiles.length);

  const write = await pull(`${process.env.url}/api/database/write`, {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  console.log(write);
}
