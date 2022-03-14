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
  if (dataPlayers === undefined || dataPlayers.length < 1) {
    console.log('Dados insuficientes');
    return null;
  }
  //--------------------------------------------------
  let count = 0;

  const setInt = setInterval(autoSearch, 60 * 1000);
  //--------------------------------------------------

  async function autoSearch() {
    const id = dataPlayers[count];
    console.log('--------------------------');
    console.log('id: ', id);
    if (!id) {
      return null;
    }
    const matches = await pull(
      `${process.env.url}/api/matches/${id}`,
      {
        method: 'GET',
      },
    );
    if (!matches.data) {
      count += 1;
      return null;
    }
    console.log('matches: ', matches.data.length);

    const players = await pull(
      `${process.env.url}/api/players/${id}`,
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

    const newMatches = matches.data;
    const newPlayers = players.data;

    const status = await pull(`${process.env.url}/api/status`, {
      method: 'POST',
      body: JSON.stringify(newMatches),
    });
    if (!status) {
      console.log('Error : Status');
      count += 1;
      return null;
    }
    console.log('status: ', status.length);

    const profiles = await pull(`${process.env.url}/api/profiles`, {
      method: 'POST',
      body: JSON.stringify(newPlayers),
    });
    if (!profiles) {
      console.log('Error : Status');
      count += 1;
      return null;
    }
    console.log('profiles: ', profiles.length);

    const { writeProfiles, writeMatches, writePlayersMatches } = await pull(`${process.env.url}/api/database/write`, {
      method: 'POST',
      body: JSON.stringify({ profiles, status }),
    });

    if (writeProfiles && writeMatches && writePlayersMatches) {
      console.log('writeProfiles: ', writeProfiles.length);
      console.log('writeMatches: ', writeMatches.length);
      console.log('writePlayersMatches: ', writePlayersMatches.length);
    }

    count += 1;
    if (count >= dataPlayers.length) { clearInterval(setInt); return 'ok'; }
  }
}
