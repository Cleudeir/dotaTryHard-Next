/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
export default async function Auto(props) {
  const accountId = props;
  if (!accountId) {
    return null;
  }
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }
  // Quantidade de partida que serão buscadas
  const qnt = 10;
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
  const players = await pull(
    `${process.env.url}/api/players/${accountId}/${qnt}`,
    {
      method: 'GET',
    },
  );
  if (!players.data) {
    return null;
  }
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
    return null;
  }
  //--------------------------------------------------
  // filtrar existentes
  const newMatches = matches.data.filter((x) => !dataMatches.includes(x));

  const newPlayers = players.data.filter((x) => !dataPlayers.includes(x));

  const status = await pull(`${process.env.url}/api/status`, {
    method: 'POST',
    body: JSON.stringify(newMatches),
  });
  if (!status) {
    return null;
  }
  const profiles = await pull(`${process.env.url}/api/profiles`, {
    method: 'POST',
    body: JSON.stringify(newPlayers),
  });
  if (!profiles) {
    return null;
  }
  const write = await pull(`${process.env.url}/api/database/write`, {
    method: 'POST',
    body: JSON.stringify({ profiles, status }),
  });
  return {
    status: 200,
    message: 'ok',
    data: write,
  };
}
